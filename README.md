# Shopier Integration - Node.js Payment System

Automated payment system using Shopier OAuth. Orders are tracked via polling, auto-fulfilled, and unpaid products are cleaned up.

---

## Features

- **OAuth 2.0** - Secure Shopier connection with auto token refresh
- **Polling** - Checks for payments every 15 seconds
- **Auto-Fulfill** - Orders automatically marked as shipped after payment
- **Timeout Cleanup** - Unpaid products deleted after 10 minutes
- **Product Images** - Configured in products.json
- **No Webhooks** - Uses polling instead (more reliable)

---

## Quick Start

```bash
npm install
node index.js
```

Server runs at `http://localhost:3000` (port from .env)

---

## Configuration

### .env

```env
SHOPIER_CLIENT_ID=your_client_id
SHOPIER_CLIENT_SECRET=your_client_secret
SERVER_URL=https://your-public-url.com
PORT=3000
PAYMENT_TIMEOUT_MINUTES=10
DEFAULT_PRODUCT_IMAGE=https://your-domain.com/default-image.png
CONTACT_EMAIL=support@your-domain.com
CONTACT_PHONE=+90 5XX XXX XXXX
CONTACT_ADDRESS=Turkey
DISCORD_URL=https://discord.gg/your-server
```

### data/products.json

```json
{
  "products": [
    {
      "id": "website-package",
      "name": "Website Package",
      "price": 1,
      "image": "https://your-domain.com/image.png",
      "active": true
    }
  ]
}
```

---

## Payment Flow

```
1. User → POST /payment
2. Server creates product in Shopier → Redirect to Shopier
3. User pays on Shopier
4. Polling finds payment (every 15 sec) → Fulfill + Delete product
5. If unpaid for 10 min → Product auto-deleted
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Store page |
| `GET` | `/api/products` | List products |
| `GET` | `/api/orders/pending` | Pending transactions |
| `GET` | `/api/orders/:id/status` | Order status |
| `POST` | `/payment` | Create product & redirect |
| `GET` | `/install` | Start OAuth |
| `GET` | `/callback` | OAuth callback |
| `GET` | `/success` | Payment success page |
| `GET` | `/cancel` | Payment cancelled page |

---

## File Structure

```
shopier-integration/
├── index.js
├── .env
├── data/
│   ├── .shopier_token      # OAuth token (auto-created)
│   ├── .shopier_transactions # Transactions (auto-created)
│   └── products.json
└── public/
    └── index.html
```

---

## Data Files Location

All data files are in `/data` folder:
- `data/.shopier_token` - OAuth token
- `data/.shopier_transactions` - Transaction records

---

## Troubleshooting

**Polling not detecting payments?**
- Check `SERVER_URL` is public
- Check Cloudflare tunnel is running

**Token expired?**
- Delete `data/.shopier_token`
- Visit `/install` to re-authenticate

---

## License

MIT - Umut Bayraktar