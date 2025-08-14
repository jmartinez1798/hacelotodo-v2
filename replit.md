# Hacelotodo.com - Service Marketplace

## Overview

Hacelotodo.com is a comprehensive marketplace platform that connects customers with verified professionals across multiple service categories. The platform enables service discovery, booking management, and provider registration with a focus on local service delivery. Built as a modern web application with React frontend and Express backend, it's optimized for deployment on Replit with static build serving and integrated database support.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development patterns
- **Build System**: Vite for fast development and optimized production builds
- **Routing**: Wouter for lightweight client-side routing without the overhead of React Router
- **Styling**: Tailwind CSS with custom design system including brand colors and typography
- **UI Components**: Radix UI primitives with shadcn/ui component library for consistent, accessible interface elements
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Form Handling**: React Hook Form with Zod validation for type-safe form processing

### Backend Architecture
- **Runtime**: Node.js with Express.js framework for lightweight API server
- **API Design**: RESTful endpoints with clear resource-based URLs
- **Static Serving**: Express serves Vite-built static files with SPA fallback routing
- **Error Handling**: Centralized error middleware with structured JSON responses
- **Request Logging**: Custom middleware for API request tracking and debugging

### Database Strategy
- **Primary**: Drizzle ORM with PostgreSQL schema definitions for type-safe database operations
- **Fallback**: In-memory storage system for development and environments without database access
- **Data Models**: Services, providers, and bookings with proper relational structure
- **Schema Validation**: Zod schemas integrated with Drizzle for runtime type checking

### Application Features
- **Service Categories**: 8 distinct categories (home, beauty, technology, events, pets, fitness) with category-based filtering and dedicated category pages
- **Provider Profiles**: Individual provider pages with booking forms, contact information, and service details
- **Booking System**: Time slot generation with customer information capture and confirmation flow
- **Provider Registration**: Multi-step registration process with draft saving to localStorage
- **Search and Filtering**: Advanced filtering by category, city, and price range with real-time updates
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints for all screen sizes
- **SEO Optimization**: Category pages with structured data and dynamic meta tags
- **Logo & Branding**: Professional logo component integrated throughout the application

### Build and Deployment
- **Development**: Separate dev servers for client and server with hot reload
- **Production**: Single-step build process that compiles React app and serves via Express
- **Static Assets**: Vite builds optimized bundles served directly by Express with proper caching headers
- **Environment**: Configured for Replit deployment with PORT and host binding

## Recent Changes (August 2025)

### Puerto Rico Localization Update
- **Geography**: Updated all mock data to use Puerto Rican cities (San Juan, Bayamón, Carolina, Ponce, etc.)
- **Currency**: Changed from EUR (€) to USD ($) formatting throughout the application
- **SEO**: Updated meta tags, titles, and descriptions to target Puerto Rico market specifically

### Performance & SEO Optimizations (Based on GPT-5 Recommendations)
- **Security Headers**: Added Helmet.js for security headers and CSRF protection
- **Compression**: Implemented gzip compression for faster response times
- **SEO Infrastructure**: Added sitemap.xml and robots.txt endpoints with proper caching headers
- **Structured Data**: Implemented JSON-LD schema markup for better search engine understanding
- **Meta Tags**: Enhanced Open Graph tags for better social media sharing
- **Health Monitoring**: Added /api/health endpoint for deployment monitoring

### Full-Stack UI/UX Enhancement (August 14, 2025)
- **Logo & Branding**: Created professional logo component with consistent brand identity
- **Provider Profiles**: Added `/perfil/:id` pages with booking functionality and provider details
- **Category Pages**: Implemented `/categoria/:slug` pages with SEO optimization and JSON-LD
- **Enhanced Navigation**: Updated Navbar with Logo and category links
- **GitHub Auto-Sync**: Implemented bidirectional sync system with security protection
- **Repository**: Created "hacelotodo-v2" with GitHub Actions and webhook endpoint
- **Static Assets**: Added favicon.svg, robots.txt, and deployment configurations

### GitHub Sync System (August 14, 2025)
- **Bidirectional Sync**: GitHub ↔ Replit automatic synchronization
- **Security**: SYNC_TOKEN protected webhook endpoint `/__sync`
- **GitHub Actions**: Auto-trigger sync on push to main branch
- **Auto-Push**: Optional Replit → GitHub sync every 60 seconds
- **Scripts**: Complete automation scripts for setup and maintenance

### Technical Improvements
- **TypeScript**: Resolved all type compatibility issues in storage layer
- **Error Handling**: Improved type safety for undefined/null values in database schema
- **Caching**: Added appropriate cache headers for static SEO content (24-hour cache)
- **Routing**: Added new wouter routes for profiles and categories
- **API Enhancement**: Extended service endpoint to include provider data for profiles

## External Dependencies

### Core Infrastructure
- **Replit Database**: Primary data storage when available, with automatic fallback to in-memory storage
- **Neon Database**: PostgreSQL provider configured via DATABASE_URL environment variable
- **Formspree**: Optional form submission service for provider registration (controlled by VITE_FORMSPREE_ID)

### Security & Performance
- **Helmet.js**: Security middleware for HTTP headers protection
- **Compression**: Gzip compression middleware for response optimization
- **Morgan**: HTTP request logger for monitoring and debugging

### UI and Styling
- **Google Fonts**: Inter font family loaded from CDN for consistent typography
- **Font Awesome**: Icon library for consistent iconography across the platform
- **Unsplash**: Image service for service provider photos and category illustrations

### Development Tools
- **Vite Plugins**: Runtime error overlay and development banner for Replit integration
- **TypeScript**: Full type checking across client, server, and shared code
- **ESBuild**: Server bundling for production deployment
- **Tailwind CSS**: Utility-first styling with custom color palette and component classes