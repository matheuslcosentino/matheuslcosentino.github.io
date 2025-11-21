import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "path";
import { defineConfig } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";

// Plugin para copiar index.html para raiz após build
const copyIndexToRoot = {
  name: 'copy-index-to-root',
  apply: 'build' as const,
  async writeBundle() {
    const sourceIndex = path.resolve(import.meta.dirname, 'dist/public/index.html');
    const targetIndex = path.resolve(import.meta.dirname, 'index.html');
    
    if (fs.existsSync(sourceIndex)) {
      fs.copyFileSync(sourceIndex, targetIndex);
      console.log('✓ index.html copiado para raiz');
    }
  }
};

const plugins = [
  react(),
  tailwindcss(),
  vitePluginManusRuntime(),
  copyIndexToRoot
];

export default defineConfig({
  plugins,
  base: '/',
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "client", "src"),
      "@shared": path.resolve(import.meta.dirname, "shared"),
      "@assets": path.resolve(import.meta.dirname, "attached_assets"),
    },
  },
  envDir: path.resolve(import.meta.dirname),
  root: path.resolve(import.meta.dirname, "client"),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist/public"),
    emptyOutDir: true,
  },
  server: {
    port: 3000,
    strictPort: false,
    host: true,
    allowedHosts: [
      ".manuspre.computer",
      ".manus.computer",
      ".manus-asia.computer",
      ".manuscomputer.ai",
      ".manusvm.computer",
      "localhost",
      "127.0.0.1",
    ],
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
