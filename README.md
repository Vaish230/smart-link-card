# Smart Link Card

A no-backend web app that turns any link into a beautiful shareable card with QR code support.  
The entire card is encoded inside the URL itself, making it fully self-contained and shareable.

---

## 🚀 Live Demo
[https://your-vercel-link.vercel.app](https://smart-link-card.vercel.app/)

---

## ✨ Features

- Create link cards (Title, Description, URL)
- Live preview while typing
- Shareable encoded URL system
- QR code generation for each card
- QR opens exact same card view
- Download card as PNG
- Copy shareable link
- Fully responsive UI
- No backend required

---

## 🧠 How It Works

User inputs data →  
Data is encoded into URL token →  
Token generates shareable link →  
QR code uses same link →  
Opening link decodes and renders card.

---

## 🛠️ Tech Stack

- React 18
- Vite
- React Router v6
- HTML + CSS + JS
- qrcode.react
- html-to-image

---

## 📁 Project Structure

smart-link-card/
├── index.html
├── vite.config.js
├── vercel.json
├── package.json
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── pages/
    │   ├── GeneratorPage.jsx
    │   └── CardViewerPage.jsx
    ├── components/
    │   ├── Header.jsx
    │   ├── Footer.jsx
    │   ├── LinkCard.jsx
    │   ├── QrPanel.jsx
    │   └── ExportPanel.jsx
    ├── utils/
    │   ├── cardEncoding.js
    │   ├── clipboard.js
    │   ├── exportImage.js
    │   └── validation.js
    └── styles/

---

## ⚙️ Setup

npm install  
npm run dev

---

## 📦 Build

npm run build

---

## 🚀 Deploy

- Push to GitHub
- Import in Vercel
- Framework: Vite
- Click Deploy

---

## 🎯 Mandatory Requirement

Button: "Built for Digital Heroes"  
Link: https://digitalheroesco.com  
Must include full name + email in footer

---

## 👤 Author

Vaishnavi Awate  
vaishnavi230906@gmail.com

---
