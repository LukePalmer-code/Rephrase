# Prompt to paste into Claude Code

Build the Rephrase frontend from the design handoff in this repository.

First inspect:
- `reference/portfolio.png`
- `reference/home.png`
- `reference/narrate.png`
- `reference/listen.png`
- `reference/recall.png`
- `reference/profile.png`
- `design/tailwind-theme.css`
- `design/layout-spec.md`
- `icons/RephraseIcons.tsx`

Then:

1. Set up or adapt the existing React + TypeScript + Vite project.
2. Configure Tailwind using `design/tailwind-theme.css`. If this project uses a
   config-based Tailwind setup, adapt `design/tailwind.config.ts`.
3. Load `Cormorant Garamond` for display text and `Libre Baskerville` for body text.
4. Build reusable primitives:
   - `PageShell`
   - `EditorialHeading`
   - `CreamCard`
   - `PastelIconBadge`
   - `PrimaryButton`
   - `BottomNavigation`
   - `BotanicalDecoration`
   - `PhoneFrame`
5. Build these routes/pages:
   - `/` — portfolio landing page matching `reference/portfolio.png`
   - `/app` — home screen matching `reference/home.png`
   - `/app/narrate`
   - `/app/listen`
   - `/app/recall`
   - `/app/me`
6. Use the supplied SVGs and React icon components. Do not substitute emoji or a
   third-party icon set.
7. Treat the screenshots as visual references, but render all text, cards, controls,
   icons, and layout as real HTML/SVG.
8. Make the portfolio site responsive:
   - one-column mobile hero
   - two-column desktop hero
   - phone mockup remains visually prominent
9. Add small restrained motion only: button lift, card hover, and voice orb pulse.
10. Respect `prefers-reduced-motion`.
11. Ensure navigation works and selected mobile tabs are visually distinct.
12. Run formatting, linting, type checking, and the production build. Fix all errors.
13. Finally, review the implementation against each screenshot and tighten spacing,
    font scale, radii, colour, border, and shadow differences.

Do not stop after scaffolding. Complete the visual implementation and leave the project
in a runnable, production-buildable state.
