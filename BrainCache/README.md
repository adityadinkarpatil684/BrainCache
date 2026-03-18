# BrainCache 🧠

A full-stack note-taking application with image/file uploads, tags, pinning, and archiving.


https://github.com/user-attachments/assets/2833d263-13b0-4451-893a-268a72c1fb34



## Tech Stack
- **Frontend:** React.js, React Router, Lucide React, Vanilla CSS
- **Backend:** Node.js, Express.js
- **Database:** MySQL
- **Auth:** JWT (JSON Web Tokens)
- **File Storage:** Cloudinary + Multer
- **Build Tool:** Vite

---

## 🚀 Setup & Run

### Prerequisites
- Node.js v18+
- MySQL running locally
- Cloudinary account (free tier works)

---

### 1. Database Setup

Open MySQL and run:
```sql
CREATE DATABASE braincache;
```
> Tables are auto-created when you start the server.

---

### 2. Backend Setup

```bash
cd backend
npm install
```

Edit `.env` file with your credentials:
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=braincache
JWT_SECRET=your_secret_key_here
JWT_EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
CLIENT_URL=http://localhost:5173
```

Start backend:
```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

Backend runs at: `http://localhost:5000`

---

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Edit `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

Start frontend:
```bash
npm run dev
```

Frontend runs at: `http://localhost:5173`

---

## 📁 Project Structure

```
BrainCache/
├── backend/
│   ├── config/
│   │   ├── db.js           # MySQL pool connection
│   │   ├── initDB.js       # Auto-create tables
│   │   └── cloudinary.js   # Cloudinary + Multer config
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── noteController.js
│   │   ├── tagController.js
│   │   └── uploadController.js
│   ├── middleware/
│   │   └── authMiddleware.js  # JWT verify
│   ├── models/
│   │   ├── userModel.js
│   │   ├── noteModel.js
│   │   └── tagModel.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── noteRoutes.js
│   │   ├── tagRoutes.js
│   │   └── uploadRoutes.js
│   ├── server.js
│   ├── .env
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Layout.jsx
    │   │   ├── NoteCard.jsx
    │   │   ├── NoteModal.jsx
    │   │   ├── TagsModal.jsx
    │   │   └── ToastContainer.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── hooks/
    │   │   └── useToast.js
    │   ├── pages/
    │   │   ├── LoginPage.jsx
    │   │   ├── RegisterPage.jsx
    │   │   ├── DashboardPage.jsx
    │   │   ├── ArchivePage.jsx
    │   │   └── ProfilePage.jsx
    │   ├── styles/
    │   │   └── global.css
    │   ├── api.js
    │   ├── App.jsx
    │   └── main.jsx
    ├── index.html
    ├── vite.config.js
    ├── .env
    └── package.json
```

## Features
- ✅ JWT Authentication (Register / Login)
- ✅ Create, Edit, Delete Notes
- ✅ Note types: Text, Image, Link, File
- ✅ Image/File upload via Cloudinary + Multer
- ✅ Custom Tags with color picker
- ✅ Pin / Archive notes
- ✅ Search & filter notes
- ✅ Avatar upload
- ✅ Responsive CSS layout
