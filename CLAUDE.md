# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `pnpm dev` - Start development server with Turbopack (preferred)
- `pnpm build` - Build production application with Turbopack
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint for code quality checks

### Package Management
- Uses `pnpm` as package manager (pnpm-lock.yaml present)
- `pnpm install` to install dependencies

## Architecture

### Framework & Tech Stack
- **Next.js 15.5.2** with App Router architecture
- **React 19** with TypeScript
- **TailwindCSS v4** with custom design system using OKLCH color space
- **Shadcn/ui** components (New York style) configured in `components.json`
- **nuqs** for URL state management
- **Lucide React** for icons
- **zod** for schema validation

### Project Structure
- **App Router**: Uses Next.js 13+ app directory structure
- **Component Structure**:
  - `@/components` - General components
  - `@/components/ui` - Shadcn/ui components
  - `@/lib` - Utility functions and shared logic
  - `@/hooks` - Custom React hooks
- **Styling**: 
  - TailwindCSS v4 with custom theme in `app/globals.css`
  - Uses CSS variables with OKLCH color space for better color management
  - Dark mode support via `.dark` class
  - Custom design tokens for sidebar, charts, and UI components

### Key Configuration
- **TypeScript**: Strict mode enabled with path aliases (`@/*` maps to root)
- **ESLint**: Next.js core-web-vitals and TypeScript rules
- **Fonts**: Geist Sans and Geist Mono from Google Fonts
- **Icons**: Lucide React icon library
- **UI Library**: Shadcn/ui with CSS variables and neutral base colors

### Development Notes
- Uses Turbopack for faster builds and development
- Component library follows Shadcn/ui patterns with `cn()` utility for class merging
- Custom CSS properties defined for consistent theming across light/dark modes
- All paths use TypeScript absolute imports with `@/` prefix