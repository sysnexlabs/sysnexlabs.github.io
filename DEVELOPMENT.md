# Development Guide

## Running the Development Server

This website uses Vite for development. To run the development server:

```bash
npm install
npm run dev
```

The site will be available at `http://localhost:5173` (or the port Vite assigns).

## Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Important Notes

- **The React app (Home page) requires the Vite dev server to run** - you cannot open `index.html` directly in a browser
- Static HTML pages (product.html, pricing.html, etc.) can be opened directly
- The React app uses ES modules which require a server to work properly

## Troubleshooting

If the Home page is not loading:

1. Make sure you're running `npm run dev`
2. Check the browser console for errors
3. Ensure all dependencies are installed: `npm install`
4. Clear browser cache and reload



