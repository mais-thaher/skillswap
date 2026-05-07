<<<<<<< HEAD
# SkillSwap - Skill Exchange Platform

A smart web application that enables users to **exchange skills without financial cost**. Connect with others based on complementary skills, learn from each other, and build a collaborative community.

**Core Philosophy**: *Give what you know, learn what you want.*

Built with **React + TypeScript + Vite + Tailwind CSS** with a clean, scalable feature-based architecture.

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

- ✅ **User Profiles** - Showcase skills you offer and skills you want to learn
- ✅ **Smart Matching** - Algorithm suggests users with complementary skills
- ✅ **Real-time Chat** - Communicate with your matches
- ✅ **Rating System** - Build trust with post-session feedback
- ✅ **Points & Rankings** - Gamified experience to encourage participation
- ✅ **Activity Dashboard** - Track your sessions, ratings, and progress
- ✅ **Responsive Design** - Mobile-first with Tailwind CSS
- ✅ **Type-Safe** - Full TypeScript support
- ✅ **Feature-Based Architecture** - Scalable and modular

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

## Project Documentation

- [REQUIREMENTS.md](./REQUIREMENTS.md) - Complete feature specifications and requirements
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Technical architecture and structure
- [PROJECT_STATUS.md](./PROJECT_STATUS.md) - Current implementation status

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
=======
# SkillSwap - Skill Exchange Platform

A smart web application that enables users to **exchange skills without financial cost**. Connect with others based on complementary skills, learn from each other, and build a collaborative community.

**Core Philosophy**: *Give what you know, learn what you want.*
### Prerequisites
- **Node.js** (v18+) - JavaScript runtime
- **npm** (v9+) - Package manager
- **Git** - Version control

### Installation

```bash
git clone https://github.com/mais-thaher/skillswap.git
cd skillswap
npm install
```

### Environment Setup
Create `.env` file:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Start Development
```bash
npm run dev
```

Visit `http://localhost:5173`

## Features

- **User Authentication** - Login/register with Supabase
- **Enhanced Navbar** - Modern design with user profile dropdown
- **User Profiles** - Skills showcase and management
- **Onboarding System** - Guided user setup
- **Responsive Design** - Mobile-first with Tailwind CSS
- **Type-Safe** - Full TypeScript support

## Technology Stack

- **React 19.2.5** - Modern UI framework
- **TypeScript ~6.0.2** - Type safety
- **Vite 8.0.10** - Fast build tool
- **Tailwind CSS 4.2.4** - Styling framework
- **React Router v6** - Client-side routing
- **Supabase** - Database and authentication

## Pages

- **Home** - Welcome page
- **Login** - User authentication
- **Register** - User registration
- **Dashboard** - Skill exchange overview
- **Profile** - User profile management

## Scripts

- **[PROJECT_STATUS.md](./PROJECT_STATUS.md)** - Current implementation status
- **[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)** - Complete file tree
- **[SETUP_COMPLETE.md](./SETUP_COMPLETE.md)** - Setup completion summary

## 🚀 Development Workflow

### Adding a New Page
1. Create a component in `src/features/[feature-name]/`
2. Add a route in `src/app/routes/AppRoutes.tsx`
3. Add navigation links in `src/app/layout/Navbar.tsx`

### Adding a New Component
1. Create in `src/components/ui/` or `src/components/layout/`
2. Export from component folder
3. Use throughout the app

### Code Style Guidelines
- Use functional components with React hooks
- Follow TypeScript best practices
- Use Tailwind CSS for styling (no inline styles)
- Maintain consistent naming conventions
- Add proper error handling

## ⚙️ Configuration

### Tailwind CSS Configuration
- **File**: `tailwind.config.js`
- **Content paths**: Automatically scans `src` for classes
- **Theme**: Custom colors and spacing can be added here

### TypeScript Configuration
- **File**: `tsconfig.json`
- **Strict mode**: Enabled for better type safety
- **Path mapping**: Clean imports with `@/` aliases

### Vite Configuration
- **File**: `vite.config.ts`
- **Plugins**: React plugin with fast refresh
- **Build optimization**: Tree-shaking and code splitting

## 🔧 Available Scripts

```bash
# Install dependencies
npm install

# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 🌐 Browser Support

- ✅ **Chrome** (latest 2 versions)
- ✅ **Firefox** (latest 2 versions)
- ✅ **Safari** (latest 2 versions)
- ✅ **Edge** (latest 2 versions)

## 📱 Responsive Design

- **Mobile-first approach** using Tailwind CSS
- **Breakpoints**: 
  - `sm`: 640px+
  - `md`: 768px+
  - `lg`: 1024px+
  - `xl`: 1280px+
- **Touch-friendly**: All interactive elements optimized for mobile

## 🔒 Security Features

- **Environment Variables**: Sensitive data in `.env` file
- **Supabase Auth**: Secure authentication with JWT tokens
- **Input Validation**: Form validation and sanitization
- **XSS Protection**: React's built-in XSS protection

## 🚀 Deployment

### Build Process
```bash
# Create optimized production build
npm run build

# Output directory: ./dist
# Bundle size: ~240KB (gzipped: ~76KB)
```

### Deployment Options
- **Vercel** - Recommended for React apps
- **Netlify** - Static site hosting
- **AWS S3 + CloudFront** - Custom CDN setup
- **GitHub Pages** - Free hosting option

### Environment Variables for Production
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-production-anon-key
```

## 🧪 Testing (Planned)

```bash
# Run tests (when implemented)
npm run test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

## 🔍 Debugging

### Development Tools
- **React DevTools** - Component inspection and state debugging
- **Vite Dev Server** - Fast hot reload and error overlay
- **TypeScript Errors** - Real-time type checking
- **ESLint** - Code quality and style enforcement

### Common Issues & Solutions
1. **Port already in use**: Change port in `vite.config.ts`
2. **Environment variables**: Ensure `.env` file exists
3. **Import errors**: Check TypeScript configuration
4. **Styling not working**: Verify Tailwind CSS imports

## 📈 Performance

### Optimization Features
- **Code Splitting**: Automatic with React Router
- **Tree Shaking**: Dead code elimination
- **Asset Optimization**: Image and font optimization
- **Bundle Analysis**: `npm run build --analyze`

### Performance Metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Time to Interactive**: < 3.0s
- **Bundle Size**: < 300KB (gzipped)

## 🤝 Contributing

### Development Guidelines
1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature-name`
3. **Make your changes**
4. **Run tests**: `npm run test`
5. **Commit changes**: `git commit -m "Feature description"`
6. **Push to fork**: `git push origin feature-name`
7. **Create Pull Request**

### Code Standards
- Follow existing code style
- Add TypeScript types for all new features
- Write meaningful commit messages
- Update documentation for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

## 🔗 Useful Links

- **React Documentation**: https://react.dev
- **Vite Guide**: https://vite.dev
- **Tailwind CSS Docs**: https://tailwindcss.com/docs
- **TypeScript Handbook**: https://www.typescriptlang.org/docs
- **Supabase Documentation**: https://supabase.com/docs
- **GitHub Repository**: https://github.com/mais-thaher/skillswap

---

## 🎯 Getting Started

1. **Clone & Install**: Follow the installation steps above
2. **Explore the Code**: Check `src/features/` for feature modules
3. **Read Documentation**: Start with [ARCHITECTURE.md](./ARCHITECTURE.md)
4. **Run Development**: `npm run dev` and visit `http://localhost:5173`

**Happy coding! 🚀**
