import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = { ...process.env, ...loadEnv(mode, "..") };
  return {
    plugins: [react()],
    envDir: "..",
    server: {
      port: Number(env.VITE_PORT),
      proxy: {
        "/trpc": {
          target: `http://localhost:${env.VITE_API_PORT}`,
          changeOrigin: false,
        },
      },
    },
  };
});
