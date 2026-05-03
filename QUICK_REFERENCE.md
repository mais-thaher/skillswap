#!/usr/bin/env pwsh
# Quick Reference Commands for SkillSwap Development

# Development
npm run dev              # Start development server (http://localhost:5173)
npm run build            # Build for production
npm run preview          # Preview production build
npm run lint             # Run ESLint

# Installation
npm install              # Install all dependencies
npm install <package>    # Install a new package
npm install -D <package> # Install a dev dependency

# Common Additions (when needed)
npm install axios        # For HTTP requests
npm install @supabase/supabase-js  # For Supabase
npm install zustand      # For state management
npm install react-testing-library  # For testing

# Creating New Components
# 1. Create file in src/components/ui/ or src/features/[name]/
# 2. Export from index.ts
# 3. Use in your app

# Creating New Pages
# 1. Create component in src/features/[feature-name]/
# 2. Add route in src/app/routes/AppRoutes.tsx
# 3. Add link in src/app/layout/Navbar.tsx

# File Structure Quick Reference
src/
  app/                    # App core (routes, layout, providers)
  features/               # Feature modules (auth, dashboard, etc.)
  components/             # Reusable components (ui, layout)
  services/               # API and external services
  hooks/                  # Custom React hooks
  lib/                    # Utility functions
  types/                  # TypeScript interfaces
  constants/              # App constants

# Common Patterns

# Creating a Component
# 1. Create src/components/ui/MyComponent.tsx:
#    import React from 'react';
#    interface MyComponentProps { }
#    const MyComponent: React.FC<MyComponentProps> = () => {
#      return <div></div>;
#    };
#    export default MyComponent;

# 2. Export from src/components/ui/index.ts:
#    export { default as MyComponent } from './MyComponent';

# 3. Import and use:
#    import { MyComponent } from '@/components/ui';

# Creating a Page/Feature
# 1. Create src/features/myfeature/MyPage.tsx
# 2. Add route in src/app/routes/AppRoutes.tsx:
#    <Route path="/mypage" element={<MainLayout><MyPage /></MainLayout>} />
# 3. Add link in src/app/layout/Navbar.tsx

# Working with Tailwind
# - Use utility classes directly: className="bg-blue-500 text-white"
# - Mobile first: className="text-sm md:text-base lg:text-lg"
# - States: hover:, focus:, disabled:, dark:
# - Responsive: sm:, md:, lg:, xl:, 2xl:

# TypeScript Tips
# - Always type props: interface ComponentProps { }
# - Use React.FC for component type
# - Export types/interfaces from src/types/index.ts
# - Use strict null checks

# Debugging
# Open browser DevTools: F12 or Cmd+Option+I
# React DevTools: Install browser extension
# ESLint errors: npm run lint

# Useful Links
# Docs: ARCHITECTURE.md, README.md, PROJECT_STRUCTURE.md
# Dev Guide: .github/DEVELOPMENT.md
# React Docs: https://react.dev
# Tailwind: https://tailwindcss.com/docs
# TypeScript: https://www.typescriptlang.org/docs
