# Rephrase frontend project instructions

## Objective
Recreate the supplied Rephrase portfolio website and mobile app screens as closely as
possible in React, TypeScript, Vite, and Tailwind CSS.

## Source of truth
1. `reference/*.png` for composition and visual comparison.
2. `design/tailwind-theme.css` for the Tailwind theme.
3. `design/layout-spec.md` for layout and typography.
4. `icons/RephraseIcons.tsx` and `icons/*.svg` for artwork.

Do not replace the supplied icon artwork with emoji, generic Unicode symbols, or a
different icon library.

## Required stack
- React
- TypeScript
- Vite
- Tailwind CSS
- React Router for portfolio/mobile screen routes if routing is needed

## Visual rules
- Keep the page background `#F6D5C3`.
- Use the provided cream, cocoa, blush, sage, and butter values only.
- Use `Cormorant Garamond` for display text and `Libre Baskerville` for body text,
  with the supplied fallbacks.
- Keep borders warm and low contrast.
- Use generous whitespace and restrained shadows.
- Use the supplied botanical SVG and sparkles decoratively.
- Avoid bright white, pure black, blue-grey shadows, neon colour, glass blur, and
  modern geometric sans-serif headings.
- Do not place critical text inside raster images.

## Responsive behaviour
- Build mobile-first.
- Preserve the mobile app composition at 390px width.
- The portfolio hero becomes a two-column grid from `lg`.
- Avoid horizontal overflow at 320px.
- Use fluid type with `clamp()` for large headings.

## Accessibility
- Semantic landmarks and heading order.
- Visible keyboard focus.
- All icon-only controls have accessible names.
- Decorative artwork uses `aria-hidden`.
- Respect reduced motion.
- Maintain readable colour contrast.

## Engineering quality
- Create reusable components rather than one large JSX file.
- Keep content in typed data arrays where repeated.
- Run lint, typecheck, tests if present, and production build before declaring done.
- Compare the finished pages against all reference images at mobile and desktop sizes.
