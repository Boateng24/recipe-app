import { HRSelectors } from "../../selectors/hrSelectors";
import authdata from "../../fixtures/authdata.json";
import {
  position,
  companies,
  employmentType,
  teams,
} from "../../fixtures/employment";

describe("Other functionalities on employees module", () => {
  let typeofEmployment =
    employmentType[Math.floor(Math.random() * employmentType.length)];
  let userPosition = position[Math.floor(Math.random() * position.length)];
  let company = companies[Math.floor(Math.random() * companies.length)];
  let team = teams[Math.floor(Math.random() * teams.length)];
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
    cy.get("button[data-v-2b3c31b6]").click();
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
    cy.get("button[data-v-2b3c31b6]").click();
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
    cy.get(".v-icon--clickable").eq(6).click();
    cy.contains("Activate", { matchCase: false }).click();
    cy.get("button[data-v-2b3c31b6]").click();
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
    cy.get("button[data-v-50b16f5d]").eq(1).click();
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

  it("search by filters", () => {
    cy.AdminLogin();
    cy.wait(3000);
    cy.reload();
    // cy.get(HRSelectors.accordionIcon).eq(0).click();
    cy.get(".v-list-item-title").eq(2).click();
    cy.get(".v-list-item-title").eq(3).click();
    cy.url().should("contain", "/employees");
    cy.get("select[data-v-4d86c427]").eq(0).select(userPosition);
    cy.get("select[data-v-4d86c427]").eq(1).select(company);
    cy.get("select[data-v-4d86c427]").eq(2).select(typeofEmployment);
    cy.get("select[data-v-4d86c427]").eq(3).select(team);
  });
});
