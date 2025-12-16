# Sysnex Labs Website

Official website for Sysnex Labs - Model-Based Systems Engineering with SysML v2.

## Overview

This repository contains the source code for the Sysnex Labs website, showcasing our MBSE methodology, development tools, and process excellence. The site is built with React and leverages [ReactBits](https://reactbits.dev/) for beautiful animated components.

## Features

- ✨ Modern React-based architecture
- 🎨 Beautiful UI inspired by Untitled UI and ReactBits
- 🚀 Fast development with Vite
- 📱 Fully responsive design
- 🎭 Smooth animations with Framer Motion
- 🌈 Gradient text and spotlight effects

## Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
/
├── src/
│   ├── components/      # Reusable React components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── Hero.jsx
│   │   ├── Card.jsx
│   │   ├── SpotlightCard.jsx
│   │   ├── AnimatedText.jsx
│   │   └── AuroraBackground.jsx
│   ├── pages/          # Page components
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Methods.jsx
│   │   ├── Tools.jsx
│   │   ├── Process.jsx
│   │   └── Contact.jsx
│   ├── styles/         # Global styles
│   ├── App.jsx         # Main app component
│   └── main.jsx        # Entry point
├── assets/             # Images, logos, SVG diagrams
├── package.json
├── vite.config.js
└── README.md
```

## ReactBits Integration

This project uses ReactBits components for enhanced animations and effects. See [REACTBITS_INTEGRATION.md](./REACTBITS_INTEGRATION.md) for details on adding more ReactBits components.

Currently integrated:
- Custom spotlight card effects
- Aurora background animations
- Gradient text animations
- Smooth scroll animations

## Documentation

- **[Style Guide](./STYLE_GUIDE.md)** - Complete corporate design style guide
- **[ReactBits Integration](./REACTBITS_INTEGRATION.md)** - Guide for adding ReactBits components

## Brand Colors

- **Primary**: `#6366f1` (Indigo)
- **Secondary**: `#8b5cf6` (Purple)
- **Accent**: `#ec4899` (Pink)
- **Background**: `#ffffff` / `#f9fafb` (White/Light Gray)

See [STYLE_GUIDE.md](./STYLE_GUIDE.md) for complete color specifications.

## Technologies

- **React 18** - UI library
- **React Router** - Client-side routing
- **Vite** - Build tool and dev server
- **Framer Motion** - Animation library
- **ReactBits** - Animated component library

## License

Copyright © Sysnex Labs. All rights reserved.
Test WASM deployment - Di. 16 Dez. 2025 13:53:40 CET
