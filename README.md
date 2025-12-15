<h1 align="center">Bead by Do Bee ✨</h1>
<a id="readme-top"></a>

<!-- PROJECT LOGO -->
<div align="center">
  <br />
  <a href="https://github.com/yourusername/beadbydobee">
    <img src="public/logo.png" alt="Logo" width="20%" height="20%">
  </a>
  <br />
  <p align="center">
    <br />
    Design custom bead bracelets with AI-powered assistance!
    <br />
    <br />
    <p align="center">
      <a href="#"><img alt="Status" src="https://img.shields.io/badge/status-Active-green?style=flat&color=green" /></a>
      <a href="https://nextjs.org"><img alt="Next.js" src="https://img.shields.io/badge/Next.js-15.4.6-black?logo=next.js&logoColor=white&style=flat" /></a>
      <a href="https://react.dev"><img alt="React" src="https://img.shields.io/badge/React-19.1.0-blue?logo=react&logoColor=61DAFB&style=flat" /></a>
    </p>
    <a href="https://github.com/yourusername/beadbydobee/issues/new?labels=bug">Report Bug</a>
    &middot;
    <a href="https://github.com/yourusername/beadbydobee/issues/new?labels=enhancement">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#-project-overview">🗺️ Project Overview</a>
      <ul>
        <li><a href="#-built-with">📚 Built With</a></li>
      </ul>
    </li>
    <li><a href="#-features">✨ Features</a></li>
    <li>
      <a href="#-getting-started">💻 Getting Started</a>
      <ul>
        <li><a href="#-prerequisites">🔧 Prerequisites</a></li>
        <li><a href="#-installation">🛠️ Installation</a></li>
        <li><a href="#-running-the-application">▶️ Running</a></li>
      </ul>
    </li>
    <li><a href="#-notes">📝 Notes</a></li>
    <li><a href="#-contributing">📬 Contributing</a></li>
  </ol>
</details>

<!-- PROJECT OVERVIEW -->

## 🗺️ Project Overview

Bead by Do Bee is a Next.js 15 e-commerce application that lets users design custom bead bracelets and keychains. Users can manually select beads from our catalog or use AI-powered design generation powered by Google Gemini. Designs can be previewed in 3D and shared via shareable design codes before submission to JotForm for ordering.

### 📚 Built With

[![Next.js][Next.js]][Next.js-url]
[![React][React]][React-url]
[![TypeScript][TypeScript]][TypeScript-url]
[![Tailwind CSS][TailwindCSS]][TailwindCSS-url]
[![Three.js][Three.js]][Three.js-url]
[![Google Gemini][Gemini]][Gemini-url]

<!-- FEATURES -->

## ✨ Features

- **Manual Bracelet Designer**: Click-based bead selection interface with drag support
- **AI Design Generator**: Describe your desired vibe and let Gemini AI create a custom design
- **3D Preview**: Interactive 3D bracelet preview with mouse parallax, touch gestures, and auto-rotation
- **Design Sharing**: Generate Base64-encoded shareable design codes or import existing designs
- **Multiple Products**: Support for bracelets and keychains
- **JotForm Integration**: Seamless order submission after design confirmation
- **Responsive Design**: Works on desktop and mobile devices

<!-- GETTING STARTED -->

## 💻 Getting Started

Follow these steps to get Bead by Do Bee running on your local machine.

### 🔧 Prerequisites

- Node.js 18+ or higher
- npm, yarn, pnpm, or bun package manager
- Google Gemini API key (optional, for AI design generation)

### 🛠️ Installation

#### 1. Clone the Repository

```sh
git clone https://github.com/yourusername/beadbydobee.git
cd beadbydobee
```

#### 2. Install Dependencies

```sh
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

#### 3. Environment Setup

```bash
# Copy the environment template
cp .env.local.example .env.local
```

Edit the `.env.local` file and add your Google Gemini API key:

```
NEXT_PUBLIC_GEMINI_API_KEY=your_api_key_here
```

For detailed Gemini setup instructions, see [GEMINI_SETUP.md](GEMINI_SETUP.md).

### ▶️ Running the Application

#### Development Server

```sh
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

The page will auto-update as you edit files.

#### Production Build

```sh
npm run build
npm start
```

#### Linting

```sh
npm run lint
```

## 📝 Notes

- **Bead Catalog**: Update [lib/bead-metadata.ts](lib/bead-metadata.ts) when adding new beads. Follow the naming convention: `{color}-{vibe}.png`
- **JotForm Integration**: The form ID is hardcoded in [app/confirm/page.tsx](app/confirm/page.tsx). Update it if needed.
- **Design Persistence**: User designs are automatically saved to localStorage and can be recovered on return visits
- **AI Integration**: Requires Google Gemini API key for the AI Designer feature (see [GEMINI_SETUP.md](GEMINI_SETUP.md))
- **Fonts**: Uses Geist Sans and Geist Mono from next/font/google
- **Background Images**: Store custom backgrounds in `/public` directory

<!-- CONTRIBUTING -->

## 📬 Contributing

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- MARKDOWN LINKS & IMAGES -->

[Next.js]: https://img.shields.io/badge/Next.js-15.4.6-black?style=for-the-badge&logo=next.js&logoColor=white
[Next.js-url]: https://nextjs.org/
[React]: https://img.shields.io/badge/React-19.1.0-blue?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://react.dev/
[TypeScript]: https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[TailwindCSS]: https://img.shields.io/badge/Tailwind%20CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[TailwindCSS-url]: https://tailwindcss.com/
[Three.js]: https://img.shields.io/badge/Three.js-Latest-black?style=for-the-badge&logo=three.js&logoColor=white
[Three.js-url]: https://threejs.org/
[Gemini]: https://img.shields.io/badge/Google%20Gemini-AI-blue?style=for-the-badge&logo=google&logoColor=white
[Gemini-url]: https://ai.google.dev/
