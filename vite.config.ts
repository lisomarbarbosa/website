import { copyFileSync } from "fs";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // Configurações do servidor
  server: {
    host: mode === "development" ? "::" : "www.lisomarbarbosa.adv.br",
    port: 8080,
  },
  // Plugins
  plugins: [
    react(),
    {
      name: "copy-to-404",
      writeBundle() {
        copyFileSync("dist/index.html", "dist/404.html");
      },
    },
  ],
  // Resolução de aliases
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Configurações específicas para produção (opcionais)
  build: mode === "production" ? { sourcemap: false, minify: "terser" } : {},
}));
