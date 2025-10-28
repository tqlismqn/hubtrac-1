# Component Tree - HUBTRAC Mobile Tire Service

## Main Page (`/src/app/page.tsx`)

```
Home Page (Client Component)
│
├── Navigation (Sticky)
│   ├── Logo/Brand
│   ├── Desktop Menu (5 items)
│   ├── Language Switcher (SK/DE/EN)
│   └── Mobile Menu
│       ├── Hamburger Button
│       └── Slide-in Drawer
│           ├── Navigation Items
│           └── Language Selector
│
├── Hero Section
│   ├── Background (Gradient + Animated Orbs)
│   ├── Brand Logo/Icon
│   ├── Main Headline (Multi-language)
│   ├── Subtitle
│   ├── CTA Buttons (2)
│   └── Scroll Indicator
│
├── Trust Indicators
│   ├── Stat Card 1 (49+ Years)
│   │   ├── Icon (Award)
│   │   ├── Animated Counter
│   │   └── Label
│   ├── Stat Card 2 (800+ Partners)
│   │   ├── Icon (Users)
│   │   ├── Animated Counter
│   │   └── Label
│   ├── Stat Card 3 (9 Factories)
│   │   ├── Icon (Factory)
│   │   ├── Animated Counter
│   │   └── Label
│   └── Certificate Badges
│       ├── ECE Badge
│       ├── DOT Badge
│       └── ISO Badge
│
├── Services Section
│   ├── Section Header
│   └── Services Grid (4 cards)
│       ├── Mobile Service Card
│       │   ├── Icon (Truck)
│       │   ├── Title
│       │   └── Description
│       ├── Emergency Service Card
│       │   ├── Icon (Clock)
│       │   ├── Title
│       │   └── Description
│       ├── Consultation Card
│       │   ├── Icon (MessageCircle)
│       │   ├── Title
│       │   └── Description
│       └── Warranty Card
│           ├── Icon (Shield)
│           ├── Title
│           └── Description
│
├── Product Gallery
│   ├── Section Header
│   └── Products Grid (5 cards)
│       ├── HIGHWAY S23 Card
│       │   ├── Animated Tire Icon
│       │   ├── Product Name
│       │   ├── Description
│       │   └── Hover Effects
│       ├── HIGHWAY T22 Card
│       ├── MIXED S21 Card
│       ├── URBAN G21 Card
│       └── COACH G21 Card
│
├── Benefits Grid
│   ├── Section Header
│   └── Benefits Grid (6 cards)
│       ├── Warranty Card
│       │   ├── Icon (Shield)
│       │   ├── Title
│       │   └── Description
│       ├── Certificates Card
│       ├── Technology Card
│       ├── Support Card
│       ├── Response Card
│       └── Team Card
│
├── Contact Section
│   ├── Section Header
│   ├── Contact Info Column
│   │   ├── Phone Card
│   │   │   ├── Icon (Phone)
│   │   │   └── Phone Number
│   │   ├── Email Card
│   │   │   ├── Icon (Mail)
│   │   │   └── Email Address
│   │   ├── Address Card
│   │   │   ├── Icon (MapPin)
│   │   │   └── Address
│   │   └── Support Info Card
│   └── Contact Form Column
│       ├── Name Input
│       ├── Phone Input
│       ├── Email Input
│       ├── Service Type Dropdown
│       ├── Message Textarea
│       ├── Submit Button
│       └── Status Messages
│           ├── Success Message
│           └── Error Message
│
└── Footer
    ├── Company Info Column
    │   ├── Brand Logo
    │   ├── Description
    │   └── Brand Icon
    ├── Quick Links Column
    │   └── Navigation Links (5)
    ├── Services Column
    │   └── Service List (4)
    ├── Contact Column
    │   ├── Phone Link
    │   ├── Email Link
    │   └── Address
    ├── Social & Certificates Row
    │   ├── Social Links
    │   │   ├── Facebook
    │   │   ├── LinkedIn
    │   │   └── Instagram
    │   └── Certificate Badges
    │       ├── ECE
    │       ├── DOT
    │       └── ISO
    └── Copyright Section
        ├── Copyright Text
        ├── Privacy Link
        └── Terms Link
```

## About Page (`/src/app/about/page.tsx`)

```
About Page (Client Component)
│
├── Navigation (Shared)
│
├── Hero Section
│   ├── Background
│   ├── Page Title
│   └── Subtitle
│
├── History Section
│   ├── Content Column
│   │   ├── Title
│   │   ├── Description
│   │   └── Stats Grid (3 items)
│   └── Video Column
│       └── Video Placeholder
│
├── Mission Section
│   ├── Icon (Target)
│   ├── Title
│   └── Description
│
├── Values Section
│   ├── Section Header
│   └── Values Grid (4 cards)
│       ├── Quality Card
│       ├── Reliability Card
│       ├── Innovation Card
│       └── Service Card
│
├── Certificates Section
│   ├── Section Header
│   └── Certificate Grid
│       ├── ECE Badge
│       ├── DOT Badge
│       ├── ISO 9001 Badge
│       └── ISO 14001 Badge
│
├── CTA Section
│   ├── Title
│   ├── Description
│   └── Contact Button
│
└── Footer (Shared)
```

## Shared Components

### Navigation
- **Used in:** All pages
- **State:** Locale (SK/DE/EN), Scroll position, Mobile menu open
- **Animations:** Fade in on mount, background change on scroll, mobile menu slide

### Footer
- **Used in:** All pages
- **State:** Current year (dynamic)
- **Animations:** Stagger entrance for sections

### Language Switcher
- **Used in:** Navigation
- **State:** Current locale, Dropdown open
- **Animations:** Dropdown fade + scale

## Animation Flow

### Page Load Sequence
1. Navigation fades in (0s)
2. Hero content animates (0.2s delay)
3. Trust Indicators count up (on scroll)
4. Services cards stagger in (0.1s between each)
5. Products cards stagger in (0.1s between each)
6. Benefits cards stagger in (0.1s between each)
7. Contact form slides in (on scroll)
8. Footer sections stagger in (on scroll)

### Hover Interactions
- Navigation items: Color change
- Service cards: Gradient overlay + lift
- Product cards: Tire rotation + shine effect
- Benefit cards: Border color + scale
- Contact cards: Slide right
- Buttons: Scale + shadow enhancement
- Social icons: Background color change

## State Management

### Page-level State
- `locale: Locale` - Current language (SK/DE/EN)
- Managed in page component, passed down to children

### Component-level State
- Navigation: `isScrolled`, `isMobileMenuOpen`
- Language Switcher: `isOpen`
- Contact Form: `formData`, `status`

### No Global State
- Pure props drilling
- No Context API needed
- No Redux/Zustand
- Keeps components simple and testable

## Data Flow

```
User changes language
    ↓
Page component updates locale state
    ↓
getDictionary(locale) called
    ↓
New dictionary passed to all components
    ↓
Components re-render with new translations
```

## Responsive Breakpoints

- **Mobile:** < 640px (1 column layouts)
- **Tablet:** 640px - 1024px (2 column layouts)
- **Desktop:** 1024px+ (3-4 column layouts)
- **Large Desktop:** 1280px+ (max-width containers)

## Color Scheme Flow

### Light Theme (Only)
- Background: White (#FFFFFF)
- Text: Dark Gray (#1F2937)
- Primary Actions: Red (#DC2626)
- Secondary Actions: Red Light (#f02d3a)
- Neutral Areas: Light Gray (#F3F4F6)

### No Dark Mode
- Brand consistency requires light theme only
- Dark sections use dark backgrounds intentionally
- Removed @media (prefers-color-scheme: dark)

---

**Component Count:** 9 custom components
**Total Sections:** 8 main sections on home page
**Animation Count:** 50+ individual animations
**Interactive Elements:** 30+ buttons/links/inputs
