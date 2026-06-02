# 🏢 Community Referral Portal

A public directory where companies register to offer referrals, and community members (students, job seekers) can browse and contact them.

---

## Pages

| Route | Purpose |
|---|---|
| `/` | Public directory — everyone can browse |
| `/register` | Companies register themselves |

---

## Deploy in 3 steps

### Step 1 — Set up Supabase (your database)

1. Go to [supabase.com](https://supabase.com) → **New project** (free)
2. Once created, go to **SQL Editor** and run this:

```sql
create table referrals (
  id uuid default gen_random_uuid() primary key,
  company_name text not null,
  contact_name text not null,
  mobile text not null,
  created_at timestamp with time zone default now()
);

-- Allow anyone to read and insert (public portal)
alter table referrals enable row level security;

create policy "Anyone can view referrals"
  on referrals for select using (true);

create policy "Anyone can register"
  on referrals for insert with check (true);
```

3. Go to **Project Settings → API** and copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public key** → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

---

### Step 2 — Push to GitHub

```bash
cd referral-portal
git init
git add .
git commit -m "Initial commit"
# Create a repo on github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/referral-portal.git
git push -u origin main
```

---

### Step 3 — Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import your GitHub repo
3. In **Environment Variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key
4. Click **Deploy** ✅

Your portal is live! Share the Vercel URL with:
- **Companies** → send them `/register`
- **Community members** → send them `/` (the homepage)

---

## Local development

```bash
npm install
cp .env.example .env.local
# Fill in your Supabase keys in .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)
