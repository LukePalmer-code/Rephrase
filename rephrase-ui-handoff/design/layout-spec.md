# Rephrase visual specification

## Core feel
Calm, editorial, softly vintage, feminine, and premium. The visual hierarchy comes
from large serif headlines, restrained line icons, generous negative space, and warm
low-contrast surfaces.

## Typography
- Display: `Cormorant Garamond`, weight 500–600.
- Body: `Libre Baskerville`, weight 400.
- Safe fallback: Georgia, `"Times New Roman"`, serif.
- Display tracking: approximately `-0.035em`.
- Headlines should use tight line-height: `0.9–1.0`.
- Body copy should use `1.55–1.75`.

Suggested responsive scale:
- Portfolio hero: `clamp(3.8rem, 7.2vw, 7.4rem)`.
- Mobile page title: `clamp(3.6rem, 16vw, 5.5rem)`.
- Section title: `2rem–3rem`.
- Body: `0.95rem–1.1rem`.

## Surfaces
- App/page background: `#F6D5C3`.
- Cards: `#FFF8F2` or `#FFFCF9`.
- Card border: `#E8C8B7`.
- Card radius: `22–30px`.
- Card shadow: subtle brown, never grey/black.

## Buttons
- Primary: cocoa `#572F20`, cream text.
- Use pill or large rounded rectangle forms.
- Avoid gradients on controls.
- Minimum interactive target: 44px.

## Layout
- Desktop case-study max-width: `1180px`.
- Hero grid: around `58% / 42%`.
- Mobile horizontal gutter: `20–24px`.
- Desktop section spacing: `96–144px`.
- Mobile section spacing: `48–72px`.
- Feature cards should align on a strict grid even though the illustration style is organic.

## Icons
- Default viewBox: `0 0 24 24`.
- Stroke: `currentColor`.
- Stroke width: `1.7`.
- Rounded caps and joins.
- Avoid solid icon fills except the selected nav state.
- Pastel icon circles: 48–60px.

## Decorative artwork
The botanical sprig and sparkles are decoration, not navigation. Give decorative SVGs
`aria-hidden="true"` and keep meaningful controls independently labelled.

## Motion
- Hover lift: 1–2px.
- Duration: 150–220ms.
- Ease: `ease-out`.
- Respect `prefers-reduced-motion`.
