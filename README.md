# 🛒 EcoShop Backend – Single Vendor E-commerce API

This is the backend for **EcoShop**, a modern, single-vendor e-commerce platform. It provides all core functionalities like authentication, product management, cart, wishlist, order handling, and Stripe payments.

**Live Frontend**: [eco-shop-nine.vercel.app](https://eco-shop-nine.vercel.app)  
**Frontend Repo**: [single-vendor-client](https://github.com/shohaib1996/single-vendor-client)

---

## 🚀 Tech Stack

- **Node.js** + **Express**
- **TypeScript**
- **PostgreSQL** with **Prisma ORM**
- **JWT** for Authentication
- **Stripe** for Payments
- **Cloudinary** for Image Uploads
- **Nodemailer** for Emails
- **Hosted on Render**

---

## 📦 Features

- 🔐 **Authentication & Authorization** with JWT
- 📦 **Product Management** (CRUD for single-vendor)
- 🛒 **Cart & Wishlist** APIs
- 💳 **Secure Payments** using Stripe
- 📬 **Email Notifications** (e.g. Order Confirmation)
- ☁️ **Image Hosting** with Cloudinary

---

## 🛠️ Installation

```bash
git clone https://github.com/shohaib1996/single-vendor-backend.git
cd single-vendor-backend
npm install
````

---

## ⚙️ Environment Variables

Create a `.env` file at the root and include the following:

```env
DATABASE_URL=postgresql://<user>:<password>@<host>:<port>/<dbname>
PORT=5000

# JWT
JWT_SECRET=your_jwt_secret_key

# Stripe
STRIPE_SECRET_KEY=your_stripe_secret_key

# Email
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password

# Cloudinary
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Frontend Base URL
BASE_URL=http://localhost:3000
```

---

## 🚦 Start the Server

```bash
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

---

## 🧪 API Endpoints

Base URL: `https://single-vendor-backend-zz7x.onrender.com/api/v1`

Example endpoints:

* `POST /auth/register` – User registration
* `POST /auth/login` – User login
* `GET /products` – Get all products
* `POST /orders` – Create order
* `POST /payment/create-intent` – Stripe payment intent

(For full routes, check the `routes` directory.)

---

## 📤 Deployment

This backend is deployed using **Render** with a PostgreSQL database.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

## 🙌 Author

**Shohaib Hossain**
📧 [Email](mailto:khanshohaibhossain@gmail.com)
🌐 [Portfolio](https://shohaib-hossain.netlify.app/)

```
