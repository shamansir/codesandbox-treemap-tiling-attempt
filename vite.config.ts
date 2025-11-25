import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { allowedHosts: ["x9l5t5-5173.csb.app", "cq6nmx-5173.csb.app"] },
});
