

# 🎓 Eduford University – A Small Full Stack University Website

A responsive and interactive **full-stack university website** built using modern web technologies. This project simulates a real-world university portal with multiple pages, a functional contact system, and dynamic UI components.

🔗 **Live Demo:** *(Add your deployed link here)*
📂 **Repository:** GitHub

---

## 🚀 Project Overview

Eduford University is a full-stack web application designed to represent a modern educational institution website. It includes academic information, faculty details, blog sections, extracurricular activities, and a working backend-powered contact form.

This project demonstrates:

* Frontend development (HTML, CSS, JavaScript)
* Backend integration with Node.js & Express
* Form handling with email functionality
* Responsive design principles
* Clean UI/UX structure
* Project structuring for real-world deployment

---

## ✨ Features

* 🌐 Multi-page responsive website
* 🎓 Courses and Faculty information pages
* 📰 Blog section
* 🏀 Extracurricular activities page
* 📬 Contact form with backend email integration
* 💬 Basic chatbot functionality (JavaScript-based)
* 📱 Mobile-friendly design

---

## 🛠 Tech Stack

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Node.js
* Express.js
* Nodemailer
* Dotenv

### Deployment

* Compatible with Vercel / Render / Railway / Traditional Node hosting

---

## 📁 Project Structure

```
eduford_university_new/
│
├── index.html
├── about.html
├── Courses.html
├── faculty.html
├── extracurriculer.html
├── Blog.html
├── Contact.html
│
├── style.css
├── chatbot.js
│
├── server.js
├── package.json
├── .env
│
└── eduford_img/
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/dipta19062021/eduford_university_new.git
cd eduford_university_new
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Configure environment variables

Create a `.env` file in the root directory:

```
PORT=5000
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
```

### 4️⃣ Run the server

```bash
npm start
```

Open in browser:

```
http://localhost:5000
```

---

## 📬 Contact API Endpoint

| Method | Endpoint | Description                          |
| ------ | -------- | ------------------------------------ |
| POST   | /contact | Sends contact form message via email |

Example request body:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Course Inquiry",
  "message": "I would like more details about the CS program."
}
```

---

## 🎯 What This Project Demonstrates

✔ Ability to build a structured multi-page website
✔ Integration of frontend and backend
✔ Working with environment variables securely
✔ Email handling using Nodemailer
✔ Clean folder structure and maintainable code
✔ Deployment-ready architecture

---

## 📈 Future Improvements

* Database integration (MongoDB/MySQL)
* Admin dashboard for managing content
* Authentication system
* Real-time chatbot using AI API
* SEO optimization
* Docker containerization

---

