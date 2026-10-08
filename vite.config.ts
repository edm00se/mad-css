import { defineConfig } from "vite-plus";
import { cloudflare } from "@cloudflare/vite-plugin";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { sentryTanstackStart } from "@sentry/tanstackstart-react";

export default defineConfig({
  staged: {
    "*": "vp check --fix",
  },
  fmt: {},
  lint: { options: { typeAware: true, typeCheck: true } },
  server: {
    port: 3000,
  },
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    cloudflare({
      viteEnvironment: { name: "ssr" },
    }),
    tanstackStart(),
    viteReact(),
    sentryTanstackStart({
      org: "syntax-fm",
      project: "mad-css",
      authToken: process.env.SENTRY_AUTH_TOKEN,
    }),
  ],
});
