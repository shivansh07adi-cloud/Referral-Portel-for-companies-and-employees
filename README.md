# 🤝 Community Referral Portal

> A clean, full-stack web app where **companies** list themselves to offer referrals, and **students or job seekers** can browse the directory and reach out directly.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?style=flat-square&logo=supabase)
![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=flat-square&logo=vercel)

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
├── .env.example         # Environment variable template
└── package.json
```

---

## 🗄 Database Schema

```sql
create table referrals (
  id           uuid        default gen_random_uuid() primary key,
  company_name text        not null,
  contact_name text        not null,
  mobile       text        not null,
  created_at   timestamptz default now()
);
```

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/referral-portal.git
cd referral-portal
npm install
```

### 2. Set up Supabase

1. Create a free project at [supabase.com](https://supabase.com)
2. Run this in the **SQL Editor**:

```sql
create table referrals (
  id uuid default gen_random_uuid() primary key,
  company_name text not null,
  contact_name text not null,
  mobile text not null,
  created_at timestamp with time zone default now()
);

alter table referrals enable row level security;

create policy "Anyone can view" on referrals for select using (true);
create policy "Anyone can register" on referrals for insert with check (true);
```

3. Go to **Settings → API Keys** and copy your **Project URL** and **anon public** key

### 3. Add environment variables

```bash
cp .env.example .env.local
```

Fill in `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## ☁️ Deploy on Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → **Import Project**
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Click **Deploy** ✅

---

## 📄 Pages

| Route | Description |
|---|---|
| `/` | Public directory — browse all registered companies |
| `/register` | Company registration form |

---

## 📌 Use Case

Built for communities, college groups, and professional networks where members want referrals from companies. Companies register once and stay listed permanently. Job seekers browse the directory and call/message directly — no middleman.

---

## 📜 License

MIT — free to use and modify.
Open [http://localhost:3000](http://localhost:3000)
