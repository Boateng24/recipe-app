/* eslint-disable linebreak-style */
import { defineConfig } from "cypress";
// cypress.config.js
export default defineConfig({
  projectId: "t3a8hb",
  reporter: "mochawesome",
  reporterOptions:{
    "overwrite": true,
    "html": true,
    "json": false
  },
  env: {
    NODE_ENV: "test",
    adminEmail: 'me@you.com',
    adminPassword: '11223344'
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
