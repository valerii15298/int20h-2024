import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-vite-plugin";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = { ...process.env, ...loadEnv(mode, "..") };
  const proxyOptions = {
    target: `http://localhost:${env.VITE_API_PORT}`,
    changeOrigin: false,
  };
  return {
    plugins: [TanStackRouterVite(), react()],
    envDir: "..",
    server: {
      port: Number(env.VITE_PORT),
      proxy: {
        "/trpc": proxyOptions,
        "/upload": proxyOptions,
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
