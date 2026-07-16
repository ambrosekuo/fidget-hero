# Fidget Hero

A tiny desktop toy for when your eyes wander and your hands need something to do.

## What is this?

Fidget Hero is a small always-on-top app with a persistent, game-ish state — something to poke at while you wait, think, or stare off into the middle distance.

It's a little brainrot, honestly. But it's *your* brainrot. The kind that lives in a floating window instead of an infinite scroll.

Built for people like me: undiagnosed ADHD, restless fingers, and a bad habit of opening Reddit when nothing is happening.

## Current state

Early days. Right now it's a glassy Tauri window with:

- drag-from-anywhere movement
- always-on-top toggle
- content that shifts opposite your drag (with Motion spring smoothing)
- a red ball, because sometimes that's enough

More fidget mechanics and persistent state coming later.

## Stack

- [Tauri 2](https://v2.tauri.app/) — desktop shell
- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Motion](https://motion.dev/) — smooth movement
- [Vite](https://vite.dev/)

## Development

```bash
pnpm install
pnpm tauri dev
```

Build:

```bash
pnpm tauri build
```

## License

TBD
