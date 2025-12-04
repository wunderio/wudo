// vite.config.js
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  root: path.resolve(__dirname, "./"),

  build: {
    outDir: "dist",

    emptyOutDir: false,

    rollupOptions: {
      input: {
        style: path.resolve(__dirname, "components/style.scss"),
      },
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === "style.css") {
            return "style.css";
          }
          return "assets/[name][extname]";
        },
      },
    },
  },
});
