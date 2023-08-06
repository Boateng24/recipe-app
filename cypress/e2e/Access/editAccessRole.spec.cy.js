import { HRSelectors } from "../../selectors/hrSelectors";
import { faker } from "@faker-js/faker";

describe("Perform edit actions for access role", () => {
  it("should delete an access role", () => {
    cy.AdminLogin();
    // cy.get(HRSelectors.accordionIcon).eq(0).click();
    cy.contains(HRSelectors.settingsTab, { matchCase: false }).click();
    cy.get("div.v-list-item-title").eq(11).click();
    cy.get("svg[id='dotIcon']").last().click();
    cy.get("[class='v-list-item__content']").eq(15).click()
    cy.get('input[placeholder="Role Title"]').clear().type(faker.person.jobArea() + " " + 'Role');
    cy.get("[type='button']").last().click();
  });
});
