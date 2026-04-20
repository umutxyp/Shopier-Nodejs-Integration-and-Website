require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const axios = require('axios');
const path = require('path');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 80;

// Config
const CLIENT_ID = process.env.SHOPIER_CLIENT_ID;
const CLIENT_SECRET = process.env.SHOPIER_CLIENT_SECRET;
const SERVER_URL = process.env.SERVER_URL;
const PAYMENT_TIMEOUT = parseInt(process.env.PAYMENT_TIMEOUT_MINUTES) || 10;
const SHOPIER_API = 'https://api.shopier.com/v1';
const SHOPIER_TOKEN_URL = 'https://api.shopier.com:8443/v1/oauth2/token';
const SHOPIER_AUTH_URL = 'https://shopier.com/m/login.php';
const REDIRECT_URI = `${SERVER_URL}/callback`;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const TOKEN_FILE = path.join(__dirname, 'data', '.shopier_token');
const TXN_FILE = path.join(__dirname, 'data', '.shopier_transactions');
const PRODUCTS_FILE = path.join(__dirname, 'data', 'products.json');

// In-memory stores
const tokenStore = { access_token: null, refresh_token: null, expires_at: 0 };
const pendingTransactions = new Map();
const cleanupTimers = new Map();

// ─── Token Persistence ───────────────────────────────────────

function loadToken() {
  try {
    if (fs.existsSync(TOKEN_FILE)) {
      const data = JSON.parse(fs.readFileSync(TOKEN_FILE, 'utf8'));
      tokenStore.access_token = data.access_token;
      tokenStore.refresh_token = data.refresh_token;
      tokenStore.expires_at = data.expires_at;
      console.log('Token loaded from file, expires:', new Date(tokenStore.expires_at).toISOString());
    }
  } catch (e) {
    console.log('No saved token found');
  }
}
function saveToken() {
  fs.writeFileSync(TOKEN_FILE, JSON.stringify(tokenStore));
}

// ─── Transaction Persistence ──────────────────────────────────

function loadTransactions() {
  try {
    if (fs.existsSync(TXN_FILE)) {
      const data = JSON.parse(fs.readFileSync(TXN_FILE, 'utf8'));
      for (const [id, txn] of Object.entries(data)) {
        pendingTransactions.set(id, txn);
        // Restore cleanup timer for pending transactions
        if (txn.status === 'pending') {
          scheduleProductCleanup(txn.shopierProductId, id, false);
        }
      }
      console.log(`Loaded ${pendingTransactions.size} transactions from file`);
    }
  } catch (e) {
    console.log('No saved transactions found');
  }
}
function saveTransactions() {
  const data = {};
  for (const [id, txn] of pendingTransactions) {
    data[id] = txn;
  }
  fs.writeFileSync(TXN_FILE, JSON.stringify(data));
}

// ─── Token Refresh ────────────────────────────────────────────

async function getAccessToken() {
  if (tokenStore.access_token && Date.now() < tokenStore.expires_at) {
    return tokenStore.access_token;
  }
  if (tokenStore.refresh_token) {
    try {
      return await refreshAccessToken();
    } catch {
      tokenStore.refresh_token = null;
    }
  }
  return null;
}

async function refreshAccessToken() {
  const res = await axios.post(SHOPIER_TOKEN_URL, new URLSearchParams({
    grant_type: 'refresh_token',
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    refresh_token: tokenStore.refresh_token,
  }), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });

  tokenStore.access_token = res.data.access_token;
  tokenStore.refresh_token = res.data.refresh_token;
  tokenStore.expires_at = Date.now() + (res.data.expires_in * 1000) - 60000;
  saveToken();
  console.log('Token refreshed, expires:', new Date(tokenStore.expires_at).toISOString());
  return tokenStore.access_token;
}

// ─── Shopier API Helper ────────────────────────────────────────

async function shopierApi(method, endpoint, data = null) {
  const token = await getAccessToken();
  if (!token) throw new Error('NOT_AUTHORIZED');

  const config = {
    method,
    url: `${SHOPIER_API}${endpoint}`,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
  };
  if (data) config.data = data;

  try {
    return await axios(config);
  } catch (err) {
    if (err.response?.status === 401) {
      const newToken = await refreshAccessToken();
      config.headers.Authorization = `Bearer ${newToken}`;
      return await axios(config);
    }
    throw err;
  }
}

// ─── Product Cleanup (Timeout) ────────────────────────────────

function scheduleProductCleanup(productId, transactionId, isNew = true) {
  // Cancel existing timer if any
  if (cleanupTimers.has(transactionId)) {
    clearTimeout(cleanupTimers.get(transactionId));
  }

  const timer = setTimeout(async () => {
    cleanupTimers.delete(transactionId);
    const txn = pendingTransactions.get(transactionId);
    if (!txn || txn.status !== 'pending') return;

    console.log(`[CLEANUP] Timeout reached for txn: ${transactionId}, deleting product ${productId}`);
    try {
      await shopierApi('delete', `/products/${productId}`);
      pendingTransactions.set(transactionId, { ...txn, status: 'expired' });
      saveTransactions();
      console.log(`[CLEANUP] Product ${productId} deleted (payment timeout)`);
    } catch (err) {
      console.error(`[CLEANUP] Failed to delete product ${productId}:`, err.message);
      // Force expire anyway so we don't keep trying
      pendingTransactions.set(transactionId, { ...txn, status: 'expired' });
      saveTransactions();
    }
  }, PAYMENT_TIMEOUT * 60 * 1000);

  cleanupTimers.set(transactionId, timer);
  if (isNew) {
    console.log(`[CLEANUP] Scheduled cleanup for txn ${transactionId} in ${PAYMENT_TIMEOUT} minutes`);
  }
}

function cancelCleanup(transactionId) {
  if (cleanupTimers.has(transactionId)) {
    clearTimeout(cleanupTimers.get(transactionId));
    cleanupTimers.delete(transactionId);
  }
}

// ─── Order Fulfillment ────────────────────────────────────────

async function fulfillOrder(orderId) {
  try {
    await shopierApi('post', `/orders/${orderId}/ship`, {
      status: 'shipped',
      tracking_number: 'Teslim edildi',
      tracking_company: 'digital',
    });
    console.log(`[FULFILL] Order ${orderId} fulfilled successfully`);
    return true;
  } catch (err) {
    console.error(`[FULFILL] Failed to fulfill order ${orderId}:`, err.response?.data || err.message);
    return false;
  }
}

// ─── Load Products Config ─────────────────────────────────────

function loadProductsConfig() {
  try {
    const data = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
    return data.products || [];
  } catch (e) {
    console.error('Failed to load products config:', e.message);
    return [];
  }
}

function getProductConfig(productCode) {
  const products = loadProductsConfig();
  return products.find(p => p.id === productCode) || null;
}

// ─── Routes ─────────────────────────────────────────────────

// Home page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Products API
app.get('/api/products', (req, res) => {
  try {
    const data = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
    res.json({ products: data.products.filter(p => p.active) });
  } catch {
    res.status(500).json({ error: 'Failed to load products' });
  }
});

// Contact API
app.get('/api/contact', (req, res) => {
  res.json({
    email: process.env.CONTACT_EMAIL,
    phone: process.env.CONTACT_PHONE,
    address: process.env.CONTACT_ADDRESS,
    discord: process.env.DISCORD_URL,
  });
});

// Check auth status
app.get('/api/status', (req, res) => {
  const authorized = !!(tokenStore.access_token && Date.now() < tokenStore.expires_at);
  res.json({ authorized, connected: !!tokenStore.access_token });
});

// Check order status
app.get('/api/orders/:transactionId/status', async (req, res) => {
  try {
    const { transactionId } = req.params;
    const txn = pendingTransactions.get(transactionId);

    if (!txn) {
      return res.json({ status: 'unknown', message: 'Transaction not found' });
    }

    // Get order from Shopier by productId
    try {
      const ordersRes = await shopierApi('get', '/orders');
      const orders = Array.isArray(ordersRes.data) ? ordersRes.data : (ordersRes.data.orders || []);

      for (const order of orders) {
        for (const item of order.lineItems || []) {
          if (item.productId == txn.shopierProductId) {
            return res.json({
              status: order.status,
              paymentStatus: order.paymentStatus,
              orderId: order.id,
              transactionId,
            });
          }
        }
      }
    } catch (e) {
      console.log('Shopier orders API error:', e.message);
    }

    res.json({ status: txn.status, transactionId, localOnly: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// List all transactions
app.get('/api/orders/pending', (req, res) => {
  const orders = [];
  for (const [txnId, txn] of pendingTransactions) {
    orders.push({
      transactionId: txnId,
      status: txn.status,
      amount: txn.amount,
      productName: txn.productName,
      buyer: txn.buyer,
      createdAt: txn.createdAt,
      paidAt: txn.paidAt,
    });
  }
  res.json({ orders });
});

// ─── OAuth 2.0 Flow ─────────────────────────────────────────

app.get('/install', (req, res) => {
  const state = crypto.randomBytes(16).toString('hex');
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    state,
  });
  res.redirect(`${SHOPIER_AUTH_URL}?${params}`);
});

app.get('/callback', async (req, res) => {
  const { code, state, error } = req.query;

  if (error) {
    return res.status(400).send(`Authorization failed: ${error}`);
  }
  if (!code) {
    return res.status(400).send('No authorization code received');
  }

  try {
    const tokenRes = await axios.post(SHOPIER_TOKEN_URL, new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code,
    }), { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });

    tokenStore.access_token = tokenRes.data.access_token;
    tokenStore.refresh_token = tokenRes.data.refresh_token;
    tokenStore.expires_at = Date.now() + (tokenRes.data.expires_in * 1000) - 60000;
    saveToken();

    console.log('OAuth success! Token expires:', new Date(tokenStore.expires_at).toISOString());

    res.send(`
      <html><body style="font-family:sans-serif;text-align:center;padding:50px">
        <h1 style="color:#27ae60">Shopier Connected!</h1>
        <p>Your app is now connected to Shopier.</p>
        <a href="/" style="color:#3498db;font-size:18px">Go to Store</a>
        <script>setTimeout(()=>window.location='/',3000)</script>
      </body></html>
    `);
  } catch (err) {
    console.error('Token exchange failed:', err.response?.data || err.message);
    res.status(500).send(`
      <html><body style="font-family:sans-serif;text-align:center;padding:50px">
        <h1 style="color:#e74c3c">Connection Failed</h1>
        <p>${err.response?.data?.error_description || err.message}</p>
        <a href="/install" style="color:#3498db">Try Again</a>
      </body></html>
    `);
  }
});

// ─── Purchase Flow ──────────────────────────────────────────

app.post('/payment', async (req, res) => {
  try {
    const { amount, productName, firstName, lastName, email, phone, productCode } = req.body;
    const transactionId = 'TXN_' + Date.now() + '_' + crypto.randomBytes(4).toString('hex');

    // Get product config
    const productConfig = getProductConfig(productCode);
    const productImage = productConfig?.image || process.env.DEFAULT_PRODUCT_IMAGE || 'https://beatra.app/logo.webp';

    const productPayload = {
      title: `${productName} - ${firstName} ${lastName}`,
      description: `Order: ${transactionId} | Product: ${productCode} | Buyer: ${email}`,
      type: 'digital',
      media: [
        { url: productImage, type: 'image', placement: 1 }
      ],
      priceData: {
        currency: 'TRY',
        price: parseFloat(amount),
      },
      stockStatus: 'in_stock',
      stockQuantity: 1,
      shippingPayer: 'sellerPays',
    };

    console.log('[PAYMENT] Creating product with payload:', JSON.stringify(productPayload, null, 2));
    const productRes = await shopierApi('post', '/products', productPayload);

    const shopierProduct = productRes.data;
    const shopierProductId = shopierProduct.id;

    // Store transaction
    pendingTransactions.set(transactionId, {
      status: 'pending',
      shopierProductId,
      productCode,
      productName,
      amount,
      buyer: { firstName, lastName, email, phone },
      createdAt: new Date().toISOString(),
    });
    saveTransactions();

    // Schedule cleanup if not paid
    scheduleProductCleanup(shopierProductId, transactionId, true);

    console.log(`[PAYMENT] Product created: ${shopierProductId}, txn: ${transactionId}`);

    // Redirect buyer to Shopier product page
    const productUrl = shopierProduct.url || shopierProduct.buy_url || `https://shopier.com/product/${shopierProductId}`;
    res.redirect(productUrl);

  } catch (err) {
    console.error('[PAYMENT] Creation error:', err.response?.status, err.response?.data || err.message);

    if (err.message === 'NOT_AUTHORIZED') {
      return res.send(`
        <html><body style="font-family:sans-serif;text-align:center;padding:50px">
          <h1 style="color:#e67e22">Shopier Not Connected</h1>
          <p>The store needs to be connected to Shopier first.</p>
          <a href="/install" style="display:inline-block;background:#667eea;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;margin-top:16px">Connect Shopier</a>
        </body></html>
      `);
    }

    res.status(500).send(`
      <html><body style="font-family:sans-serif;text-align:center;padding:50px">
        <h1 style="color:#e74c3c">Error</h1>
        <p>${err.message}</p>
        <a href="/" style="color:#3498db">Back to Homepage</a>
      </body></html>
    `);
  }
});

// ─── Payment Result Pages ───────────────────────────────────

app.get('/success', (req, res) => {
  const { orderId, productName, amount } = req.query;
  res.send(`
    <html><head>
      <meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    </head><body class="bg-gray-50 min-h-screen flex items-center justify-center">
      <div class="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i class="fas fa-check text-3xl text-green-500"></i>
        </div>
        <h1 class="text-2xl font-bold text-gray-800 mb-2">Payment Successful!</h1>
        <p class="text-gray-600 mb-4">Thank you for your purchase.</p>
        ${productName ? `<p class="text-lg font-semibold text-blue-600">${productName}</p>` : ''}
        ${amount ? `<p class="text-2xl font-bold text-gray-800 mt-2">${amount} TRY</p>` : ''}
        ${orderId ? `<p class="text-sm text-gray-500 mt-2">Order: ${orderId}</p>` : ''}
        <a href="/" class="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
          <i class="fas fa-home mr-2"></i>Back to Store
        </a>
      </div>
    </body></html>
  `);
});

app.get('/cancel', (req, res) => {
  res.send(`
    <html><head>
      <meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
      <script src="https://cdn.tailwindcss.com"></script>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    </head><body class="bg-gray-50 min-h-screen flex items-center justify-center">
      <div class="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
        <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i class="fas fa-times text-3xl text-red-500"></i>
        </div>
        <h1 class="text-2xl font-bold text-gray-800 mb-2">Payment Cancelled</h1>
        <p class="text-gray-600 mb-4">Your payment was not completed.</p>
        <a href="/" class="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition">
          <i class="fas fa-home mr-2"></i>Back to Store
        </a>
      </div>
    </body></html>
  `);
});

// ─── Order Polling ──────────────────────────────────────────

let pollingInterval = null;

function startPolling(intervalMs = 15000) {
  if (pollingInterval) clearInterval(pollingInterval);

  pollingInterval = setInterval(async () => {
    if (pendingTransactions.size === 0) return;

    console.log(`[POLL] Checking ${pendingTransactions.size} pending transactions...`);

    for (const [txnId, txn] of pendingTransactions) {
      if (txn.status !== 'pending') continue;

      try {
        const ordersRes = await shopierApi('get', '/orders');
        const orders = Array.isArray(ordersRes.data) ? ordersRes.data : (ordersRes.data.orders || []);

        for (const order of orders) {
          if (order.paymentStatus !== 'paid') continue;

          // Check if this order contains our product
          for (const item of order.lineItems || []) {
            if (item.productId == txn.shopierProductId) {
              console.log(`[POLL] Payment found for txn: ${txnId}, order: ${order.id}`);

              // Cancel cleanup timer
              cancelCleanup(txnId);

              // Update transaction
              pendingTransactions.set(txnId, {
                ...txn,
                status: 'paid',
                paidAt: new Date().toISOString(),
                orderId: order.id,
              });
              saveTransactions();

              // Delete product from Shopier
              try {
                await shopierApi('delete', `/products/${txn.shopierProductId}`);
                console.log(`[POLL] Product ${txn.shopierProductId} deleted`);
              } catch (e) {
                console.log(`[POLL] Product delete failed (may already be deleted): ${e.message}`);
              }

              // Fulfill order
              try {
                await shopierApi('put', `/orders/${order.id}`, {
                  fulfillments: {
                    productType: 'digital',
                    status: 'shipped',
                    tracking_number: 'Teslim edildi',
                    company: 'digital',
                    note: 'Otomatik teslim edildi',
                  },
                });
                console.log(`[POLL] Order ${order.id} fulfilled`);
              } catch (e) {
                console.log(`[POLL] Fulfill failed (may already be fulfilled): ${e.message}`);
              }

              break;
            }
          }
        }
      } catch (e) {
        console.log(`[POLL] Error checking orders: ${e.message}`);
      }
    }
  }, intervalMs);

  console.log(`[POLL] Started polling every ${intervalMs/1000} seconds`);
}

function stopPolling() {
  if (pollingInterval) {
    clearInterval(pollingInterval);
    pollingInterval = null;
    console.log('[POLL] Stopped');
  }
}

// ─── Start Server ───────────────────────────────────────────

loadToken();
loadTransactions();
startPolling(15000); // Poll every 15 seconds

app.listen(port, () => {
  console.log(`Server running at ${SERVER_URL}`);
  console.log('Shopier OAuth integration ready!');
  console.log(`Connect Shopier: ${SERVER_URL}/install`);
  console.log(`Redirect URI: ${REDIRECT_URI}`);
  console.log(`Payment timeout: ${PAYMENT_TIMEOUT} minutes`);
});