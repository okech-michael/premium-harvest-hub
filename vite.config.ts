import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  build: {
    chunkSizeWarningLimit: 1500,
  },
  plugins: [
    tanstackStart({
      server: { entry: "server" },
      router: {
        autoCodeSplitting: true,
        codeSplittingOptions: {
          defaultBehavior: [],
          addHmr: false,
        },
      },
    }),
    react(),
    tailwindcss(),
  ],
});
