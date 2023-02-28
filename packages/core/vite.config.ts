import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  build: {
    lib: {
      entry: {
        core: resolve(__dirname, "src/index.ts"),
      },
      name: "@nostr-stack/core",
      formats: ["es", "cjs"],
    },
    rollupOptions: {},
    sourcemap: "inline",
  },
  plugins: [dts()],
  test: {
    environment: "jsdom",
  },
});
