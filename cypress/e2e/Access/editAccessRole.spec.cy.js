import { HRSelectors } from "../../selectors/hrSelectors";
import { faker } from "@faker-js/faker";

describe("Perform edit actions for access role", () => {
  it("should delete an access role", () => {
    cy.AdminLogin();
    // cy.get(HRSelectors.accordionIcon).eq(0).click();
    cy.contains(HRSelectors.settingsTab, { matchCase: false }).click();
    cy.get("div.v-list-item-title").eq(11).click();
    cy.get("svg[data-v-2c033c97]").last().click();
    cy.get("div.v-list-item").eq(5).click();
    cy.get('input[placeholder="Role Title"]').clear().type(faker.person.jobArea() + " " + 'Role');
    cy.get("button[data-v-50b16f5d]").click();
  });
});
