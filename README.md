# Electron Application Base

A modern, production-ready foundational Electron application with React, TypeScript, Tailwind CSS, and Vite. This template serves as a solid base for building desktop applications quickly with best practices already configured.

## Features

- **Vite** - Lightning-fast build tool and dev server
- **React 19** - Modern UI library with hooks
- **TypeScript** - Full type safety and IDE support
- **Tailwind CSS 4** - Utility-first CSS framework with PostCSS
- **Electron Forge** - Official scaffolding and packaging tool
- **Hot Module Replacement (HMR)** - Fast refresh during development
- **ESLint & TypeScript** - Pre-configured linting and type checking
- **Cross-platform packaging** - Windows, macOS, and Linux support

## Tech Stack

| Tool               | Version | Purpose                       |
| ------------------ | ------- | ----------------------------- |
| Electron           | 40.6.1  | Desktop application framework |
| React              | 19.2.4  | UI library                    |
| TypeScript         | 5.0.0+  | Type-safe JavaScript          |
| Vite               | 5.4.21  | Build tool & dev server       |
| Tailwind CSS       | 4.2.1   | Styling                       |
| ESLint             | 8.57.1  | Code linting                  |
| @typescript-eslint | 8.0.0   | TypeScript linting rules      |

## Project Structure

```
./
├── src/
│   ├── main.ts           # Electron main process (window creation, app lifecycle)
│   ├── preload.ts        # Preload script (secure IPC bridge)
│   ├── renderer.tsx      # React root component
│   └── index.css         # Global styles with Tailwind
├── vite.main.config.ts   # Vite config for main process
├── vite.preload.config.ts # Vite config for preload script
├── vite.renderer.config.mts # Vite config for renderer process
├── tsconfig.json         # TypeScript configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── postcss.config.js     # PostCSS configuration
├── .eslintrc.json        # ESLint configuration
├── forge.config.ts       # Electron Forge configuration
├── index.html            # HTML entry point
└── package.json          # Project dependencies and scripts
```

## Getting Started

### Prerequisites

- **Node.js**: v18 or higher
- **npm**: v9 or higher (or yarn/pnpm)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <your-directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server with hot reload:

```bash
npm start
```

This will:

- Start the Vite dev server for the renderer process
- Launch the Electron app with auto-reload on file changes
- Open DevTools for debugging

### Linting

Check code quality:

```bash
npm run lint
```

### Building

Create production binaries:

```bash
npm run make
```

This generates installers for your platform in the `out/` directory.

#### Package the application:

```bash
npm run package
```

## Architecture

### Main Process (`src/main.ts`)

- Handles application lifecycle (create, close windows)
- Creates the BrowserWindow with security settings
- Sets up preload script bridge for IPC

### Preload Script (`src/preload.ts`)

- Acts as a secure bridge between main and renderer processes
- Exposes limited IPC API to renderer
- Prevents direct Node.js access in renderer (security best practice)

### Renderer Process (`src/renderer.tsx`)

- React application running in the BrowserWindow
- Full access to DOM and browser APIs
- Limited Node.js access (through preload script only)

## Styling

The project uses **Tailwind CSS 4** with the new `@import "tailwindcss"` syntax.

### Basic Example

```tsx
<div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-8">
  <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8">
    <h1 className="text-3xl font-bold text-center mb-4">Hello</h1>
  </div>
</div>
```

## Development Guidelines

### TypeScript

- Always use `.ts` for non-JSX files
- Use `.tsx` for React components
- Enable `noImplicitAny` for type safety

### React Components

- Use functional components with hooks
- Prefer `const` declarations
- Keep components focused and reusable

### Code Quality

- Run `npm run lint` before committing
- Fix linting errors: `npx eslint --fix`
- Follow TypeScript strict mode practices

### Electron Security

- Always use the preload script for main process communication
- Never set `nodeIntegration: true` in production
- Validate all IPC messages from the main process
- Use `contextIsolation: true` (already configured)

## Extending the Application

### Adding New Dependencies

```bash
npm install <package-name>
```

For development dependencies:

```bash
npm install --save-dev <package-name>
```

### Creating New Components

Create components in `src/` with `.tsx` extension:

```tsx
// src/components/MyComponent.tsx
import React from "react";

interface MyComponentProps {
  title: string;
}

export const MyComponent: React.FC<MyComponentProps> = ({ title }) => {
  return <div className="p-4">{title}</div>;
};
```

### IPC Communication (Main ↔ Renderer)

**In preload.ts:**

```typescript
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
  invoke: (channel: string, ...args: unknown[]) =>
    ipcRenderer.invoke(channel, ...args),
});
```

**In renderer.tsx:**

```tsx
async function callMainProcess() {
  const result = await window.electron.invoke("my-channel", data);
}
```

**In main.ts:**

```typescript
import { ipcMain } from "electron";

ipcMain.handle("my-channel", async (event, data) => {
  // Handle the request
  return { success: true };
});
```

## Troubleshooting

### Port Already in Use

If the dev server fails to start due to port conflicts:

```bash
lsof -i :5173
kill -9 <PID>
```

### Build Failures

Clear build artifacts and reinstall:

```bash
rm -rf node_modules package-lock.json .vite
npm install
npm start
```

### ESLint Parse Errors

Ensure TypeScript versions are compatible:

```bash
npm ls typescript @typescript-eslint/parser
```

Should show:

- typescript: ^5.0.0
- @typescript-eslint/parser: ^8.0.0

## Platform-Specific Notes

### macOS

- App will run in foreground after exit (standard macOS behavior)
- Code signing required for distribution via App Store

### Windows

- Installers created with Squirrel.Windows
- Auto-updates supported

### Linux

- Creates `.deb` and `.rpm` packages
- AppImage support available via Forge plugins

## Resources

- [Electron Documentation](https://www.electronjs.org/docs)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [TypeScript Documentation](https://www.typescriptlang.org)

## License

MIT

---

**Author:** Ankit Patel  
**Email:** ankit013002@gmail.com  
**Version:** 1.0.0
