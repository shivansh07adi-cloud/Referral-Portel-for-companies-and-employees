# 🤝 Community Referral Portal

> A full-stack web app where **companies** list themselves to offer referrals, and **students or job seekers** can browse the directory and reach out directly.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=flat-square&logo=supabase)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat-square&logo=vercel)

### 🌐 [View Live Demo →](https://referral-portel-for-companies-and-e.vercel.app/)

---

## ✨ Features

- 📋 **Public directory** — anyone can browse registered companies instantly
- 🏢 **Company registration** — name, contact person, and mobile number
- 🔍 **Live search** — filter by company name or contact name
- 📱 **Fully responsive** — works on mobile and desktop
- ☁️ **Persistent data** — all entries saved in a real PostgreSQL database
- ⚡ **Zero login required** — open and accessible to everyone

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | [Next.js 14](https://nextjs.org/) |
| **Frontend** | [React 18](https://react.dev/) |
| **Database** | [Supabase](https://supabase.com/) (PostgreSQL) |
| **Hosting** | [Vercel](https://vercel.com/) |
| **Fonts** | Syne + DM Sans (Google Fonts) |
| **Styling** | CSS-in-JS (inline styles) |

---

## 📁 Project Structure

```
referral-portal/
├── pages/
│   ├── _app.js          # App entry, global styles
│   ├── index.js         # Public directory page
│   └── register.js      # Company registration page
├── lib/
│   └── supabase.js      # Supabase client
├── styles/
│   └── globals.css      # Global CSS & design tokens
└── package.json
```

---

## 📄 Pages

| Route | Description |
|---|---|
| `/` | Public directory — browse all registered companies |
| `/register` | Company registration form |

---

## 📌 About

Built for communities, college groups, and professional networks where members want referrals from companies. Companies register once and stay listed permanently. Job seekers browse the directory and reach out directly — no middleman.

---

© 2025 Shivansh Kumar. All rights reserved.

Open [http://localhost:3000](http://localhost:3000)
