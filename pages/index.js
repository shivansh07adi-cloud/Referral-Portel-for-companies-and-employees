import { useState, useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { supabase } from '../lib/supabase'

const COLORS = ['#C84B2F', '#2F6DC8', '#2FA876', '#8B2FC8', '#C8922F']

export default function Home() {
  const [companies, setCompanies] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchCompanies() }, [])

  async function fetchCompanies() {
    setLoading(true)
    const { data, error } = await supabase
      .from('referrals')
      .select('*')
      .order('created_at', { ascending: false })
    if (!error && data) setCompanies(data)
    setLoading(false)
  }

  const filtered = companies.filter(c =>
    c.company_name.toLowerCase().includes(search.toLowerCase()) ||
    c.contact_name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <>
      <Head>
        <title>Referral Directory</title>
        <meta name="description" content="Find companies offering referrals for your community" />
      </Head>

      <style>{`
        .card:hover { border-color: #C84B2F !important; transform: translateY(-1px); }
        .reg-btn:hover { opacity: 0.85; }
        @media (max-width: 600px) {
          .header-inner { flex-direction: column !important; align-items: flex-start !important; }
          .grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

        {/* Header */}
        <header style={{ background: '#1A1612', color: '#fff', padding: '3rem 1.5rem 3.5rem' }}>
          <div className="header-inner" style={{ maxWidth: 860, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '2rem', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C84B2F', marginBottom: '1rem', fontWeight: 600 }}>
                Community Referral Board
              </div>
              <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1rem' }}>
                Find your<br /><span style={{ color: '#C84B2F' }}>referral.</span>
              </h1>
              <p style={{ color: '#A8A29E', fontSize: 15, lineHeight: 1.6, maxWidth: 400 }}>
                Companies below have opened their doors. Reach out, connect, and get referred.
              </p>
            </div>
            <Link href="/register" className="reg-btn" style={{ display: 'inline-block', background: '#C84B2F', color: '#fff', padding: '12px 24px', borderRadius: 4, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 14, whiteSpace: 'nowrap', transition: 'opacity 0.15s' }}>
              Register your company →
            </Link>
          </div>
        </header>

        {/* Search bar */}
        <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '1rem 1.5rem' }}>
          <div style={{ maxWidth: 860, margin: '0 auto', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <svg style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', width: 16, height: 16, color: 'var(--ink-muted)' }} viewBox="0 0 20 20" fill="none">
                <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
                <path d="M13.5 13.5L17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <input
                style={{ width: '100%', padding: '10px 12px 10px 38px', border: '1px solid var(--border)', borderRadius: 4, fontSize: 14, background: 'var(--bg)', color: 'var(--ink)', outline: 'none', fontFamily: 'var(--font-body)' }}
                placeholder="Search by company or contact name…"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div style={{ fontSize: 13, color: 'var(--ink-muted)', whiteSpace: 'nowrap', fontWeight: 500 }}>
              {loading ? '—' : `${filtered.length} ${filtered.length === 1 ? 'company' : 'companies'}`}
            </div>
          </div>
        </div>

        {/* Cards */}
        <main style={{ flex: 1, maxWidth: 860, margin: '0 auto', width: '100%', padding: '2rem 1.5rem' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--ink-muted)', fontSize: 15 }}>Loading…</div>
          ) : filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--ink-muted)', fontSize: 15 }}>
              {search ? 'No companies match your search.' : 'No companies registered yet — be the first!'}
            </div>
          ) : (
            <div className="grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
              {filtered.map((c, i) => <CompanyCard key={c.id} company={c} color={COLORS[i % COLORS.length]} />)}
            </div>
          )}
        </main>

        <footer style={{ textAlign: 'center', padding: '2rem', fontSize: 13, color: 'var(--ink-muted)', borderTop: '1px solid var(--border)' }}>
          Built for the community ·{' '}
          <Link href="/register" style={{ color: '#C84B2F' }}>Register your company</Link>
        </footer>
      </div>
    </>
  )
}

function CompanyCard({ company, color }) {
  const initials = company.company_name
    .split(' ')
    .filter(Boolean)
    .map(w => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  const dateStr = new Date(company.created_at).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric'
  })

  return (
    <div className="card" style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '1.25rem', display: 'flex', gap: '1rem', transition: 'border-color 0.15s, transform 0.15s', cursor: 'default' }}>
      <div style={{ width: 44, height: 44, borderRadius: 4, background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 15, flexShrink: 0 }}>
        {initials}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, marginBottom: 8, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {company.company_name}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: 'var(--ink-muted)', marginBottom: 6 }}>
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
            <circle cx="10" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
            <path d="M3 18c0-3.866 3.134-7 7-7s7 3.134 7 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{company.contact_name}</span>
        </div>
        <a href={`tel:${company.mobile}`} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#C84B2F', fontWeight: 500, marginBottom: 8, textDecoration: 'none' }}>
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none" style={{ flexShrink: 0 }}>
            <path d="M3 5a2 2 0 012-2h1.5l2 4.5-1.5 1a10 10 0 004.5 4.5l1-1.5L17 13.5V15a2 2 0 01-2 2A12 12 0 013 5z" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          {company.mobile}
        </a>
        <div style={{ fontSize: 11, color: 'var(--ink-muted)' }}>{dateStr}</div>
      </div>
    </div>
  )
}
