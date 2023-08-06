import { authSelectors } from "../selectors/authSelectors";
import { iconUrls } from "../urls/urls";

// Login as Admin
Cypress.Commands.add("AdminLogin", () => {
  cy.visit(iconUrls.loginUrl);
  cy.contains(authSelectors.loginHeading);
  cy.get(authSelectors.emailId).type(Cypress.env("adminEmail"));
  cy.get(authSelectors.passwordId).type(Cypress.env("adminPassword"));
  cy.get(authSelectors.signInbutton).click();
});
