import { TanStackRouterVite as tanStackRouterVite } from "@tanstack/router-vite-plugin";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig, loadEnv } from "vite";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = { ...process.env, ...loadEnv(mode, "..") },
    proxyOptions = {
      changeOrigin: false,
      target: `http://localhost:${env["VITE_API_PORT"]}`,
    };
  return {
    envDir: "..",
    plugins: [tanStackRouterVite(), react()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      port: Number(env["VITE_PORT"]),
      proxy: {
        "/trpc": proxyOptions,
        "/upload": proxyOptions,
      },
    },
  };
});
