/* eslint-disable linebreak-style */
import { defineConfig } from "cypress";
// cypress.config.js
export default defineConfig({
  env: {
    NODE_ENV: "test",
  },
  defaultCommandTimeout: 30000,
  chromeWebSecurity: false,
  viewportWidth: 1000,
  viewportHeight: 600,
  pageLoadTimeout: 100000,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://icon.amalitech-dev.net/",
  },
});
