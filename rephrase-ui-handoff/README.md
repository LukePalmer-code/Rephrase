# Rephrase UI handoff pack

This folder contains the design assets and instructions needed to recreate the Rephrase
portfolio site and app mockups in React + Tailwind CSS.

## Fastest handoff to Claude Code

1. Copy this entire folder into the root of the React repository.
2. Keep `CLAUDE.md` at the repository root.
3. Open Claude Code in that repository.
4. Paste the contents of `PROMPT_FOR_CLAUDE_CODE.md`.
5. Ask Claude to keep running the app/build and compare its work with `reference/*.png`.

A project-level `CLAUDE.md` is useful because Claude Code reads it as persistent project
context. The prompt is intentionally separate: `CLAUDE.md` contains stable rules, while
the prompt contains the one-time implementation task.

## What is included

- `reference/`: six target screenshots.
- `icons/`: original individual SVG assets and React components.
- `design/colors.json`: machine-readable palette.
- `design/tokens.css`: normal CSS custom properties and component primitives.
- `design/tailwind-theme.css`: CSS-first Tailwind theme.
- `design/tailwind.config.ts`: optional config-based equivalent.
- `design/layout-spec.md`: typography, spacing, radius, shadow, and responsive guidance.
- `preview/`: standalone icon and palette galleries.

## Suggested React usage

```tsx
import { HeadphonesIcon, SparkleIcon } from "./icons/RephraseIcons";

export function ListenButton() {
  return (
    <button className="inline-flex items-center gap-3 rounded-full bg-rp-cocoa-800 px-6 py-4 font-rp-display text-xl text-rp-cream-100">
      <SparkleIcon size={18} aria-hidden />
      <HeadphonesIcon size={22} aria-hidden />
      Start Listening
    </button>
  );
}
```

## Suggested Tailwind classes

```tsx
<section className="min-h-screen bg-rp-peach-200 text-rp-cocoa-900">
  <article className="rounded-rp-lg border border-rp-line bg-rp-cream-100 shadow-rp-card">
    ...
  </article>
</section>
```

## Important implementation note

Do not ask Claude to recreate the screenshot as one background image. Ask it to use the
screenshots as comparison targets while rebuilding every visible element in semantic
React components. This produces a responsive portfolio project rather than a static
facsimile.
