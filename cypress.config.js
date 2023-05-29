/* eslint-disable linebreak-style */
import { defineConfig } from "cypress";
// cypress.config.js
export default defineConfig({
  reporter: "mochawesome",
  reporterOptions:{
    "reportDir": "cypress/reports",
    "overwrite": true,
    "html": true,
    "json": false
  },
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
