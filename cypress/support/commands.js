// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("runTests", () => {
  // Get a list of all test files in the e2e folder and subfolders
  const testFilesPattern = "cypress/e2e/**/*.spec.cy.js";
  const options = { includeTestFiles: true, recursive: true };
  const testFiles = Cypress._.map(
    Cypress._.keys(Cypress.specs),
    (spec) => Cypress._.trimStart(spec, "/") + ".spec.cy.js"
  );

  // Disable the default Mochawesome reporter
  Cypress.config("reporter", null);

  // Run tests using Cypress' run command
  cy.task("mocha", {
    files: testFiles,
    reporterOptions: { reportDir: "cypress/reports" },
  });
});