/* eslint-disable linebreak-style */
import { defineConfig } from "cypress";
// cypress.config.js
export default defineConfig({
  projectId: "t3a8hb",
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports/mochawesome",
    overwrite: false,
    html: false,
    json: true,
  },
  env: {
    NODE_ENV: "test",
    adminEmail: "me@you.com",
    adminPassword: "11223344",
    CYPRESS_baseurl: "https://icon.amalitech-dev.net/",
  },
  defaultCommandTimeout: 30000,
  chromeWebSecurity: false,
  viewportWidth: 1000,
  viewportHeight: 600,
  pageLoadTimeout: 100000,
  experimentalMemoryManagement: true,
  numTestsKeptInMemory: 20,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: "https://icon.amalitech-dev.net/",
  },
});
