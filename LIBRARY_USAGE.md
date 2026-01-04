# Library Usage Example

## Local Testing

To test this library locally in another project:

### 1. Build the library
```bash
cd avakio-ui-components
npm run build
```

### 2. Link the library locally
```bash
npm link
```

### 3. In your test project
```bash
npm link avakio-ui-components
```

### 4. Import and use
```tsx
import { AvakioButton } from 'avakio-ui-components';
import 'avakio-ui-components/dist/avakio-ui-components.css';

function App() {
  return (
    <AvakioButton label="Hello" variant="primary" />
  );
}
```

## Publishing to NPM

### 1. Login to NPM
```bash
npm login
```

### 2. Publish
```bash
npm publish
```

### 3. In other projects
```bash
npm install avakio-ui-components
```

Then import:
```tsx
import { AvakioButton, AvakioCalendar } from 'avakio-ui-components';
import 'avakio-ui-components/dist/avakio-ui-components.css';
```

## Package Contents

After build, the `dist/` folder contains:
- `avakio-ui-components.js` - ES Module build
- `avakio-ui-components.umd.cjs` - UMD build for older tools
- `avakio-ui-components.css` - All component styles
- `index.d.ts` - TypeScript declarations
- Source maps for debugging

## Configuration Summary

The library is configured with:
- ✅ ES Module and UMD builds
- ✅ CSS bundled separately
- ✅ TypeScript declarations
- ✅ React as peer dependency
- ✅ Source maps included
- ✅ Tree-shaking support
