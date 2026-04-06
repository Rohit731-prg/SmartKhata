# 🧾 SmartKhata

SmartKhata is a full-stack ledger management application designed for small shop owners to manage customers, products, transactions, dues, and inventory in one place.

---

## 🚀 Features

- 👤 User Authentication (Shop Owner Account)
- 📦 Product Management (Add, Update, Delete)
- 👥 Customer Management
- 💰 Purchase & Transaction Tracking
- 📊 Automatic Due Calculation
- 🔍 Search Customers by Name/Phone
- 📉 Low Stock Alerts
- 📈 Monthly Insights (Users, Products, Sales)
- 🧾 Detailed Purchase History
- 📱 Mobile-Friendly UI

---

## 🧠 How It Works

- Shop owner creates an account and logs in
- Adds products and customers
- When a customer makes a purchase:
  - Select customer
  - Add products to cart
  - System calculates total, paid, and due
- App automatically:
  - Tracks all transactions
  - Updates dues
  - Shows low stock alerts
- Owner can view:
  - Customer purchase history
  - Transaction details
  - Pending dues

---

## 🛠️ Tech Stack

### Frontend
- React.js (with TypeScript)
- Zustand (State Management)
- Axios (API Handling)
- Tailwind CSS (UI)

### Backend
- Node.js
- Express.js
- MongoDB (with Mongoose)

---

## 📂 Project Structure (Basic)

SmartKhata/
│
├── client/ # Frontend (React + TS)
├── server/ # Backend (Express + MongoDB)


---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Rohit731-prg/SmartKhata.git
cd SmartKhata

2️⃣ Setup Backend
cd server
npm install

Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

Run backend:

npm run dev
3️⃣ Setup Frontend
cd client
npm install
npm run dev
