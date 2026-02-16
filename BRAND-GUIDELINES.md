# Learn OpenClaw - Brand Guidelines

> **Status:** Active
> **Theme:** OpenClaw Faithful (Theme 13)
> **Last updated:** 2026-02-16

---

## Brand Positioning

### The Big Idea

**Learn OpenClaw** = The free, comprehensive guide to setting up and mastering OpenClaw. Not surface-level. Not developer-only. The resource that didn't exist when you started.

### Target Audience

Anyone who wants to use OpenClaw but feels overwhelmed:
- **Technical-adjacent professionals** - PMs, marketers, founders who use AI daily
- **Tinkerers** - Installed OpenClaw but got stuck after "Hello World"
- **Power users** - Already running OpenClaw, want to go deeper on security, memory, automation

### Positioning Statement

> **For** anyone who wants to use OpenClaw but feels overwhelmed by the setup process, **Learn OpenClaw** is the free guide that goes from installation to advanced automation, written for humans who aren't necessarily developers. **Because** 70% of existing content is surface-level, and zero comprehensive free resources exist for non-developers.

### The Gap This Fills

- **70%** of existing OpenClaw content is surface-level
- **Only 9%** reaches deep, practical depth
- **Zero** comprehensive free resources for non-developers

---

## Visual Identity

### Color Palette

Matches the official OpenClaw brand (extracted from openclaw.ai dark mode).

| Token | Hex | Usage |
|-------|-----|-------|
| **Coral Bright** | `#ff4d4d` | Primary accent: links, buttons, section markers, CTAs, active states |
| **Coral Mid** | `#e63946` | Hover states, button hover |
| **Coral Dark** | `#991b1b` | Pressed states |
| **Cyan Bright** | `#00e5cc` | Code highlights, inline code, secondary accent |
| **Cyan Mid** | `#14b8a6` | Subtle cyan elements |
| **BG Deep** | `#050810` | Page background (deepest) |
| **BG Surface** | `#0a0f1a` | Card backgrounds, elevated surfaces |
| **BG Elevated** | `#111827` | Callouts, secondary surfaces |
| **Text Primary** | `#f0f4ff` | Headings, strong text (blue-tinted white) |
| **Text Secondary** | `#8892b0` | Body text |
| **Text Muted** | `#5a6480` | Captions, metadata, code comments |
| **Border Subtle** | `rgba(136, 146, 176, 0.15)` | Card borders, dividers |
| **Border Accent** | `rgba(255, 77, 77, 0.3)` | Coral-tinted borders for emphasis |
| **Surface Card** | `rgba(10, 15, 26, 0.65)` | Glass-style card backgrounds |

### CSS Custom Properties

```css
:root {
  --coral-bright: #ff4d4d;
  --coral-mid: #e63946;
  --coral-dark: #991b1b;
  --cyan-bright: #00e5cc;
  --cyan-mid: #14b8a6;
  --bg-deep: #050810;
  --bg-surface: #0a0f1a;
  --bg-elevated: #111827;
  --text-primary: #f0f4ff;
  --text-secondary: #8892b0;
  --text-muted: #5a6480;
  --border-subtle: rgba(136, 146, 176, 0.15);
  --border-accent: rgba(255, 77, 77, 0.3);
  --surface-card: rgba(10, 15, 26, 0.65);
}
```

### Typography

| Role | Font | Weight | Source |
|------|------|--------|--------|
| **Headings** | Clash Display | 600-700 | Fontshare CDN |
| **Body** | Satoshi | 400-600 | Fontshare CDN |
| **Code** | JetBrains Mono | 400-600 | Google Fonts |

**Fontshare CDN:**
```
https://api.fontshare.com/v2/css?f[]=satoshi@400,500,600,700,800,900&f[]=clash-display@400,500,600,700&display=swap
```

**Google Fonts CDN (code only):**
```
https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap
```

### Design Elements

- **Buttons:** Pill-shaped (`border-radius: 999px`), coral background
- **Cards:** Glass effect with subtle borders (`rgba(10, 15, 26, 0.65)` + `border-subtle`)
- **Section markers:** `›` character in coral before section headings
- **List markers:** `›` in coral
- **Inline code:** Cyan text on dark cyan background
- **Code blocks:** Deep navy background (`#0a0f1a`), subtle border
- **Link colors:** Coral primary, hover to coral-mid
- **Copy button:** Coral background, turns cyan on "copied"

---

## Voice & Tone

### Writing Principles

1. **Be practical** - Real setup steps, real config files, real examples
2. **Be honest** - Not hype. "90% of people skip security setup" not "Security is easy!"
3. **Be direct** - No throat-clearing, no preamble, no hedging
4. **Be accessible** - Explain for non-developers without being condescending
5. **Be opinionated** - "We recommend Anthropic" not "You can choose from several providers"

### Tone

- **Authoritative** - "This guide goes deep"
- **Practical** - "Here's what to configure in your first 24 hours"
- **Direct** - "You do NOT want to rush through SOUL.md"
- **Conversational** - "Most people skip this step. They get generic responses and wonder why."

### Words We Use

- Guide, walkthrough, setup
- Configure, customize, tune
- Deep, comprehensive, practical
- "The resource we wished existed"

### Words We Avoid

- Tutorial (too elementary)
- Course (it's a free guide)
- Easy, simple (can feel dismissive of real complexity)
- Revolutionary, game-changing (overused)

---

## Relationship to Other Properties

| Property | URL | Relationship |
|----------|-----|-------------|
| **Learn OpenClaw** | learnopenclaw.com | This guide (free, SEO authority) |
| **The Full Stack PM** | fullstackpm.com | Parent brand, email list host |
| **CC4PMs** | ccforpms.com | Paid Claude Code course for PMs |
| **CC4E** | ccforeveryone.com | Free/paid Claude Code course for everyone |

Learn OpenClaw feeds the Full Stack PM email list via the cheatsheet popup. It's branded independently but links back to Carl Vellotti / FSPM.

---

## Cheatsheet Design

The cheatsheet lead magnet should match this brand:
- Deep navy background
- Coral headings and section markers
- Cyan for code/technical elements
- Satoshi body, Clash Display headings, JetBrains Mono code
- 8.5x11 format (816x1056px at 96dpi)
- Hero element: copy-paste prompt block

---

*This file is the source of truth for all Learn OpenClaw design decisions.*
