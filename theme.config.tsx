import React from 'react'
import { useConfig } from 'nextra-theme-docs'
import { useRouter } from 'next/router'

export default {
  logo: <span style={{ fontWeight: 700, fontSize: '16px' }}>Learn OpenClaw</span>,
  project: {
    link: 'https://github.com/openclaw/openclaw'
  },
  docsRepositoryBase: 'https://github.com/carlvellotti/learn-openclaw/blob/main',
  feedback: {
    content: 'Give feedback →',
    useLink: () => 'mailto:carl@fullstackpm.com?subject=Learn%20OpenClaw%20Feedback'
  },
  editLink: {
    component: null
  },
  footer: {
    content: (
      <span>
        © {new Date().getFullYear()} Carl Vellotti. Licensed under{' '}
        <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/" target="_blank" rel="noopener noreferrer">
          CC BY-NC-ND 4.0
        </a>
        . Not affiliated with OpenClaw.
      </span>
    )
  },
  darkMode: true,
  head: function Head() {
    const { frontMatter, title } = useConfig()
    const { asPath } = useRouter()
    const siteUrl = 'https://learnopenclaw.com'
    const isHome = asPath === '/'
    const pageTitle = isHome
      ? 'Learn OpenClaw | Free Guide to Setting Up Your AI Assistant'
      : (title ? `${title} – Learn OpenClaw` : 'Learn OpenClaw')
    const description = frontMatter?.description || 'The free, comprehensive guide to setting up and mastering OpenClaw — your always-on personal AI assistant. From installation to advanced automation.'
    const ogImage = frontMatter?.ogImage || `${siteUrl}/images/og-image.png`
    const url = `${siteUrl}${asPath}`

    return (
      <>
        <title>{pageTitle}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={description} />

        {/* Fonts — Satoshi + Clash Display from Fontshare, JetBrains Mono from Google */}
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,600,700,800,900&f[]=clash-display@400,500,600,700&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap" rel="stylesheet" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="512x512" href="/favicon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />

        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-VV0B0TZ6T6"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-VV0B0TZ6T6');
            `
          }}
        />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={url} />
        <meta property="og:site_name" content="Learn OpenClaw" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />

        {/* Keywords */}
        {frontMatter?.keywords && (
          <meta name="keywords" content={frontMatter.keywords} />
        )}

        {/* Structured Data */}
        {frontMatter?.schema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(frontMatter.schema)
            }}
          />
        )}
      </>
    )
  },
  color: { hue: 0 },
  sidebar: {
    defaultMenuCollapseLevel: 1,
    toggleButton: true
  },
  toc: {
    backToTop: true
  }
}
