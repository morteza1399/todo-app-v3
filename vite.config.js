import { defineConfig } from "vite";
import { BASE_URL } from "./src/utils/constants";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/todo-items": {
        target: BASE_URL,
        secure: false,
      },
    },
  },
});
