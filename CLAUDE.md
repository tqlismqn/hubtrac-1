# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TruckHub mobile tire service website - a production-ready Next.js 16 static landing page with multi-language support (Slovak, German, English) for commercial truck tire services in Europe.

## Essential Commands

### Development
```bash
npm run dev          # Start development server on http://localhost:3000
npm run build        # Production build - verify all pages show ○ Static
npm start            # Run production build locally
npm run lint         # Run ESLint
npx tsc --noEmit     # Type check without emitting files
```

### Testing
```bash
npx playwright test                    # Run all E2E tests
npx playwright test --ui              # Run tests in UI mode
npx playwright test homepage.spec.ts  # Run specific test file
npx playwright show-report            # View last test report
```

### Deployment
```bash
git add -A
git commit -m "Description"
git push                # Auto-triggers Vercel deployment
vercel ls              # Check deployment status
```

## Architecture

### Multi-language System

**Critical Pattern:** All user-facing text uses dictionary-based i18n system.

```typescript
// In components
import { getDictionary, t, type Locale } from '@/lib/i18n';

const dict = getDictionary('sk');  // or 'de', 'en'
const text = t(dict, 'hero.title'); // Dot-notation access
```

**Dictionary Structure:**
- `src/dictionaries/sk.json` - Slovak (default)
- `src/dictionaries/de.json` - German
- `src/dictionaries/en.json` - English

**Language State Management:**
- Client-side state via React useState
- LanguageSwitcher component broadcasts changes
- Parent page component holds current locale
- Props drilling to all child components

### Component Architecture

**Hero Subdirectory Pattern:**
The Hero section is split into modular subcomponents:
- `src/components/Hero/EmergencyContactBar.tsx` - 24/7 emergency banner
- `src/components/Hero/MessengerButtons.tsx` - WhatsApp/Viber/Telegram
- `src/components/Hero/TrustBadges.tsx` - Certificates and stats
- `src/components/Hero/index.ts` - Barrel export

Main `Hero.tsx` composes these subcomponents.

**Modal Pattern (Radix UI):**
```typescript
import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'framer-motion';

// Always wrap with AnimatePresence
<Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
  <Dialog.Portal>
    <Dialog.Overlay asChild>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
    </Dialog.Overlay>
    <Dialog.Content asChild>
      <motion.div>{/* content */}</motion.div>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>
```

**Carousel Pattern (Embla):**
```typescript
import useEmblaCarousel from 'embla-carousel-react';

const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

// CRITICAL: Always provide cleanup in useEffect
useEffect(() => {
  if (emblaApi) {
    emblaApi.on('select', onSelect);
  }
  return () => {
    if (emblaApi) {
      emblaApi.off('select', onSelect);
    }
  };
}, [emblaApi]);
```

### Data Layer

**Tire Product Database:**
- Location: `src/data/tires.ts`
- Fully typed with TypeScript interfaces
- Helper functions: `getTiresByCategory()`, `getTireById()`
- 6 tire models across 5 categories

**Type Safety:**
```typescript
export interface TireModel {
  id: string;
  name: string;
  category: 'HIGHWAY' | 'REGIONAL' | 'URBAN' | 'COACH' | 'MIXED';
  productLine: 'TruckHub 2.0' | 'CLASSIC';
  specifications: TireSpecification[];
  // ...
}
```

### SEO Implementation

**Required Files:**
- `src/app/sitemap.ts` - XML sitemap generation
- `src/app/robots.ts` - robots.txt configuration
- `src/components/StructuredData.tsx` - Schema.org markup

**Metadata Pattern:**
All pages must export metadata object:
```typescript
export const metadata: Metadata = {
  metadataBase: new URL('https://domain.vercel.app'),
  title: { default: 'Title', template: '%s | Site Name' },
  description: 'SEO description (150-160 chars)',
  openGraph: { /* Facebook/LinkedIn */ },
  twitter: { /* Twitter cards */ },
  alternates: { /* multilang URLs */ },
};
```

## TypeScript Best Practices

### Common Pitfall: useEffect Cleanup

```typescript
// ❌ WRONG - TypeScript error
useEffect(() => {
  if (!emblaApi) return;
  emblaApi.on('select', onSelect);
  return () => emblaApi.off('select', onSelect);
}, [emblaApi]);

// ✅ CORRECT
useEffect(() => {
  if (emblaApi) {
    emblaApi.on('select', onSelect);
  }
  return () => {
    if (emblaApi) {
      emblaApi.off('select', onSelect);
    }
  };
}, [emblaApi]);
```

### Strict Mode Requirements

- All component props must have TypeScript interfaces
- No `any` types allowed
- Use `type` for unions, `interface` for objects
- Path aliases: `@/` maps to `src/`

## Performance Requirements

**Build Output Verification:**
After `npm run build`, ALL pages must show `○ Static`:
```
Route (app)                     Size     First Load JS
┌ ○ /                          142 B          87.3 kB
├ ○ /about                     142 B          87.3 kB
```

**Never use:**
- `λ` (Dynamic/SSR) - breaks Vercel free tier
- `ƒ` (Dynamic Function) - server-side rendering

**Image Optimization:**
- Format: WebP only (use `sharp-cli` to convert)
- Next.js Image component with proper `sizes` attribute
- Lazy loading for below-fold: `loading="lazy"`
- Eager loading for above-fold: `loading="eager"`

## Design System

**Brand Colors:**
- Primary: `#DC2626` (red-600)
- Text: `#1F2937` (gray-900)
- Background: `#FFFFFF` (white)

**Component Patterns:**
- Rounded corners: `rounded-2xl` for cards/modals
- Shadows: `shadow-lg`, `shadow-2xl`
- Hover transitions: `transition-all duration-300`
- Glassmorphism: `backdrop-blur-sm bg-white/90`

**Fonts:**
- Geist Sans (primary)
- Geist Mono (code)

## Testing Strategy

**E2E Tests with Playwright:**
- Location: `tests/e2e/`
- Coverage: Homepage, product gallery, contact form, language switcher
- Helper utilities: `tests/e2e/helpers.ts`

**Test Execution:**
```bash
npx playwright test homepage.spec.ts    # Single file
npx playwright test --grep "Hero"       # By test name
npx playwright test --ui                # Interactive mode
```

**CI Integration:**
- Tests run on CI with 2 retries
- HTML reports in `playwright-report/`
- Tests run in parallel locally, sequential on CI

## Static Site Constraints

**What you CAN'T do:**
- Database storage
- Server-side form processing (use Formspree/EmailJS/Web3Forms)
- Dynamic content generation at request time
- User authentication (unless via third-party OAuth)

**What you MUST do:**
- All pages static (○ in build output)
- Convert images to WebP before committing
- Use TypeScript strict mode
- Implement i18n through dictionaries
- Test on mobile devices first

## Deployment Workflow

1. Develop locally: `npm run dev`
2. Test build: `npm run build` (verify all static)
3. Run E2E tests: `npx playwright test`
4. Commit: `git add -A && git commit -m "Message"`
5. Deploy: `git push` (auto-triggers Vercel)
6. Verify: `vercel ls` (check deployment status)

**Build expectations:**
- Build time: ~30-35 seconds
- All pages: ○ Static
- No TypeScript errors
- No ESLint warnings

## Project Context

**Parent Project:** WordPress → Vercel Migration
- Business model: Static sites replacing WordPress landing pages
- Budget: 6000 CZK/year per client (2 sites)
- Free Vercel tier: 100 GB bandwidth, unlimited static sites

**Reference Sites:**
- hubtrac-1: Main development site
- hubtrac-2: Clean backup template

**Key Documentation:**
- `PROJECT_SUMMARY.md` - Complete feature list
- `COMPONENT_TREE.md` - Component hierarchy
- `docs/SEO.md` - SEO configuration details
- `tests/README.md` - Testing documentation
