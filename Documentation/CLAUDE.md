# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 e-commerce application for custom bead bracelet design and ordering. Users can design custom bracelets by selecting beads, preview their designs in 3D, and submit orders via JotForm integration.

**Stack:**
- Next.js 15.4.6 (App Router)
- React 19.1.0
- TypeScript 5
- Tailwind CSS 4
- Three.js with React Three Fiber for 3D visualization
- GSAP for animations
- Google Gemini AI for AI-powered design generation

## Development Commands

```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Architecture

### Page Structure
- `/` - Home page with tab navigation (About, Bracelets, Keychains)
- `/customize` - Bracelet editor with bead selection interface
- `/confirm` - Preview page showing the completed bracelet design before order submission
- `/contact` - Contact page

### Key Flows

**Design Flow:**
1. User selects bracelet size (5-30 beads) on [/customize](app/customize/page.tsx)
2. User can either:
   - **Manual Design**: Click bead slots to open modal and select bead images from BEAD_CATALOG
   - **AI Design**: Click "AI Designer" button, describe desired vibe/mood, and let Gemini AI generate a design
3. Design is automatically saved to localStorage as JSON
4. User can generate a Base64-encoded shareable design code or import an existing design code
5. When all slots are filled, user clicks "Create" to proceed to [/confirm](app/confirm/page.tsx)
6. On confirmation, the design is encoded and passed to JotForm via URL parameter, then localStorage is cleared

**State Management:**
- Design state is persisted in localStorage with key `braceletDesign`
- Structure: `{ beadSelections: {[index]: imageUrl}, length: number, size: string, createdAt: string }`

### Core Components

**[beads-editor.tsx](components/beads-editor.tsx)**
- Horizontal scrollable bead slot interface with drag support
- Opens dialog for bead selection from BEAD_CATALOG
- Handles both mouse and touch interactions
- Centers the middle bead on mount
- Dynamically loads bead images from [lib/bead-metadata.ts](lib/bead-metadata.ts)

**[ai-chatbot.tsx](components/ai-chatbot.tsx)**
- Floating AI chatbot interface in bottom-right corner
- Sends user prompts to Gemini AI for design generation
- Displays conversation history and AI explanations
- Applies AI-generated designs to the bracelet editor
- Uses sessionStorage to track latest design

**[bracelet-preview.tsx](components/bracelet-preview.tsx)**
- Renders circular bracelet preview using CSS transforms
- Rotates beads around a configurable radius
- Used on the confirmation page

**[customization-options.tsx](components/customization-options.tsx)**
- Toolbar with dropdown menu for size selection, code generation, and code import
- Encodes/decodes designs using Base64 (see [lib/converter.ts](lib/converter.ts))
- Handles design code sharing functionality

**[ModelViewer.tsx](components/ModelViewer.tsx)**
- Advanced 3D model viewer built on React Three Fiber
- Supports GLB, GLTF, FBX, and OBJ formats
- Features: mouse parallax, manual rotation, touch gestures (pinch-zoom, swipe-rotate), auto-rotation, screenshots
- Customizable lighting and environment presets

**[expandable-logo.tsx](components/expandable-logo.tsx)**
- Animated navigation header that expands on hover to show Create/Designs/Contact links
- Changes appearance based on page context (isHome prop)

### Utilities

**[lib/converter.ts](lib/converter.ts)**
- `encodeDesign()`: Converts BraceletDesign JSON to Base64 string for sharing
- `decodeDesign()`: Converts Base64 string back to BraceletDesign object

**[lib/utils.ts](lib/utils.ts)**
- `cn()`: Utility for merging Tailwind classes with clsx and tailwind-merge

**[lib/bead-metadata.ts](lib/bead-metadata.ts)**
- Central bead catalog with metadata (color, vibe, description)
- Bead naming convention: `{color}-{vibe}.png`
- Helper functions: `getAllBeadFilenames()`, `findBeadsByVibe()`, `getBeadCatalogForAI()`
- Used by both manual selection and AI generation

**[lib/gemini-service.ts](lib/gemini-service.ts)**
- Gemini AI integration service
- `generateBraceletDesign()`: Sends prompts to Gemini and returns structured designs
- System prompt engineering for consistent design output
- Validates AI responses against bead catalog

### API Routes

**[/api/generate-design](app/api/generate-design/route.ts)**
- Server-side endpoint for AI design generation
- Keeps Gemini API key secure (not exposed to client)
- Validates user prompts and bracelet sizes
- Returns structured JSON with bead selections and explanations

## Important Notes

- **AI Integration**: Requires Google Gemini API key in `.env.local` (see [GEMINI_SETUP.md](GEMINI_SETUP.md) for setup instructions)
- **Bead Catalog**: Update [lib/bead-metadata.ts](lib/bead-metadata.ts) when adding new beads. Follow naming convention: `{color}-{vibe}.png`
- **JotForm Integration**: Hardcoded in [confirm/page.tsx](app/confirm/page.tsx:50) - update the form ID if needed
- **Fonts**: Uses Geist Sans and Geist Mono loaded via next/font/google
- **Background Images**: Stored in `/public` and referenced as `/background.png` and `/about.png`
- **Size Options**: Small (5), Medium (10), Large (15), XL (20), 2X (30) beads - defined in SIZE_OPTIONS constant
