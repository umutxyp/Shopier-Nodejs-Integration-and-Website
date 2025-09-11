# 🛍️ Shopier E-Commerce Platform
### CodeShare Store - Professional Payment Integration

<div align="center">

**A modern, secure e-commerce platform with Shopier payment integration**

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![Shopier](https://img.shields.io/badge/Shopier-FF6B35?style=for-the-badge&logo=shopify&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

[Documentation](#-documentation) • [Features](#-features) • [Installation](#-installation)

</div>

---

## 📋 Table of Contents

- [🌟 Features](#-features)
- [🚀 Quick Start](#-quick-start)
- [⚙️ Installation](#️-installation)
- [🔧 Configuration](#-configuration)
- [📁 Project Structure](#-project-structure)
- [🛠️ API Endpoints](#️-api-endpoints)
- [💳 Payment Integration](#-payment-integration)
- [🎨 Frontend Features](#-frontend-features)
- [🔒 Security](#-security)
- [🌍 Environment Variables](#-environment-variables)
- [📱 Responsive Design](#-responsive-design)
- [🐛 Troubleshooting](#-troubleshooting)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [👨‍💻 Author](#-author)

---

## 🌟 Features

### 💼 **Business Features**
- ✅ **Digital Product Sales** - Optimized for software, apps, and digital services
- ✅ **Dynamic Product Management** - JSON-based product catalog with CRUD operations
- ✅ **Secure Payment Processing** - Full Shopier API integration
- ✅ **Order Management** - Complete order tracking and management system
- ✅ **Email Notifications** - Automated confirmation emails
- ✅ **Multi-language Support** - Full English implementation

### 🎨 **Design & UX**
- ✅ **Modern UI/UX** - Clean, professional Tailwind CSS design
- ✅ **Responsive Design** - Mobile-first approach, works on all devices
- ✅ **Interactive Elements** - Smooth animations and transitions
- ✅ **Loading States** - User-friendly loading indicators
- ✅ **Error Handling** - Comprehensive error pages and messages

### 🔧 **Technical Features**
- ✅ **RESTful API** - Clean API architecture
- ✅ **Environment Configuration** - Secure environment variables
- ✅ **Template Engine** - Mustache template rendering
- ✅ **Static File Serving** - Optimized asset delivery
- ✅ **CORS Support** - Cross-origin resource sharing
- ✅ **Request Validation** - Input validation and sanitization

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/umutxyp/shopier-nodejs-integration-and-website.git
cd shopier-nodejs-integration-and-website

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your configuration

# Start the server
npm start

# Open your browser
open http://localhost:80
```

---

## ⚙️ Installation

### Prerequisites
- **Node.js** (v14 or higher)
- **npm** or **yarn**
- **Shopier merchant account**

### Step-by-Step Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/umutxyp/shopier-nodejs-integration-and-website.git
   cd shopier-nodejs-integration-and-website
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   nano .env  # Configure your environment variables
   ```

4. **Production Deployment**
   ```bash
   npm start
   ```

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Shopier API Credentials
SHOPIER_API_KEY=your_api_key_here
SHOPIER_API_SECRET=your_api_secret_here
SHOPIER_CALLBACK_URL=https://yourdomain.com/callback

# Server Configuration
PORT=80
SERVER_URL=http://yourdomain.com

# Contact Information
CONTACT_EMAIL=support@yourdomain.com
CONTACT_PHONE=+1 234 567 8900
CONTACT_ADDRESS=Your Business Address
DISCORD_URL=https://discord.gg/your-server
```

### Shopier Setup

1. **Create Shopier Account**
   - Register at [Shopier.com](https://www.shopier.com)
   - Complete merchant verification

2. **Get API Credentials**
   - Navigate to API settings in your Shopier dashboard
   - Copy API Key and API Secret
   - Set callback URL to `https://yourdomain.com/callback`

3. **Configure Webhook**
   - Set payment success URL: `https://yourdomain.com/success`
   - Set payment error URL: `https://yourdomain.com/error`

---

## 📁 Project Structure

```
shopier-nodejs-integration-and-website/
├── 📁 data/
│   └── products.json          # Product catalog
├── 📁 public/
│   ├── 📁 css/
│   │   └── style.css         # Custom styles
│   ├── 📁 js/
│   │   └── script.js         # Frontend JavaScript
│   └── index.html            # Main landing page
├── 📁 templates/
│   ├── success.html          # Payment success page
│   └── error.html            # Payment error page
├── 📄 index.js               # Main server file
├── 📄 package.json           # Dependencies and scripts
├── 📄 .env                   # Environment variables
└── 📄 README.md              # Documentation
```

---

## 🛠️ API Endpoints

### 🔐 **Public Endpoints**

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Main landing page |
| `GET` | `/api/contact` | Get contact information |
| `GET` | `/api/products` | Get active products |
| `POST` | `/payment` | Process payment |
| `POST` | `/callback` | Shopier payment callback |


### 📝 **API Examples**

#### Get Products
```javascript
fetch('/api/products')
  .then(response => response.json())
  .then(data => console.log(data.products));
```

#### Create Payment
```javascript
const paymentData = {
  productName: 'Website Package',
  amount: '250',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  phone: '+1234567890',
  productCode: 'website-package'
};

fetch('/payment', {
  method: 'POST',
  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  body: new URLSearchParams(paymentData)
});
```

---

## 💳 Payment Integration

### Shopier Integration Features

- **Secure Payment Processing** - Industry-standard security
- **Multiple Payment Methods** - Credit cards, bank transfers, digital wallets
- **Real-time Callbacks** - Instant payment status updates
- **Automatic Receipts** - Email confirmations for all transactions
- **Refund Support** - Easy refund processing through Shopier dashboard

### Payment Flow

1. **Product Selection** - Customer selects a product
2. **Form Submission** - Customer enters payment details
3. **Shopier Redirect** - Secure redirect to Shopier payment page
4. **Payment Processing** - Customer completes payment
5. **Callback Handling** - Server receives payment confirmation
6. **Order Completion** - Customer redirected to success/error page

---

## 🎨 Frontend Features

### Modern Design Elements

- **Glassmorphism Effects** - Modern translucent design elements
- **Gradient Backgrounds** - Eye-catching color gradients
- **Interactive Cards** - Hover effects and smooth transitions
- **Responsive Typography** - Optimized text scaling
- **Font Awesome Icons** - Professional iconography

### User Experience

- **Loading Animations** - Smooth loading indicators
- **Form Validation** - Real-time input validation
- **Error Messages** - User-friendly error handling
- **Success Feedback** - Clear confirmation messages
- **Mobile Optimization** - Touch-friendly interface

### CSS Framework

Built with **Tailwind CSS** for:
- Rapid development
- Consistent design system
- Mobile-first approach
- Customizable components
- Optimized bundle size

---

## 🔒 Security

### Security Measures

- ✅ **Environment Variables** - Sensitive data stored securely
- ✅ **Input Validation** - All user inputs validated and sanitized
- ✅ **HTTPS Enforcement** - Secure data transmission
- ✅ **CORS Configuration** - Controlled cross-origin requests
- ✅ **Error Handling** - Secure error messages
- ✅ **No Hardcoded Secrets** - All credentials in environment files

### Best Practices

- API keys stored in environment variables
- Input sanitization for all forms
- Secure callback URL validation
- Error logging without sensitive data exposure
- Regular security updates for dependencies

---

## 🌍 Environment Variables

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `SHOPIER_API_KEY` | Your Shopier API key | `d3065bafa4ece6ff...` |
| `SHOPIER_API_SECRET` | Your Shopier API secret | `865e351026811125...` |
| `SHOPIER_CALLBACK_URL` | Payment callback URL | `https://domain.com/callback` |
| `PORT` | Server port | `80` |
| `SERVER_URL` | Server base URL | `http://codeshare.me` |

### Optional Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `CONTACT_EMAIL` | Support email | `support@example.com` |
| `CONTACT_PHONE` | Support phone | `+1 234 567 8900` |
| `CONTACT_ADDRESS` | Business address | `San Francisco, CA` |
| `DISCORD_URL` | Discord server link | `https://discord.gg/example` |

---

## 📱 Responsive Design

### Breakpoints

- **Mobile**: `< 768px` - Optimized for smartphones
- **Tablet**: `768px - 1024px` - Perfect for tablets
- **Desktop**: `> 1024px` - Full desktop experience

### Mobile Features

- Touch-friendly buttons and forms
- Optimized image loading
- Swipe-friendly product cards
- Mobile-optimized payment flow
- Fast loading times

---

## 🐛 Troubleshooting

### Common Issues

#### ❌ **Payment Not Processing**
```bash
# Check Shopier credentials
echo $SHOPIER_API_KEY
echo $SHOPIER_API_SECRET

# Verify callback URL
curl -X POST http://localhost:80/callback
```

#### ❌ **Products Not Loading**
```bash
# Check products.json file
cat data/products.json

# Test products API
curl http://localhost:80/api/products
```

#### ❌ **Environment Variables Not Loading**
```bash
# Verify .env file exists
ls -la .env

# Check environment loading
node -e "require('dotenv').config(); console.log(process.env.SHOPIER_API_KEY);"
```

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the Repository**
   ```bash
   git fork https://github.com/umutxyp/shopier-nodejs-integration-and-website.git
   ```

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Commit Changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```

4. **Push to Branch**
   ```bash
   git push origin feature/amazing-feature
   ```

5. **Open Pull Request**

### Development Guidelines

- Follow existing code style
- Add tests for new features
- Update documentation
- Ensure mobile responsiveness
- Test payment integration thoroughly

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2025 Umut Bayraktar

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
```

---

## 👨‍💻 Author

<div align="center">

### **Umut Bayraktar**

[![GitHub](https://img.shields.io/badge/GitHub-umutxyp-181717?style=for-the-badge&logo=github)](https://github.com/umutxyp)
[![Website](https://img.shields.io/badge/Website-codeshare.me-4285F4?style=for-the-badge&logo=google-chrome&logoColor=white)](https://codeshare.me)
[![Email](https://img.shields.io/badge/Email-Contact-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:umut@codeshare.me)

**Full-Stack Developer | E-Commerce Specialist | Payment Integration Expert**

</div>

### 🛠️ **Expertise**
- **Frontend**: React, Vue.js, Tailwind CSS, JavaScript ES6+
- **Backend**: Node.js, Express.js, Python, PHP
- **Payment Systems**: Shopier, Stripe, PayPal, İyzico
- **E-Commerce**: WooCommerce, Shopify, Custom Solutions
- **Databases**: MongoDB, MySQL, PostgreSQL

### 🎯 **Services**
- Custom E-Commerce Development
- Payment Gateway Integration
- API Development & Integration
- Mobile App Development
- Website Design & Development

---

<div align="center">

### 🚀 **Ready to Start Your E-Commerce Journey?**

[Contact Support](mailto:umut@codeshare.me) • [CodeShare](https://codeshare.me)

**Made with ❤️ by Umut Bayraktar**

---

![Visitors](https://visitor-badge.laobi.icu/badge?page_id=umutxyp.shopier-nodejs-integration-and-website)
![Stars](https://img.shields.io/github/stars/umutxyp/shopier-nodejs-integration-and-website?style=social)
![Forks](https://img.shields.io/github/forks/umutxyp/shopier-nodejs-integration-and-website?style=social)

</div>
