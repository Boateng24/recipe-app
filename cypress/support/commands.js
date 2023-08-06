

Cypress.on('uncaught:exception', (err, runnable) => {
  return false
})

Cypress.Commands.add("runTests", () => {
  // Get a list of all test files in the e2e folder and subfolders
  const testFilesPattern = "cypress/e2e/**/*.spec.cy.js";
  const options = { includeTestFiles: true, recursive: true };
  const testFiles = Cypress._.map(
    Cypress._.keys(Cypress.specs),
    (spec) => Cypress._.trimStart(spec, "/") + ".spec.cy.js"
  );

  // Run tests using Cypress' run command
  cy.task("mocha", {
    files: testFiles,
    reporterOptions: { reportDir: "cypress/reports/mochawesome" },
  });
});

