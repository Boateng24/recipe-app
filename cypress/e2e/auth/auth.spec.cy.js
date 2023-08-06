import { authSelectors } from "../../selectors/authSelectors";
import authData from '../../fixtures/authdata.json';
import { iconUrls} from "../../urls/urls";

describe('login page tests', () => {
  it('it should successfully visit the login page', () => {
    cy.visit(iconUrls.loginUrl)
    cy.contains(authSelectors.loginHeading).should("exist")
    cy.get(authSelectors.welcomeText).should("exist")
  })

  it('it should successfully sign in a registered user with valid email and password', () => {
    cy.visit(iconUrls.loginUrl)
    cy.get(authSelectors.emailId).type(authData.email)
    cy.get(authSelectors.passwordId).type(authData.password)
    cy.get(authSelectors.signInbutton).click();
    cy.url().should('eq', iconUrls.homeUrl)
  })
  it('it should successfully sign in a registered user with valid username and password', () => {
    cy.visit(iconUrls.loginUrl)
    cy.get(authSelectors.emailId).type(authData.username)
    cy.get(authSelectors.passwordId).type(authData.password)
    cy.get(authSelectors.signInbutton).click();
    cy.url().should('eq', iconUrls.homeUrl)
  })

  it('should prompt for required field for the username or email input field', () => {
    cy.visit(iconUrls.loginUrl);
    cy.get(authSelectors.passwordId).type(authData.password);
    cy.get(authSelectors.signInbutton).click();
    cy.get(authSelectors.requiredEmailError)
      .should("have.text", "This field is required", { matchCase: false })
      .and("have.css", "color", "rgb(239, 68, 68)");
  })

  it('should prompt for required field for the password input field', () => {
    cy.visit(iconUrls.loginUrl);
    cy.get(authSelectors.emailId).type(authData.email);
    cy.get(authSelectors.signInbutton).click();
    cy.get(authSelectors.requiredPasswordError)
      .should("have.text", "This field is required", { matchCase: false })
      .and("have.css", "color", "rgb(239, 68, 68)");
  })

  it('should prompt for Invalid credentials error when an unregistered email is used with a valid password', () => {
    cy.visit(iconUrls.loginUrl);
    cy.get(authSelectors.emailId).type(authData.invalidEmail);
    cy.get(authSelectors.passwordId).type(authData.password);
    cy.get(authSelectors.signInbutton).click();
    cy.contains(authSelectors.credentialError, { matchCase: false })
      .should("exist")
      .and("have.css", "color", "rgb(239, 68, 68)");
  })
  it('should prompt for Invalid credentials error when a registered email is used with an invalid password', () => {
    cy.visit(iconUrls.loginUrl);
    cy.get(authSelectors.emailId).type(authData.email);
    cy.get(authSelectors.passwordId).type(authData.invalidPassword);
    cy.get(authSelectors.signInbutton).click();
    cy.contains(authSelectors.credentialError, { matchCase: false })
      .should("exist")
      .and("have.css", "color", "rgb(239, 68, 68)");
  })
})