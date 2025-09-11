# 🛍️ Shopier E-Commerce Platform# CodeShare Store - Shopier Payment Integration



<div align="center">Modern ve güvenli ödeme sistemi ile e-ticaret platformu.



![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)## 🚀 Özellikler

![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)

![Shopier](https://img.shields.io/badge/Shopier-FF6B35?style=for-the-badge&logo=shopify&logoColor=white)- ✅ Shopier API entegrasyonu

![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)- ✅ Güvenli ödeme sistemi

- ✅ Responsive tasarım (Tailwind CSS)

**A modern, professional e-commerce solution with Shopier payment integration**- ✅ Modern kullanıcı arayüzü

- ✅ Environment variables ile güvenlik

[Demo](http://codeshare.me) • [Documentation](#-documentation) • [Features](#-features) • [Installation](#-installation)- ✅ Callback doğrulama sistemi

- ✅ Otomatik hash kontrolü

</div>- ✅ Mobil uyumlu tasarım

- ✅ Loading animasyonları

---- ✅ Success/Error sayfaları



## 📋 Table of Contents## 🛠️ Teknolojiler



- [🌟 Features](#-features)- **Backend**: Node.js, Express.js

- [🚀 Quick Start](#-quick-start)- **Payment**: Shopier API (Official Package)

- [⚙️ Installation](#️-installation)- **Frontend**: HTML5, CSS3, JavaScript ES6

- [🔧 Configuration](#-configuration)- **Styling**: Tailwind CSS, Font Awesome

- [📁 Project Structure](#-project-structure)- **Security**: Environment Variables, MD5 Hash Validation

- [🛠️ API Endpoints](#️-api-endpoints)- **Dependencies**: 

- [💳 Payment Integration](#-payment-integration)  - express ^4.18.2

- [🎨 Frontend Features](#-frontend-features)  - shopier-api ^1.1.4

- [🔒 Security](#-security)  - body-parser ^1.20.2

- [🌍 Environment Variables](#-environment-variables)  - dotenv ^16.3.1

- [📱 Responsive Design](#-responsive-design)  - axios ^1.6.0

- [🐛 Troubleshooting](#-troubleshooting)

- [🤝 Contributing](#-contributing)## 📋 Kurulum

- [📄 License](#-license)

- [👨‍💻 Author](#-author)### 1. Projeyi klonlayın

```bash

---git clone <repository-url>

cd shopier-nodejs-integration-and-website

## 🌟 Features```



### 💼 **Business Features**### 2. Bağımlılıkları yükleyin

- ✅ **Digital Product Sales** - Optimized for software, apps, and digital services```bash

- ✅ **Dynamic Product Management** - JSON-based product catalog with CRUD operationsnpm install

- ✅ **Secure Payment Processing** - Full Shopier API integration```

- ✅ **Order Management** - Complete order tracking and management system

- ✅ **Email Notifications** - Automated confirmation emails### 3. Environment variables ayarlayın

- ✅ **Multi-language Support** - Full English implementation`.env` dosyasını oluşturun ve aşağıdaki değerleri düzenleyin:



### 🎨 **Design & UX**```env

- ✅ **Modern UI/UX** - Clean, professional Tailwind CSS design# Shopier API Credentials

- ✅ **Responsive Design** - Mobile-first approach, works on all devicesSHOPIER_API_KEY=your_api_key_here

- ✅ **Interactive Elements** - Smooth animations and transitionsSHOPIER_API_SECRET=your_api_secret_here

- ✅ **Loading States** - User-friendly loading indicatorsSHOPIER_CALLBACK_URL=https://yourdomain.com/shopier/callback

- ✅ **Error Handling** - Comprehensive error pages and messages

# Server Configuration

### 🔧 **Technical Features**PORT=80

- ✅ **RESTful API** - Clean API architectureNODE_ENV=production

- ✅ **Environment Configuration** - Secure environment variables```

- ✅ **Template Engine** - Mustache template rendering

- ✅ **Static File Serving** - Optimized asset delivery### 4. Sunucuyu başlatın

- ✅ **CORS Support** - Cross-origin resource sharing```bash

- ✅ **Request Validation** - Input validation and sanitization# Development

npm start

---

# Production (Port 80)

## 🚀 Quick Startsudo node index.js

```

```bash

# Clone the repository## 🔧 Konfigürasyon

git clone https://github.com/umutxyp/shopier-nodejs-integration-and-website.git

cd shopier-nodejs-integration-and-website### Shopier API Ayarları



# Install dependencies1. [Shopier Panel](https://panel.shopier.com)'den API bilgilerinizi alın

npm install2. `.env` dosyasında `SHOPIER_API_KEY` ve `SHOPIER_API_SECRET` değerlerini güncelleyin

3. Callback URL'yi Shopier panelinde `https://yourdomain.com/shopier/callback` olarak ayarlayın

# Configure environment variables

cp .env.example .env### Domain Settings

# Edit .env with your configuration

All URLs in the code are configured for `yourdomain.com`. For your own domain:

# Start the server

npm start1. Update `SHOPIER_CALLBACK_URL` in `.env` file

2. Update callback URL in Shopier panel

# Open your browser

open http://localhost:80## 📁 Proje Yapısı

```

```

---Shopier Node.js Payment Integration/

├── index.js                 # Ana sunucu dosyası

## ⚙️ Installation├── package.json             # Proje bağımlılıkları

├── .env                     # Environment variables (GİZLİ)

### Prerequisites├── .gitignore              # Git ignore kuralları

- **Node.js** (v14 or higher)├── README.md               # Bu dosya

- **npm** or **yarn**├── public/                 # Statik dosyalar

- **Shopier merchant account**│   ├── index.html          # Ana sayfa

│   ├── css/

### Step-by-Step Installation│   │   └── style.css       # Özel CSS stilleri

│   └── js/

1. **Clone the Repository**│       └── script.js       # Client-side JavaScript

   ```bash└── templates/              # HTML şablonları

   git clone https://github.com/umutxyp/shopier-nodejs-integration-and-website.git    ├── success.html        # Başarılı ödeme sayfası

   cd shopier-nodejs-integration-and-website    └── error.html          # Hata sayfası

   ``````



2. **Install Dependencies**## 🎯 API Endpoints

   ```bash

   npm install### Frontend Routes

   ```- `GET /` - Ana sayfa

- `GET /css/style.css` - CSS dosyası

3. **Environment Setup**- `GET /js/script.js` - JavaScript dosyası

   ```bash

   cp .env.example .env### Payment Routes

   nano .env  # Configure your environment variables- `POST /payment` - Ödeme başlatma

   ```- `POST /shopier/callback` - Shopier callback



4. **Start Development Server**### Response Pages

   ```bash- `GET /success` - Başarılı ödeme sayfası

   npm run dev- `GET /error` - Hata sayfası

   ```

## 💳 Ödeme Süreci

5. **Production Deployment**

   ```bash1. **Ürün Seçimi**: Kullanıcı ürünü seçer ve "Satın Al" butonuna tıklar

   npm start2. **Form Doldurma**: Modal'da müşteri bilgilerini doldurur

   ```3. **Ödeme Yönlendirme**: Shopier'e yönlendirilir

4. **Ödeme**: Kullanıcı ödemeyi tamamlar

---5. **Callback**: Shopier sonucu sisteme bildirir

6. **Doğrulama**: Hash kontrolü yapılır

## 🔧 Configuration7. **Sonuç**: Başarı/hata sayfasına yönlendirilir



### Environment Variables## 🔒 Güvenlik



Create a `.env` file in the root directory:- ✅ Environment variables ile API key'ler korunur

- ✅ MD5 hash ile callback doğrulama

```env- ✅ Input sanitization

# Shopier API Credentials- ✅ HTTPS redirect (production için)

SHOPIER_API_KEY=your_api_key_here- ✅ .gitignore ile hassas dosyalar korunur

SHOPIER_API_SECRET=your_api_secret_here

SHOPIER_CALLBACK_URL=https://yourdomain.com/callback## 🐛 Sorun Giderme



# Server Configuration### Yaygın Hatalar

PORT=80

NODE_ENV=production1. **403 Forbidden Error**

SERVER_URL=http://yourdomain.com   - API key'leri kontrol edin

   - Shopier panelinde IP whitelist kontrolü yapın

# Contact Information

CONTACT_EMAIL=support@yourdomain.com2. **CSS Yüklenmiyor**

CONTACT_PHONE=+1 234 567 8900   - Static file serving'in doğru çalıştığından emin olun

CONTACT_ADDRESS=Your Business Address   - Browser cache'i temizleyin

DISCORD_URL=https://discord.gg/your-server

```3. **Callback Çalışmıyor**

   - Callback URL'nin doğru olduğundan emin olun

### Shopier Setup   - Hash hesaplama algoritmasını kontrol edin



1. **Create Shopier Account**## 📞 Support

   - Register at [Shopier.com](https://www.shopier.com)

   - Complete merchant verification- **Email**: Set in environment variables

- **Phone**: Set in environment variables  

2. **Get API Credentials**- **Website**: https://yourdomain.com

   - Navigate to API settings in your Shopier dashboard

   - Copy API Key and API Secret## 📄 Lisans

   - Set callback URL to `https://yourdomain.com/callback`

Bu proje özel bir proje olup, ticari kullanım için izin gereklidir.

3. **Configure Webhook**

   - Set payment success URL: `https://yourdomain.com/success`---

   - Set payment error URL: `https://yourdomain.com/error`

**CodeShare Store** - Premium Yazılım Çözümleri

---

1. `npm start` komutunu çalıştırarak server'ı başlatın.

## 📁 Project Structure2. Tarayıcıda `http://localhost:3000` adresine gidin.

3. Ana sayfada "300TL Ödeme Yap" linkine tıklayın veya formu doldurun.

```

shopier-nodejs-integration-and-website/## Yeni Özellik: Ürün İçin Ödeme Linki

├── 📁 data/

│   └── products.json          # Product catalog- `/pay/:amount` route'u ile belirli tutar için ödeme linki oluşturun.

├── 📁 public/- Örnek: `http://localhost:3000/pay/300` - 300TL için Shopier ödeme sayfasına yönlendirir.

│   ├── 📁 css/- Ürün adı sabit olarak "Ürün A" ayarlandı.

│   │   └── style.css         # Custom styles- Sipariş ID otomatik oluşturulur.

│   ├── 📁 js/

│   │   └── script.js         # Frontend JavaScript## Callback

│   └── index.html            # Main landing page

├── 📁 templates/Callback URL'si `https://codeshare.me/shopier/callback` olarak ayarlandı. Bu URL'yi Shopier panelinizde callback URL olarak ayarlamanız gerekir.

│   ├── success.html          # Payment success page

│   └── error.html            # Payment error pageCallback'te gelen veriler doğrulanır ve hash kontrolü yapılır.

├── 📄 index.js               # Main server file

├── 📄 package.json           # Dependencies and scripts## API Bilgileri

├── 📄 .env                   # Environment variables

└── 📄 README.md              # Documentation- API Kullanıcı: d3065bafa4ece6ff4ba6b4e2ee4ecd23

```- API Şifre: 865e351026811125b4585584d7a6e6b0



---Bu bilgileri kodda güncellediğinizden emin olun.



## 🛠️ API Endpoints## Notlar



### 🔐 **Public Endpoints**- Bu örnek basit bir entegrasyon için tasarlandı.

- Gerçek projede güvenlik önlemleri alın (örneğin, HTTPS kullanın).

| Method | Endpoint | Description |- Ürün kategorileri ve türleri Shopier dokümantasyonuna göre ayarlanabilir.
|--------|----------|-------------|
| `GET` | `/` | Main landing page |
| `GET` | `/api/contact` | Get contact information |
| `GET` | `/api/products` | Get active products |
| `POST` | `/payment` | Process payment |
| `POST` | `/callback` | Shopier payment callback |

### 🔒 **Admin Endpoints**

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/admin/products` | Get all products (including inactive) |
| `POST` | `/admin/products` | Create new product |
| `PUT` | `/admin/products/:id` | Update product |
| `DELETE` | `/admin/products/:id` | Delete product |

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
| `NODE_ENV` | Environment mode | `production` |
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

### Debug Mode

Enable debug mode by setting:
```env
NODE_ENV=development
DEBUG=true
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
in the Software without restriction...
```

---

## 👨‍💻 Author

<div align="center">

### **Umut Bayraktar**

[![GitHub](https://img.shields.io/badge/GitHub-umutxyp-181717?style=for-the-badge&logo=github)](https://github.com/umutxyp)
[![Website](https://img.shields.io/badge/Website-codeshare.me-4285F4?style=for-the-badge&logo=google-chrome&logoColor=white)](https://codeshare.me)
[![Email](https://img.shields.io/badge/Email-Contact-D14836?style=for-the-badge&logo=gmail&logoColor=white)](mailto:contact@codeshare.me)

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

[Get Started](http://codeshare.me) • [Contact Support](mailto:contact@codeshare.me) • [View Portfolio](https://codeshare.me)

**Made with ❤️ by Umut Bayraktar**

</div>

---

<div align="center">

![Visitors](https://visitor-badge.laobi.icu/badge?page_id=umutxyp.shopier-nodejs-integration-and-website)
![Stars](https://img.shields.io/github/stars/umutxyp/shopier-nodejs-integration-and-website?style=social)
![Forks](https://img.shields.io/github/forks/umutxyp/shopier-nodejs-integration-and-website?style=social)

</div>