# 📝 MERN Blog Website

A full-stack blog website built using the MERN stack (MongoDB, Express.js, React.js, and Node.js). Users can create, edit, delete, and view blog posts. The app includes user authentication (register/login), comment functionality, and a responsive UI.

## 🚀 Features

- 🧾 User authentication (JWT based)
- 🖊️ Create, edit, delete, and view blog posts
- 🔐 Protected routes for authenticated users
- 📱 Fully responsive UI using Tailwind CSS
- 📦 RESTful API for frontend-backend interaction

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router
- Axios (for API requests)
- Tailwind CSS / Bootstrap (for styling)
- JWT decoding (e.g., `jwt-decode`)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- bcryptjs (for password hashing)
- jsonwebtoken (for authentication)
- CORS and dotenv packages


---

## 📁 Folder Structure
```
blog-app/
├── client/ # React frontend
│ ├── public/
│ └── src/
│ ├── components/
│ ├── pages/
│ ├── App.js
│ ├── .env
│ └── index.js
├── server/ # Node/Express backend
│ ├── controllers/
│ ├── models/
│ ├── routes/
│ ├── services/
│ ├── middleware/
│ ├── .env
│ └── index.js

```


---

## 📦 How to Start the Project

### Step 1: Clone the Repository

```bash
git clone https://github.com/your-username/blog-app.git
cd blogging-site
cd server
npm install

```
### Step 2: Set up env for backend

```bash
PORT=8080
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
SMTP_USER=your email (for nodemailer)
SMTP_PASS=your pass (generate from app passwords after turned on 2 step authentication)
frontend_url=http://localhost:5173
```

### Step 3: Start a server

``` bash
npm run dev

```
### Step 4: Set up frontend part

```bash
cd blogging-site
cd client
npm install

```

### Step 5: Set up frontend env

``` bash
VITE_BACKEND_URL = backend url
```
## Deployment Link
- https://blogging-site-1-78qb.onrender.com

## Contact

- yashpatoliya14@gmail.com
