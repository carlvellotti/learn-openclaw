import nextra from 'nextra'

const withNextra = nextra({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  defaultShowCopyCode: true
})

/** @type {import('next').NextConfig} */
const config = {
  output: 'export',
  images: { unoptimized: true }
}

export default withNextra(config)
