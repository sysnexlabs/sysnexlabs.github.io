# ReactBits Integration Guide

This project leverages [ReactBits](https://reactbits.dev/) - a collection of beautiful, animated React components.

## Installing ReactBits Components

ReactBits uses the `jsrepo` CLI to install components. To add a component:

```bash
# For JavaScript with CSS
npx jsrepo add https://reactbits.dev/default/<CategoryName>/<ComponentName>

# For TypeScript with Tailwind CSS
npx jsrepo add https://reactbits.dev/tailwind/<CategoryName>/<ComponentName>
```

## Recommended Components for This Site

### Text Animations
- **Gradient Text**: `npx jsrepo add https://reactbits.dev/default/TextAnimations/GradientText`
- **Shiny Text**: `npx jsrepo add https://reactbits.dev/default/TextAnimations/ShinyText`
- **Scroll Reveal**: `npx jsrepo add https://reactbits.dev/default/TextAnimations/ScrollReveal`

### Backgrounds
- **Aurora**: `npx jsrepo add https://reactbits.dev/default/Backgrounds/Aurora`
- **Beams**: `npx jsrepo add https://reactbits.dev/default/Backgrounds/Beams`
- **Prism**: `npx jsrepo add https://reactbits.dev/default/Backgrounds/Prism`

### Components
- **Spotlight Card**: `npx jsrepo add https://reactbits.dev/default/Components/SpotlightCard`
- **Bounce Cards**: `npx jsrepo add https://reactbits.dev/default/Components/BounceCards`
- **Tilted Card**: `npx jsrepo add https://reactbits.dev/default/Components/TiltedCard`

### Animations
- **Splash Cursor**: `npx jsrepo add https://reactbits.dev/default/Animations/SplashCursor`
- **Magnet**: `npx jsrepo add https://reactbits.dev/default/Animations/Magnet`

## Usage Example

After installing a component:

```jsx
import { GradientText } from 'reactbits';

function MyComponent() {
  return (
    <GradientText
      text="Sysnex Labs"
      colors={['#6366f1', '#8b5cf6']}
    />
  );
}
```

## Documentation

Visit [reactbits.dev](https://reactbits.dev/) for full documentation and component examples.



