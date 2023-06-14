import { authSelectors } from "../../selectors/authSelectors";
import authData from '../../fixtures/authdata.json';

describe('login page tests', () => {
  it('it should successfully visit the login page', () => {
    cy.visit('/')
    cy.contains(authSelectors.loginHeading).should("exist")
    cy.get(authSelectors.welcomeText).should("exist")
  })

  it('it should successfully sign in a registered user with valid email and password', () => {
    cy.visit('/')
    cy.get(authSelectors.emailId).type(authData.email)
    cy.get(authSelectors.passwordId).type(authData.password)
    cy.get(authSelectors.signInbutton).click();
    cy.get(authSelectors.welcomeUser).should('exist')
    cy.contains(authSelectors.welcomeMsg1,{matchCase:false}).should("exist");
    cy.contains(authSelectors.welcomeMsg2, {
      matchCase: false,
    }).should("exist");
  })
  it('it should successfully sign in a registered user with valid username and password', () => {
    cy.visit('/')
    cy.get(authSelectors.emailId).type(authData.username)
    cy.get(authSelectors.passwordId).type(authData.password)
    cy.get(authSelectors.signInbutton).click();
    cy.get(authSelectors.welcomeUser).should('exist')
    cy.contains(authSelectors.welcomeMsg1,{matchCase:false}).should("exist");
    cy.contains(authSelectors.welcomeMsg2, {
      matchCase: false,
    }).should("exist");
  })

  it('should prompt for required field for the username or email input field', () => {
    cy.visit('/');
    cy.get(authSelectors.passwordId).type(authData.password);
    cy.get(authSelectors.signInbutton).click();
    cy.get(authSelectors.requiredEmailError)
      .next()
      .should("have.text", "This field is required", { matchCase: false })
      .and("have.css", "color", "rgb(239, 68, 68)");
  })

  it('should prompt for required field for the password input field', () => {
    cy.visit('/');
    cy.get(authSelectors.emailId).type(authData.email);
    cy.get(authSelectors.signInbutton).click();
    cy.get(authSelectors.requiredPasswordError)
      .should("have.text", "This field is required", { matchCase: false })
      .and("have.css", "color", "rgb(239, 68, 68)");
  })

  it('should prompt for Invalid credentials error when an unregistered email is used with a valid password', () => {
    cy.visit('/');
    cy.get(authSelectors.emailId).type(authData.invalidEmail);
    cy.get(authSelectors.passwordId).type(authData.password);
    cy.get(authSelectors.signInbutton).click();
    cy.contains(authSelectors.credentialError, { matchCase: false })
      .should("exist")
      .and("have.css", "color", "rgb(239, 68, 68)");
  })
  it('should prompt for Invalid credentials error when a registered email is used with an invalid password', () => {
    cy.visit('/');
    cy.get(authSelectors.emailId).type(authData.email);
    cy.get(authSelectors.passwordId).type(authData.invalidPassword);
    cy.get(authSelectors.signInbutton).click();
    cy.contains(authSelectors.credentialError, { matchCase: false })
      .should("exist")
      .and("have.css", "color", "rgb(239, 68, 68)");
  })
})