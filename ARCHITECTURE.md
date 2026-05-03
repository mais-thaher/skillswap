# SkillSwap - Project Structure Documentation

## Overview
SkillSwap is a modern web application built with **Vite + React + TypeScript + Tailwind CSS**. It follows a feature-based architecture that is scalable and modular, preparing for future backend integration with Node.js and Supabase.

## Project Structure

```
src/
├── app/                          # Application core
│   ├── routes/
│   │   └── AppRoutes.tsx         # Main routing configuration
│   ├── providers/                # Context providers (future)
│   └── layout/
│       ├── MainLayout.tsx        # Main layout wrapper
│       ├── Navbar.tsx            # Navigation bar (responsive)
│       └── Sidebar.tsx           # Sidebar navigation (hidden on mobile)
│
├── features/                     # Feature-based modules (scalable)
│   ├── auth/
│   │   ├── Login.tsx
│   │   └── Register.tsx
│   ├── dashboard/
│   │   └── Dashboard.tsx
│   ├── profile/                  # For future development
│   ├── skills/                   # For future development
│   ├── matching/                 # For future development
│   ├── requests/                 # For future development
│   ├── chat/                     # For future development
│   ├── reviews/                  # For future development
│   └── policies/                 # For future development
│
├── components/                   # Reusable components
│   ├── ui/
│   │   ├── Button.tsx           # Reusable button component
│   │   └── Card.tsx             # Reusable card component
│   └── layout/                   # Layout-specific components
│
├── services/                     # API & external services
│   ├── api/                      # API service layer (future)
│   └── supabase/                 # Supabase integration (future)
│
├── hooks/                        # Custom React hooks (future)
├── lib/                          # Utility functions & helpers (future)
├── types/                        # TypeScript interfaces & types
│   └── index.ts
├── constants/                    # App constants & routes
│   └── index.ts
│
├── App.tsx                       # Root component with routing
├── main.tsx                      # Entry point
└── index.css                     # Global styles (Tailwind)
```

## Key Features

### 1. **Responsive Design**
- Mobile-first approach using Tailwind CSS
- Responsive navbar with hamburger menu
- Hidden sidebar on mobile, visible on desktop
- Grid layouts that stack on mobile

### 2. **Type-Safe Development**
- Full TypeScript support throughout
- Type definitions in `src/types/`
- Interfaces for User, Skill, SkillExchange

### 3. **Feature-Based Architecture**
Each feature is self-contained with its own:
- Components
- Services (future)
- Hooks (future)
- Types (future)

This makes it easy to:
- Add new features independently
- Reuse code across features
- Scale the application

### 4. **Reusable Components**
- `Button` component with variants (primary, secondary, outline) and sizes (sm, md, lg)
- `Card` component for consistent styling
- All styled with Tailwind CSS

### 5. **Routing Setup**
Routes defined in `src/app/routes/AppRoutes.tsx`:
- `/` - Home page
- `/login` - Login page
- `/register` - Register page
- `/dashboard` - Dashboard (with layout)

## Current Pages

### Login Page
- Email and password inputs
- Link to register page
- Placeholder form submission

### Register Page
- Name, email, and password inputs
- Link to login page
- Placeholder form submission

### Dashboard
- Responsive two-column layout (stacks on mobile)
- "Skills Given" section
- "Skills Received" section
- Placeholder data for demonstration

### Home Page
- Welcome message
- Simple hero section

## Installation & Setup

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm preview

# Linting
npm run lint
```

## Development Workflow

### Adding a New Feature
1. Create a new folder in `src/features/`
2. Add components, types, and services as needed
3. Create routes in `src/app/routes/AppRoutes.tsx`
4. Import and use in your application

### Creating New Components
1. Create in `src/components/ui/` for reusable UI components
2. Export from a barrel file (index.ts) if needed
3. Use TypeScript for full type safety

### Styling
- Use Tailwind CSS classes only
- No CSS-in-JS or separate CSS files needed
- Reference `tailwind.config.js` for theme customization

## Future Enhancements

### Backend Integration
- Node.js API endpoints in `src/services/api/`
- Supabase client setup in `src/services/supabase/`
- Authentication flow implementation
- Real-time data syncing

### Additional Features
- Profile management
- Skill browsing and matching
- Request system
- Chat functionality
- Review system
- Terms and policies pages

### Performance
- Code splitting for features
- Lazy loading of routes
- Image optimization
- Build optimization

## Technology Stack

- **Framework**: React 19
- **Build Tool**: Vite 8
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Routing**: React Router v6
- **Node**: 18+

## Environment Variables

Create a `.env` file in the root (when needed for backend):
```
VITE_API_URL=http://localhost:3000
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Notes

- All components use functional components with React hooks
- TypeScript is configured in strict mode
- Tailwind CSS is configured for responsive design
- The project is ready for backend integration without major refactoring
