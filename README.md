# Kinder-Things-Tracker

Kinder-Things-Tracker is a comprehensive tool for tracking and managing your collection of Kinder Joy Stranger Things toys.

## Project Overview

This project is a monorepo containing both frontend and backend applications:

- **Frontend**: A Progressive Web App (PWA) built with modern web technologies
- **Backend**: A NestJS application providing API services

## Features

- Track your Kinder Joy Stranger Things toy collection
- Mark toys as collected
- View collection statistics
- Share your collection with friends
- Get notifications about new releases

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm (v7 or later)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/kinder-things-tracker.git
   cd kinder-things-tracker
   ```

2. Install dependencies for both applications:
   ```
   npm run install:all
   ```

### Running the Applications

To run both applications simultaneously:

```
npm start
```

To run only the backend:

```
npm run start:backend
```

To run only the frontend:

```
npm run start:frontend
```

### Building for Production

```
npm run build
```

## Project Structure

```
kinder-things-tracker/
├── packages/
│   ├── backend/     # NestJS backend application
│   └── frontend/    # PWA frontend application
│       ├── public/
│       │   ├── icons/  # PWA icons (need to be added)
│       │   └── manifest.json
│       ├── src/
│       │   └── app/    # Next.js App Router
│       ├── next.config.js
│       ├── package.json
│       ├── postcss.config.js
│       ├── tailwind.config.js
│       └── tsconfig.json
├── package.json     # Root package.json with workspace configuration
└── README.md        # This file
```

## PWA Icons

Before deploying the application, you need to add the following PWA icons to the `packages/frontend/public/icons` directory:

- `icon-192x192.png` - 192x192 pixel icon for PWA
- `icon-512x512.png` - 512x512 pixel icon for PWA

These icons are referenced in the `manifest.json` file and are required for the PWA to be installable.

## License

This project is licensed under the MIT License - see the LICENSE file for details.