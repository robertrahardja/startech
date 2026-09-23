import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: isSsrBuild ? "dist-ssr" : "dist",
    sourcemap: false,
    rollupOptions: isSsrBuild
      ? {}
      : // react/react-dom are externalized by default in SSR mode (Node
        // resolves them itself), which conflicts with pinning them into a
        // manual chunk — that grouping only makes sense for the real
        // client bundle.
        {
          output: {
            manualChunks: {
              react: ["react", "react-dom"],
            },
          },
        },
  },
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:8787",
        changeOrigin: true,
      },
    },
  },
}));
