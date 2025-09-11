require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const { Shopier } = require('shopier-api');

const app = express();
const port = process.env.PORT || 80;
const upload = multer();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(upload.any()); // Multipart/form-data için
app.use(express.static(path.join(__dirname, 'public')));

// API credentials from environment variables
const API_KEY = process.env.SHOPIER_API_KEY;
const API_SECRET = process.env.SHOPIER_API_SECRET;

// Create Shopier instance
const shopier = new Shopier(API_KEY, API_SECRET);

// Contact information API endpoint
app.get('/api/contact', (req, res) => {
  res.json({
    email: process.env.CONTACT_EMAIL,
    phone: process.env.CONTACT_PHONE,
    address: process.env.CONTACT_ADDRESS,
    discord: process.env.DISCORD_URL
  });
});

// Products API endpoint
app.get('/api/products', (req, res) => {
  try {
    const fs = require('fs');
    const productsData = fs.readFileSync(path.join(__dirname, 'data', 'products.json'), 'utf8');
    const products = JSON.parse(productsData);
    // Only return active products
    const activeProducts = products.products.filter(product => product.active);
    res.json({ products: activeProducts });
  } catch (error) {
    console.error('Error loading products:', error);
    res.status(500).json({ error: 'Failed to load products' });
  }
});


// Home page - serve HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Product purchase - with form data
app.post('/payment', (req, res) => {
  try {
    const { amount, productName, firstName, lastName, email, phone, productCode } = req.body;
    
    console.log('Payment request received:', { amount, productName, firstName, lastName, email, phone, productCode });
    
    // Create new Shopier instance for each payment
    const shopier = new Shopier(API_KEY, API_SECRET);
    
    // Set customer information
    shopier.setBuyer({
      buyer_id_nr: 'ORDER_' + Date.now(),
      product_name: productName,
      buyer_name: firstName,
      buyer_surname: lastName,
      buyer_email: email,
      buyer_phone: phone
    });

    // Set billing address (default for digital products)
    shopier.setOrderBilling({
      billing_address: 'Digital Product - No Physical Address Required',
      billing_city: 'Istanbul',
      billing_country: 'Türkiye',
      billing_postcode: '34000'
    });

    // Set shipping address (same as billing for digital products)
    shopier.setOrderShipping({
      shipping_address: 'Digital Product - No Physical Address Required',
      shipping_city: 'Istanbul',
      shipping_country: 'Türkiye',
      shipping_postcode: '34000'
    });

    // Generate payment form
    const paymentHTML = shopier.generatePaymentHTML(parseFloat(amount));
    
    console.log('Payment HTML generated, redirecting...');
    res.send(paymentHTML);
  } catch (error) {
    console.error('Payment creation error:', error);
    res.status(500).send(`
      <div style="text-align: center; padding: 50px; font-family: Arial, sans-serif;">
        <h1 style="color: #e74c3c;">Error Occurred</h1>
        <p>${error.message}</p>
        <a href="/" style="color: #3498db;">Back to Homepage</a>
      </div>
    `);
  }
});

// Callback - Payment result from Shopier
app.post('/callback', (req, res) => {
  try {
    console.log('Callback received:', req.body);
    
    const { platform_order_id, status, random_nr, buyer_id_nr } = req.body;
    
    if (status === 'success') {
      // Payment successful
      console.log('Payment successful:', {
        platform_order_id,
        buyer_id_nr,
        status
      });
      
      // Here you can implement post-payment success logic:
      // - Send confirmation email
      // - Update database
      // - Send product access links
      // - Activate user account etc.
      
      const successData = {
        orderId: buyer_id_nr,
        platformOrderId: platform_order_id,
        buyerEmail: req.body.buyer_email || 'N/A',
        productName: req.body.product_name || 'Digital Product',
        amount: req.body.total_amount || 'N/A',
        CONTACT_EMAIL: process.env.CONTACT_EMAIL,
        CONTACT_PHONE: process.env.CONTACT_PHONE,
        CONTACT_ADDRESS: process.env.CONTACT_ADDRESS,
        DISCORD_URL: process.env.DISCORD_URL
      };

      res.render('success', successData);
    } else {
      // Payment failed
      console.log('Payment failed:', { platform_order_id, status });
      
      const errorData = {
        orderId: buyer_id_nr || 'N/A',
        error: 'Payment failed or was cancelled',
        CONTACT_EMAIL: process.env.CONTACT_EMAIL,
        CONTACT_PHONE: process.env.CONTACT_PHONE,
        CONTACT_ADDRESS: process.env.CONTACT_ADDRESS,
        DISCORD_URL: process.env.DISCORD_URL
      };

      res.render('error', errorData);
    }
  } catch (error) {
    console.error('Callback processing error:', error);
    res.status(500).render('error', { 
      orderId: 'N/A',
      error: 'System error occurred while processing payment result',
      CONTACT_EMAIL: process.env.CONTACT_EMAIL,
      CONTACT_PHONE: process.env.CONTACT_PHONE,
      CONTACT_ADDRESS: process.env.CONTACT_ADDRESS,
      DISCORD_URL: process.env.DISCORD_URL
    });
  }
});

app.listen(port, () => {
  console.log(`Server running at ${process.env.SERVER_URL}:${port}`);
  console.log('Shopier API integration ready!');
});