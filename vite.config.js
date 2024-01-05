import { defineConfig } from "vite";
import { APIConstants } from "./src/utils/constants";
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
        target: APIConstants.BASE_URL,
        secure: false,
      },
    },
  },
});
