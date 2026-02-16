import { useEffect, useState, useRef } from 'react'

const colors = {
  bg: '#0a0f1a',
  bgLight: '#111827',
  teal: '#00e5cc',
  coral: '#ff4d4d',
  coralDark: '#e63946',
  white: '#f0f4ff',
  gray300: '#8892b0',
  gray500: '#5a6480',
}

const Spinner = () => (
  <svg style={{ width: 16, height: 16, animation: 'spin 1s linear infinite' }} viewBox="0 0 24 24">
    <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
    <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
)

const trackEvent = (eventName, params = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params)
  }
}

export default function EmailPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('learnopenclaw-popup-seen')
    if (hasSeenPopup) return

    const timer = setTimeout(() => {
      setIsVisible(true)
      trackEvent('popup_shown', { popup_type: 'email_signup', source: 'learnopenclaw', variant: 'cheatsheet' })
    }, 10000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (isVisible && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isVisible])

  const handleClose = () => {
    setIsVisible(false)
    localStorage.setItem('learnopenclaw-popup-seen', 'true')
    trackEvent('popup_closed', { popup_type: 'email_signup', source: 'learnopenclaw', variant: 'cheatsheet' })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('https://fullstackpm.com/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source: 'learnopenclaw-popup',
          publication: 'fullstackpm',
          utm_source: 'learnopenclaw',
          utm_medium: 'popup',
          utm_campaign: 'popup-cheatsheet',
          landing_page: window.location.pathname,
          referrer: document.referrer || 'direct',
        }),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setStatus('success')
        localStorage.setItem('learnopenclaw-popup-seen', 'true')
        trackEvent('popup_submitted', { popup_type: 'email_signup', source: 'learnopenclaw', variant: 'cheatsheet' })
        setTimeout(() => {
          setIsVisible(false)
        }, 3000)
      } else {
        setStatus('error')
        setErrorMessage(data.error || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      setStatus('error')
      setErrorMessage('Network error. Please try again.')
    }
  }

  if (!isVisible) return null

  return (
    <>
      <div className="popup-overlay" onClick={handleClose} />

      <div className="popup-container">
        <button className="popup-close" onClick={handleClose} aria-label="Close popup">
          &times;
        </button>

        {status === 'success' ? (
          <div className="popup-content">
            <div className="popup-success">
              <span className="popup-success-icon">&#10003;</span>
              <h3>You're in!</h3>
              <p>Check your inbox for the OpenClaw cheat sheet.</p>
            </div>
          </div>
        ) : (
          <div className="popup-content">
            <div className="popup-header">
              <h2>Want the full guide in your inbox?</h2>
              <p className="popup-subhead">
                I'll remind you to come back + send you a <span className="highlight">bonus OpenClaw cheat sheet</span>. <strong>100% free.</strong>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="popup-form">
              <input
                ref={inputRef}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                required
                disabled={status === 'loading'}
              />
              <button type="submit" disabled={status === 'loading'}>
                {status === 'loading' ? (
                  <><Spinner /> Sending...</>
                ) : (
                  'Send me the guide'
                )}
              </button>
            </form>
            {status === 'error' && (
              <p className="popup-error">{errorMessage}</p>
            )}
            <p className="popup-disclaimer">No spam. Unsubscribe anytime.</p>
          </div>
        )}

        <div className="popup-footer">
          A <a href="https://fullstackpm.com" target="_blank" rel="noopener noreferrer">Full Stack PM</a> resource by <a href="https://x.com/carlvellotti" target="_blank" rel="noopener noreferrer">Carl Vellotti</a>
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <style jsx>{`
        .popup-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.7);
          z-index: 9998;
          animation: fadeIn 0.3s ease;
        }

        .popup-container {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 9999;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
          background: ${colors.bg};
          animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
          border-top: 3px solid ${colors.coral};
        }

        .popup-close {
          position: absolute;
          top: 12px;
          right: 16px;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border: 1px solid #444;
          border-radius: 4px;
          font-size: 20px;
          line-height: 1;
          color: ${colors.gray500};
          cursor: pointer;
          transition: all 0.2s;
          z-index: 10;
        }
        .popup-close:hover {
          background: ${colors.bgLight};
          color: ${colors.white};
          border-color: #666;
        }

        .popup-content {
          padding: 32px 24px;
          max-width: 700px;
          margin: 0 auto;
        }

        .popup-header {
          text-align: center;
          margin-bottom: 24px;
        }

        .popup-header h2 {
          color: ${colors.white};
          font-size: 24px;
          font-weight: 700;
          margin: 0 0 8px 0;
        }

        .popup-subhead {
          color: ${colors.gray300};
          font-size: 16px;
          margin: 0;
        }

        .highlight {
          color: ${colors.teal};
          font-weight: 600;
        }

        .popup-form {
          display: flex;
          gap: 12px;
          max-width: 400px;
          margin: 0 auto;
        }

        .popup-form input {
          flex: 1;
          padding: 12px 16px;
          font-size: 14px;
          font-family: inherit;
          background: ${colors.bg};
          border: 1px solid #444;
          border-radius: 8px;
          outline: none;
          transition: all 0.2s;
          color: ${colors.white};
        }
        .popup-form input::placeholder {
          color: ${colors.gray500};
        }
        .popup-form input:focus {
          border-color: ${colors.teal};
          box-shadow: 0 0 0 2px rgba(29, 211, 176, 0.2);
        }
        .popup-form input:disabled {
          opacity: 0.5;
        }

        .popup-form button {
          padding: 12px 24px;
          font-size: 14px;
          font-weight: 600;
          font-family: inherit;
          color: ${colors.white};
          background: ${colors.coral};
          border: none;
          border-radius: 8px;
          cursor: pointer;
          white-space: nowrap;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.2s;
        }
        .popup-form button:hover {
          background: ${colors.coralDark};
        }
        .popup-form button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .popup-error {
          margin: 12px 0 0;
          font-size: 13px;
          color: ${colors.coral};
          text-align: center;
        }

        .popup-disclaimer {
          margin: 12px 0 0;
          font-size: 12px;
          color: ${colors.gray500};
          text-align: center;
        }

        .popup-footer {
          padding: 12px 24px;
          background: ${colors.bgLight};
          border-top: 1px solid #333;
          font-size: 13px;
          color: ${colors.gray500};
          text-align: center;
        }
        .popup-footer a {
          color: ${colors.coral};
          text-decoration: none;
        }
        .popup-footer a:hover {
          text-decoration: underline;
        }

        .popup-success {
          text-align: center;
          padding: 20px 0;
        }
        .popup-success-icon {
          font-size: 48px;
          color: ${colors.teal};
          display: block;
          margin-bottom: 16px;
        }
        .popup-success h3 {
          font-size: 24px;
          font-weight: 700;
          color: ${colors.white};
          margin: 0 0 8px;
        }
        .popup-success p {
          color: ${colors.gray300};
          margin: 0;
        }

        @media (max-width: 600px) {
          .popup-form {
            flex-direction: column;
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </>
  )
}
