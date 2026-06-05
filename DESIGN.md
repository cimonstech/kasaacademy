---
name: Heritage Avant-Garde
colors:
  surface: '#fcf9f8'
  surface-dim: '#dcd9d9'
  surface-bright: '#fcf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3f2'
  surface-container: '#f0eded'
  surface-container-high: '#eae7e7'
  surface-container-highest: '#e5e2e1'
  on-surface: '#1c1b1b'
  on-surface-variant: '#544245'
  inverse-surface: '#313030'
  inverse-on-surface: '#f3f0ef'
  outline: '#877275'
  outline-variant: '#dac0c4'
  surface-tint: '#9c3e57'
  primary: '#4d001d'
  on-primary: '#ffffff'
  primary-container: '#6b1832'
  on-primary-container: '#ef8099'
  inverse-primary: '#ffb1c0'
  secondary: '#7d5800'
  on-secondary: '#ffffff'
  secondary-container: '#fcbf48'
  on-secondary-container: '#704e00'
  tertiary: '#232322'
  on-tertiary: '#ffffff'
  tertiary-container: '#383937'
  on-tertiary-container: '#a3a2a0'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffd9df'
  primary-fixed-dim: '#ffb1c0'
  on-primary-fixed: '#3f0017'
  on-primary-fixed-variant: '#7e2740'
  secondary-fixed: '#ffdea9'
  secondary-fixed-dim: '#f9bc45'
  on-secondary-fixed: '#271900'
  on-secondary-fixed-variant: '#5e4100'
  tertiary-fixed: '#e4e2df'
  tertiary-fixed-dim: '#c8c6c4'
  on-tertiary-fixed: '#1b1c1a'
  on-tertiary-fixed-variant: '#474745'
  background: '#fcf9f8'
  on-background: '#1c1b1b'
  surface-variant: '#e5e2e1'
typography:
  display-lg:
    fontFamily: EB Garamond
    fontSize: 64px
    fontWeight: '500'
    lineHeight: 72px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: EB Garamond
    fontSize: 40px
    fontWeight: '500'
    lineHeight: 48px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: EB Garamond
    fontSize: 48px
    fontWeight: '500'
    lineHeight: 56px
  headline-md:
    fontFamily: EB Garamond
    fontSize: 32px
    fontWeight: '500'
    lineHeight: 40px
  body-lg:
    fontFamily: DM Sans
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: DM Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-lg:
    fontFamily: DM Sans
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-md:
    fontFamily: DM Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
  stack-xl: 64px
---

## Brand & Style
The design system embodies a "Heritage Avant-Garde" aesthetic, blending the authoritative weight of traditional excellence with the energetic pulse of modern African creative entrepreneurship. It targets high-potential creatives who seek a bridge between artistic mastery and commercial viability.

The visual style is **Modern Corporate** with **Glassmorphism** accents. It avoids the rigidity of traditional finance while maintaining a high-end, premium feel through generous whitespace, sophisticated editorial typography, and tactile depth. The goal is to evoke a sense of prestigious belonging and ambitious forward-motion.

## Colors
The palette is rooted in a "Luxury Earth" philosophy. 

- **Deep Burgundy (#6B1832):** Used for primary actions, branding elements, and deep-tinted overlays to signal authority and depth.
- **Warm Gold (#C9921A):** Reserved for high-value accents, active states, and premium highlights. It should be used sparingly to maintain its "prestige" value.
- **Warm Off-White (#FAF8F5):** The primary canvas color. It provides a softer, more sophisticated alternative to pure white, reducing eye strain and feeling more "editorial."
- **Near-Black (#1A1A1A):** Used for core typography and high-contrast footers to ground the lighter elements of the UI.

## Typography
The typography system relies on a sharp contrast between the classical elegance of **EB Garamond** and the functional clarity of **DM Sans**. 

Headlines should utilize "Display" settings with tighter letter spacing to emphasize the high-contrast serifs. Body text is prioritized for legibility with generous line heights. Labels use increased tracking (letter spacing) and a heavier weight to create a clear "metadata" layer that distinguishes itself from narrative content.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy on desktop to ensure an editorial, magazine-like composition. 

- **Desktop:** 12-column grid with a 1280px max-width. Use wide margins (64px) to create "breathing room" that signals luxury.
- **Tablet:** 8-column grid with 32px margins. 
- **Mobile:** 4-column grid with 20px margins.

Spacing follows a strict 8px base unit. Vertical rhythm should be generous; use `stack-xl` between major sections to maintain a clean, uncluttered user journey. Curriculum grids should use `gutter` consistency to maintain a "modular" look.

## Elevation & Depth
This design system uses **Tonal Layers** and **Glassmorphism** to create hierarchy without relying on heavy shadows.

- **Level 0 (Base):** Warm Off-White surface.
- **Level 1 (Floating):** Navigation bars use a backdrop-blur (12px) with a 60% white opacity and a 1px "silk" border (white at 20% opacity).
- **Level 2 (Interactive):** Cards and buttons use a very soft, diffused ambient shadow (Burgundy tinted, 4% opacity) that slightly intensifies on hover.
- **Accents:** 1px Gold (#C9921A) strokes are used to define high-importance boundaries or "hero" card edges.

## Shapes
The shape language is "Tailored." A consistent 0.5rem (8px) radius is applied to cards and containers to feel approachable but structured. 

**Pill shapes** are used exclusively for navigation elements and status chips (e.g., "Day 1", "Faculty") to provide a distinct visual "youthful" counterpoint to the sharp, authoritative serif headings.

## Components
### Buttons
- **Primary:** Solid Deep Burgundy with White text. Transitions to a slightly darker shade on hover with a 2px lift.
- **Secondary:** Solid Warm Gold with Near-Black text for high-action items like "Apply Now."
- **Ghost:** 1px Burgundy border with transparent background.

### Navigation
A floating pill-shaped bar anchored to the top of the viewport. Apply `backdrop-filter: blur(12px)` and a subtle gold bottom-border (2px) only on the active link state.

### Cards (Curriculum & Faculty)
- **Faculty Cards:** Use greyscale photography that transitions to full color on hover. Gold accent border on the bottom edge.
- **Curriculum Cards:** Minimalist white backgrounds, with the "Day Number" in large, low-opacity EB Garamond as a background element.

### Input Fields
Underlined style rather than boxed to maintain an editorial feel. Use 1px Near-Black lines that turn Gold on focus.

### Chips
Small, pill-shaped tags using the `label-md` type spec. Backgrounds should be very light tints of the primary or secondary colors (5-10% opacity).