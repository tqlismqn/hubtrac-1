# Changelog

All notable changes to the HUBTRAC hubtrac-1 project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [Unreleased]

### Planned
- Phase 3.4: Admin dashboard for content updates
- Additional performance optimizations
- Multi-language content expansion

---

## [1.3.0] - 2025-10-29

### Added - Phase 3: Testing & Real Images

#### E2E Testing Suite (Phase 3.1)
- **Playwright Configuration**
  - Multi-browser testing (Chromium, Firefox, WebKit)
  - Mobile testing (Mobile Chrome, Mobile Safari)
  - CI-ready configuration with retries and screenshots
  - Video recording on failure

- **Test Suites**
  - Homepage tests (9 tests): sections, navigation, images, CTAs
  - Contact form tests (12 tests): validation, submission, accessibility
  - Language switcher tests (7 tests): language switching, persistence
  - Product gallery tests (11 tests): rendering, interactions, modal
  - Test helpers for common operations (cookie consent dismissal)

- **Test Commands**
  - `npm run test:e2e` - Run all tests
  - `npm run test:e2e:headed` - Run with visible browser
  - `npm run test:e2e:ui` - Run with Playwright UI
  - `npm run test:e2e:debug` - Debug mode
  - `npm run test:e2e:chromium|firefox|webkit` - Browser-specific
  - `npm run test:e2e:mobile` - Mobile devices only

- **Documentation**
  - `tests/README.md` - Comprehensive testing guide (132 lines)
  - Best practices for writing tests
  - CI/CD integration examples
  - Troubleshooting guide

#### Cookie Consent Verification (Phase 3.2)
- Verified GDPR compliance of existing `CookieConsent.tsx`
- Confirmed 3 cookie types (Necessary, Analytics, Marketing)
- LocalStorage persistence working correctly
- Granular controls with toggle switches
- Translations for SK, EN, DE

#### Real Product Images (Phase 3.3)
- **Image Integration**
  - Replaced SVG placeholders with real tire photos
  - 5 product categories: HIGHWAY S23, HIGHWAY T22, MIXED S21, URBAN G21, COACH G21
  - Source: `advertising material/new pattern photo/`

- **Image Optimization**
  - Format: PNG → WebP (85% quality)
  - Size reduction: ~90% average
  - Total: 232KB (5 images) vs 2.34MB original
  - Images:
    - highway-s23.webp: 56KB (was 563KB)
    - highway-t22.webp: 53KB (was 573KB)
    - mixed-s21.webp: 46KB (was 469KB)
    - urban-g21.webp: 49KB (was 488KB)
    - coach-g21.webp: 28KB (was 247KB)

- **Component Updates**
  - Added Next.js Image component to ProductGallery
  - Lazy loading enabled
  - Proper `sizes` attribute for responsive images
  - Drop shadow effect for visual depth
  - Card min-height increased: 320px → 380px

### Changed
- Updated ProductGallery.tsx to use real product images
- Enhanced testing with section ID attributes
- Updated .gitignore to exclude test artifacts

### Fixed
- Cookie consent banner interference with tests
- Product gallery test expectations for grid items

### Performance
- 90% image size reduction via WebP conversion
- Lazy loading for below-fold images
- Build time: 31s
- All pages remain static (○ Static)

---

## [1.2.0] - 2025-01-28

### Added - Phase 2: Interactive Components

#### Certificate Modal
- Interactive certificate gallery with modal preview
- PDF viewer with download and "Open in new tab" options
- 4 certificates: ECE R54/R109, DOT, ISO 9001, ISO 14001
- Framer Motion animations
- Radix UI Dialog for accessibility
- Mobile-responsive design

#### Tire Carousel
- Embla Carousel integration
- Autoplay functionality
- Navigation buttons and thumbnail grid
- Lightbox mode for fullscreen viewing
- Keyboard navigation support
- Hover effects and animations

#### Tire Database
- Complete tire product data structure
- 6 tire models with specifications
- Categories: HIGHWAY, REGIONAL, URBAN, COACH, MIXED
- Helper functions for data access
- TypeScript interfaces for type safety

### Changed
- About page background: gray-900 → gray-50
- Replaced static certificate badges with interactive grid

### Dependencies
- Added `@radix-ui/react-dialog`
- Added `@radix-ui/react-icons`
- Added `embla-carousel-react`

---

## [1.1.0] - 2025-01-27

### Added - Phase 1: UX Enhancements

#### Form Validation
- Real-time validation for all form fields
- Visual feedback (red for errors, green for success)
- Character counter for message field (0/500)
- Min/max length validation
- Email format validation
- Phone number validation

#### Microinteractions
- Button hover effects with scale
- Card hover animations
- Loading state transitions
- Smooth scroll behaviors
- Interactive hover indicators

#### Skeleton Loaders
- Contact form skeleton during submission
- Toast notification system
- Loading states for async operations

#### Toast Notifications
- Success/error toast system
- Auto-dismiss after 5 seconds
- Animations with Framer Motion
- Mobile-responsive positioning

### Fixed
- Toast provider wrapping issue
- Form validation edge cases
- TypeScript compilation errors

---

## [1.0.0] - 2025-01-20

### Added - Initial Release

#### Core Features
- Next.js 16.0.0 with Turbopack
- TypeScript strict mode
- Tailwind CSS v4
- Framer Motion animations

#### Pages
- Homepage with Hero section
- Services section
- Product gallery
- Benefits grid
- Contact form
- About page
- Privacy Policy page
- Terms of Service page

#### Components
- Hero with CTA buttons
- TrustIndicators (stats display)
- ServiceCards grid
- ProductGallery with 5 categories
- BenefitsGrid with 6 benefits
- ContactForm with email integration
- LanguageSwitcher (SK, EN, DE)
- CookieConsent (GDPR compliant)
- Footer with social links

#### Internationalization
- 3 languages: Slovak (sk), German (de), English (en)
- Dictionary-based i18n system
- Type-safe translations
- Default locale: Slovak

#### SEO
- Metadata configuration
- Open Graph tags
- Twitter Card support
- Sitemap generation
- Robots.txt
- Structured data (Schema.org)

#### Performance
- Static site generation
- Image optimization with Next.js Image
- WebP image format
- Lazy loading for below-fold content
- Build time: ~30s

#### Deployment
- Vercel hosting (free tier)
- Automatic deployment on git push
- Production URL: https://hubtrac-1-fcjgc8ekr-thomas-g-projects.vercel.app
- GitHub repository: https://github.com/tqlismqn/hubtrac-1

---

## Version History Summary

- **v1.3.0** (2025-10-29) - Phase 3: E2E Testing & Real Images
- **v1.2.0** (2025-01-28) - Phase 2: Interactive Components
- **v1.1.0** (2025-01-27) - Phase 1: UX Enhancements
- **v1.0.0** (2025-01-20) - Initial Release

---

## Credits

**Project:** HUBTRAC Mobile Tire Service Website
**Client:** HUBTRAC Tire Company
**Technology:** Next.js, TypeScript, Tailwind CSS, Framer Motion
**Deployment:** Vercel
**Version Control:** Git + GitHub
**AI Assistant:** Claude Code by Anthropic

---

*For detailed project status and session summaries, see `/Users/thomas.gradinar/Projects/Translog/PROJECT_STATUS.md`*
