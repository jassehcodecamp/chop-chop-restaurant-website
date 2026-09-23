# Hamburger menu

The phone header used to stack the logo, the three links, and **Get the app**. QA asked for a hamburger instead. Three prototypes were compared, and **C. Right drawer** is the one on the live page.

Desktop from `sm:` (40rem) stays a row: links plus **Get the app**. The icon button is `sm:hidden`.

## Phone behaviour

Closed bar: logo and wordmark on the left, a 44px icon button on the right. The bar is sticky on the phone so the button stays put while the menu is open, and `sm:static` on wider screens. The four in-page sections use the same offset as `scroll-mt` on the phone, so a jump lands below the bar.

Opening the button slides a `w-72` panel in from the right (`translate-x`, `duration-200`). The rest of the viewport below the bar is a translucent ink scrim (`bg-ink/40`). **Get the app** and the three links sit in the panel. The links keep the header classes (`text-sm text-ink-3`, `border-b-2`, lift and `hover:border-chop`).

A scrim click, Escape, the X, or a link closes it. Focus returns to the button. The open/close logic lives in [src/main.ts](../src/main.ts).

[docs/plan.md](plan.md) stays the original landing-page plan.
