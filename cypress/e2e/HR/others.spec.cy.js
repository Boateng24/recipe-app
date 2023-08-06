import { HRSelectors } from "../../selectors/hrSelectors";
import authdata from "../../fixtures/authdata.json";
import {
  position,
  companies,
  employmentType,
  teams,
  employeeStatus
} from "../../fixtures/employment";

describe("Other functionalities on employees module", () => {
  let typeofEmployment =
    employmentType[Math.floor(Math.random() * employmentType.length)];
  let userPosition = position[Math.floor(Math.random() * position.length)];
  let company = companies[Math.floor(Math.random() * companies.length)];
  let team = teams[Math.floor(Math.random() * teams.length)];
  let status = employeeStatus[Math.floor(Math.random() * employeeStatus.length)]
  it("deletes an existing employeee", () => {
    cy.AdminLogin();
    cy.wait(3000);
    cy.reload();
    // cy.get(HRSelectors.accordionIcon).eq(0).click();
    cy.get(".v-list-item-title").eq(2).click();
    cy.get(".v-list-item-title").eq(3).click();
    cy.url().should("contain", "/employees");
    cy.get(".v-icon--clickable").eq(3).click();
    cy.contains("Delete User", { matchCase: false }).click();
    cy.contains("span", "Yes , delete").click();
  });

  it("deactivates an existing employeee's account", () => {
    cy.AdminLogin();
    cy.wait(3000);
    cy.reload();
    // cy.get(HRSelectors.accordionIcon).eq(0).click();
    cy.get(".v-list-item-title").eq(2).click();
    cy.get(".v-list-item-title").eq(3).click();
    cy.url().should("contain", "/employees");
    cy.get(".v-icon--clickable").eq(6).click();
    cy.contains("Deactivate Account", { matchCase: false }).click();
    cy.contains("span", "Yes , deactivate").click();
    cy.contains("User status updated successfully", {
      matchCase: false,
    }).should("exist");
  });
  it("activates a deactivated employeee's account", () => {
    cy.AdminLogin();
    cy.wait(3000);
    cy.reload();
    // cy.get(HRSelectors.accordionIcon).eq(0).click();
    cy.get(".v-list-item-title").eq(2).click();
    cy.get(".v-list-item-title").eq(3).click();
    cy.url().should("contain", "/employees");
    cy.get('.select').eq(4).select('Inactive');
    cy.get(".v-icon--clickable").eq(6).click();
    cy.contains("Activate", { matchCase: false }).click();
    cy.contains("span", "Activate").click();
    cy.contains("User status updated successfully", {
      matchCase: false,
    }).should("exist");
  });

  it("reset employee password by admin", () => {
    cy.AdminLogin();
    cy.wait(3000);
    cy.reload();
    // cy.get(HRSelectors.accordionIcon).eq(0).click();
    cy.get(".v-list-item-title").eq(2).click();
    cy.get(".v-list-item-title").eq(3).click();
    cy.url().should("contain", "/employees");
    cy.get(".v-icon--clickable").eq(7).click();
    cy.contains("Reset password", { matchCase: false }).click();
    cy.get('input[placeholder="Set a new password"]').type(
      authdata.newPassword
    );
    cy.get('input[placeholder="Confirm password"]').type(
      authdata.confirmPassword
    );
    cy.contains("span", "Reset Password", {matchCase:false}).click();
    cy.contains("Reset Password successfully", {
      matchCase: false,
    }).should("exist");
  });

  it("search for employees in the system", () => {
    cy.AdminLogin();
    cy.wait(3000);
    cy.reload();
    // cy.get(HRSelectors.accordionIcon).eq(0).click();
    cy.get(".v-list-item-title").eq(2).click();
    cy.get(".v-list-item-title").eq(3).click();
    cy.url().should("contain", "/employees");
    cy.get('input[placeholder="Search"]').type(authdata.defaultname);
  });

  it.only("search by filters", () => {
    cy.AdminLogin();
    cy.wait(3000);
    cy.reload();
    // cy.get(HRSelectors.accordionIcon).eq(0).click();
    cy.get(".v-list-item-title").eq(2).click();
    cy.get(".v-list-item-title").eq(3).click();
    cy.url().should("contain", "/employees");
    cy.get(".select").eq(0).select(userPosition);
    cy.get(".select").eq(1).select(company);
    cy.get(".select").eq(2).select(typeofEmployment);
    cy.get(".select").eq(3).select(team);
    cy.get(".select").eq(4).select(status);
  });
});
