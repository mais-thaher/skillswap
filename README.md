# SkillSwap - Skill Exchange Platform

A modern web application for exchanging skills with others in your community. Built with **React + TypeScript + Vite + Tailwind CSS** with a clean, scalable feature-based architecture.

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will be available at `http://localhost:5173/`

## Project Structure

See [ARCHITECTURE.md](./ARCHITECTURE.md) for a detailed project structure and architectural documentation.

```
src/
├── app/                  # Application core (routing, layout, providers)
├── features/             # Feature modules (auth, dashboard, etc.)
├── components/           # Reusable UI components
├── services/             # API and external services
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── types/                # TypeScript types and interfaces
└── constants/            # App-wide constants
```

## Features

- ✅ **Responsive Design** - Mobile-first with Tailwind CSS
- ✅ **Type-Safe** - Full TypeScript support
- ✅ **Feature-Based Architecture** - Scalable and modular
- ✅ **React Router** - Client-side routing
- ✅ **Reusable Components** - Button, Card, and more
- ✅ **Modern Tooling** - Vite for fast development

## Pages

- **Home** - Welcome page with navigation
- **Login** - User authentication (placeholder)
- **Register** - User registration (placeholder)
- **Dashboard** - Skill exchange overview with responsive layout

## Technology Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite 8** - Build tool
- **Tailwind CSS 4** - Styling
- **React Router v6** - Routing

## Components

### UI Components
- `Button` - Customizable button with variants (primary, secondary, outline)
- `Card` - Reusable card container

### Layout Components
- `MainLayout` - Main app layout with navbar and sidebar
- `Navbar` - Responsive navigation bar
- `Sidebar` - Desktop sidebar navigation

## Future Enhancements

- Backend integration (Node.js + Supabase)
- User authentication
- Skill management
- Matching algorithm
- Real-time chat
- Reviews and ratings

## Development

### Adding a New Page
1. Create a component in `src/features/[feature-name]/`
2. Add a route in `src/app/routes/AppRoutes.tsx`
3. Add navigation links in `src/app/layout/Navbar.tsx`

### Adding a New Component
1. Create in `src/components/ui/` or `src/components/layout/`
2. Export from component folder
3. Use throughout the app

## Configuration

- **Tailwind CSS** - `tailwind.config.js`
- **TypeScript** - `tsconfig.json`
- **Vite** - `vite.config.ts`

## Learn More

- [React Documentation](https://react.dev)
- [Vite Guide](https://vite.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
