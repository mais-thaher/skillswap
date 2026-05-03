# SkillSwap Development Guidelines

This document provides guidelines and instructions for developing the SkillSwap application.

## Code Style

- **Language**: TypeScript (strict mode)
- **Components**: Functional components with React hooks only
- **Styling**: Tailwind CSS classes only (no CSS-in-JS)
- **Imports**: Use barrel exports from index.ts files

## File Organization

### Component Structure
```typescript
// src/components/ui/MyComponent.tsx
import React from 'react';

interface MyComponentProps {
  // Props with full typing
}

const MyComponent: React.FC<MyComponentProps> = ({ ...props }) => {
  return <div>{/* JSX */}</div>;
};

export default MyComponent;
```

### Feature Structure
```
src/features/feature-name/
├── pages/
├── components/
├── hooks/
├── types.ts
├── services.ts
└── index.ts
```

## Naming Conventions

- **Components**: PascalCase (e.g., `LoginForm.tsx`)
- **Files**: PascalCase for components, camelCase for utilities
- **Interfaces**: PascalCase with Props suffix (e.g., `ButtonProps`)
- **Constants**: UPPER_SNAKE_CASE
- **Functions**: camelCase

## Development Commands

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run lint      # Run ESLint
npm run preview   # Preview production build
```

## Adding Features

1. Create feature folder in `src/features/`
2. Create components inside the feature
3. Create TypeScript types/interfaces
4. Add routes in `src/app/routes/AppRoutes.tsx`
5. Export from feature's `index.ts`

## Working with Tailwind CSS

- Use utility classes directly in JSX className
- For complex styles, create reusable components
- Reference `tailwind.config.js` for custom theme values
- Mobile-first responsive design: `sm:`, `md:`, `lg:`, `xl:`

## Type Safety

- All props must be typed
- Create interfaces in `src/types/` for shared types
- Use strict null checks
- Return types for functions are recommended

## Git Workflow

- Feature branches: `feature/feature-name`
- Bug fixes: `fix/bug-name`
- Keep commits atomic and descriptive
- Update README.md and ARCHITECTURE.md for significant changes

## Environment Setup

1. Node.js 18+ required
2. Install dependencies: `npm install`
3. Create `.env` if using environment variables
4. Start dev server: `npm run dev`

## Backend Integration (Future)

When integrating backend:
1. Add API service in `src/services/api/`
2. Create hooks in `src/hooks/` for data fetching
3. Use TypeScript interfaces from `src/types/`
4. Implement error handling and loading states

## Performance Tips

- Use React.memo for expensive components
- Implement code splitting with React.lazy
- Optimize images and assets
- Use Tailwind's purging for production builds
- Profile with React DevTools

## Troubleshooting

### Build Issues
- Clear `node_modules` and reinstall: `rm -r node_modules && npm install`
- Clear Vite cache: `rm -r .vite`
- Check TypeScript errors: `npm run build`

### Styling Issues
- Verify Tailwind CSS is imported in `src/index.css`
- Check `tailwind.config.js` for correct content paths
- Rebuild: `npm run build`

## Resources

- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vite Guide](https://vite.dev)
- [React Router Documentation](https://reactrouter.com)
