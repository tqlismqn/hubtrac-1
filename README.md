# HUBTRAC Mobile Tire Service

Professional mobile tire service landing page for commercial trucks in Europe. Built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Project Overview

Modern, responsive, multi-language landing page for HUBTRAC mobile tire service featuring:
- Multi-language support (Slovak, German, English)
- Mobile-first responsive design
- Smooth animations and interactions
- SEO optimized
- Performance optimized (target PageSpeed 95+)

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion
- **Icons:** lucide-react
- **Deployment:** Vercel

## Project Structure

```
hubtrac-1/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Root layout with SEO metadata
│   │   ├── page.tsx             # Main landing page
│   │   ├── globals.css          # Global styles
│   │   ├── about/
│   │   │   └── page.tsx         # About page
│   │   ├── sitemap.ts           # Auto-generated sitemap
│   │   └── robots.ts            # robots.txt configuration
│   ├── components/
│   │   ├── Hero.tsx             # Hero section with CTA
│   │   ├── Navigation.tsx       # Sticky navigation with language switcher
│   │   ├── TrustIndicators.tsx  # Animated statistics
│   │   ├── Services.tsx         # Services grid
│   │   ├── ProductGallery.tsx   # Product showcase
│   │   ├── BenefitsGrid.tsx     # Benefits grid
│   │   ├── ContactForm.tsx      # Multi-language contact form
│   │   ├── Footer.tsx           # Footer
│   │   └── LanguageSwitcher.tsx # Language selector
│   ├── lib/
│   │   ├── i18n.ts              # Multi-language utilities
│   │   └── analytics.tsx        # Google Analytics 4 integration
│   ├── dictionaries/
│   │   ├── sk.json              # Slovak translations
│   │   ├── de.json              # German translations
│   │   └── en.json              # English translations
│   └── styles/
│       └── design-system.ts     # Design tokens
└── public/
    └── images/                  # Optimized images
```

## Design System

### Color Palette
- **Primary Red:** #DC2626
- **Secondary Red:** #f02d3a
- **Dark Gray:** #1F2937
- **Light Gray:** #F3F4F6
- **White:** #FFFFFF

## Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:3000
```

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel
```

## Configuration

### Update Contact Information

Edit placeholder contact details in `/src/dictionaries/*.json` files.

### Google Analytics

Add GA4 Measurement ID to environment variables:
```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### Add Images

1. Place optimized images in `/public/images/`
2. Convert to WebP format
3. Update image references in components

### Form Submission

The contact form is ready for integration with Formspree, EmailJS, or Web3Forms.

## Performance Targets

- **PageSpeed Score:** 95+
- **First Contentful Paint:** < 1s
- **Time to Interactive:** < 2s

## License

Proprietary - HUBTRAC Europe

---

**Built by:** Claude Code (Anthropic)
**Version:** 1.0.0
