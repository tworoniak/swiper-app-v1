# React + TypeScript + Vite + Sass

# 📱 Swipe Info App

A mobile-first informational web application built with React + TypeScript + Vite + Sass, featuring:

- 👆 Native-feeling horizontal swipe navigation
- 🧭 Fixed bottom tab navigation
- 🧩 3-panel carousel (prev / current / next)
- 🔄 Optional wrap-around navigation
- 📱 Touch-optimized UX
- 💾 Local tab state persistence

Designed for kiosks, touchscreen devices, mobile-first content apps, and interactive info displays.

--

## ✨ Features

# 🖐 Swipe-Driven Navigation

- Panels follow the user’s finger in real time
- Velocity + distance snap detection
- Rubber-band resistance at edges
- Smooth snap-back animation
- Optional wrap-around support

# 🧭 Fixed Bottom Navigation

- Persistent tab bar
- Touch-friendly tap targets (48px+)
- iOS safe-area support
- Scrollable content remains independent

# 📐 Mobile-First Layout

- 100dvh viewport shell
- Internal scroll containers
- Prevents page-level bounce conflicts
- Uses touch-action: pan-y for correct gesture behavior

--

## 🛠 Tech Stack

- ⚛ React 18+
- 🟦 TypeScript
- ⚡ Vite
- 🎨 Sass (SCSS Modules)
- 🧠 Custom swipe carousel hook (Pointer Events API)

--

## 🧠 Architecture Overview

```code
AppShell
 ├── SlideViewport (3-panel track)
 │     ├── Prev Panel
 │     ├── Current Panel
 │     └── Next Panel
 └── BottomNav (fixed)
```

--

## 📂 Project Structure

```code
src/
  app/
    App.tsx
    slides.tsx

  components/
    AppShell/
    BottomNav/
    SlideViewport/

  hooks/
    useSwipeCarousel3.ts

  slides/
    Home.tsx
    Info.tsx
    FAQ.tsx
    Contact.tsx

  styles/
    abstracts/
    base/
    theme/
    main.scss

  main.tsx
```

--

## 🧩 Adding a New Slide

Add to slides.tsx:

```TypeScript
{
  id: "about",
  label: "About",
  element: <About />
}
```
