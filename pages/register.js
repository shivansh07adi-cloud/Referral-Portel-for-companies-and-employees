import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { supabase } from '../lib/supabase'

export default function Register() {
  const [form, setForm] = useState({ company_name: '', contact_name: '', mobile: '' })
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')

  const set = e => {
    setStatus('idle')
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.company_name.trim() || !form.contact_name.trim() || !form.mobile.trim()) {
      setErrorMsg('Please fill in all fields.')
      setStatus('error')
      return
    }
    setStatus('loading')
    const { error } = await supabase.from('referrals').insert([{
      company_name: form.company_name.trim(),
      contact_name: form.contact_name.trim(),
      mobile: form.mobile.trim(),
    }])
    if (error) {
      setErrorMsg('Something went wrong. Please try again.')
      setStatus('error')
    } else {
      setStatus('success')
    }
  }

  return (
    <>
      <Head>
        <title>Register — Referral Directory</title>
      </Head>

      <style>{`
        .submit-btn:hover:not(:disabled) { opacity: 0.85; }
        .submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .input-field:focus { border-color: #C84B2F !important; outline: none; }
        @media (max-width: 640px) {
          .reg-wrap { grid-template-columns: 1fr !important; gap: 2rem !important; padding: 2rem 1.25rem !important; }
          .left-panel { display: none; }
        }
      `}</style>

      <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>

        {/* Top bar */}
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border)', background: 'var(--surface)' }}>
          <Link href="/" style={{ fontSize: 13, color: 'var(--ink-muted)', fontWeight: 500, textDecoration: 'none' }}>
            ← Back to directory
          </Link>
        </div>

        {/* Two-column layout */}
        <div className="reg-wrap" style={{ maxWidth: 900, margin: '0 auto', padding: '4rem 1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start' }}>

          {/* Left: info */}
          <div className="left-panel">
            <div style={{ fontFamily: 'var(--font-display)', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#C84B2F', marginBottom: '1rem', fontWeight: 600 }}>
              For Companies
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.25rem' }}>
              Open your<br /><span style={{ color: '#C84B2F' }}>doors.</span>
            </h1>
            <p style={{ fontSize: 15, color: 'var(--ink-muted)', lineHeight: 1.7, marginBottom: '2rem' }}>
              Register your company and let students and job seekers in our community reach out to you for referrals. It takes 30 seconds.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['Free and instant', 'Community of students & professionals', 'Your number goes live immediately'].map(t => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: 'var(--ink-muted)' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#C84B2F', flexShrink: 0, display: 'inline-block' }} />
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* Right: form or success */}
          <div>
            {status === 'success' ? (
              <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '2.5rem 2rem', textAlign: 'center' }}>
                <div style={{ width: 48, height: 48, background: '#DCFCE7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, color: '#16A34A', margin: '0 auto 1rem', lineHeight: 1 }}>
                  ✓
                </div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 800, marginBottom: 8 }}>
                  You're listed!
                </div>
                <p style={{ fontSize: 14, color: 'var(--ink-muted)', marginBottom: '1.5rem' }}>
                  Your company is now visible to the whole community.
                </p>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
                  <Link href="/" style={{ padding: '10px 20px', background: '#1A1612', color: '#fff', borderRadius: 4, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, textDecoration: 'none' }}>
                    View directory →
                  </Link>
                  <button
                    style={{ padding: '10px 20px', background: 'transparent', border: '1px solid var(--border)', color: 'var(--ink)', borderRadius: 4, fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 13, cursor: 'pointer' }}
                    onClick={() => { setStatus('idle'); setForm({ company_name: '', contact_name: '', mobile: '' }) }}
                  >
                    Register another
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 10, padding: '2rem' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, marginBottom: '1.5rem' }}>
                  Company registration
                </h2>

                {[
                  { label: 'Company name', name: 'company_name', type: 'text', placeholder: 'e.g. Infosys, Zomato, HDFC Bank' },
                  { label: 'Contact person name', name: 'contact_name', type: 'text', placeholder: 'Your full name' },
                  { label: 'Mobile number', name: 'mobile', type: 'tel', placeholder: '+91 98765 43210' },
                ].map(field => (
                  <div key={field.name} style={{ marginBottom: '1.25rem' }}>
                    <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--ink-muted)', marginBottom: 6 }}>
                      {field.label}
                    </label>
                    <input
                      className="input-field"
                      name={field.name}
                      type={field.type}
                      value={form[field.name]}
                      onChange={set}
                      placeholder={field.placeholder}
                      disabled={status === 'loading'}
                      style={{ width: '100%', padding: '10px 12px', border: '1px solid var(--border)', borderRadius: 4, fontSize: 14, background: 'var(--bg)', color: 'var(--ink)', fontFamily: 'var(--font-body)', transition: 'border-color 0.15s' }}
                    />
                  </div>
                ))}

                {status === 'error' && (
                  <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', color: '#B91C1C', borderRadius: 4, padding: '10px 12px', fontSize: 13, marginBottom: '1rem' }}>
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  className="submit-btn"
                  disabled={status === 'loading'}
                  style={{ width: '100%', padding: '12px', background: '#1A1612', color: '#fff', border: 'none', borderRadius: 4, fontFamily: 'var(--font-display)', fontSize: 14, fontWeight: 700, marginBottom: '1rem', transition: 'opacity 0.15s' }}
                >
                  {status === 'loading' ? 'Registering…' : 'Register my company →'}
                </button>

                <p style={{ fontSize: 12, color: 'var(--ink-muted)', lineHeight: 1.6 }}>
                  Your mobile number will be visible to community members so they can contact you directly.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
