import { HRSelectors } from "../../selectors/hrSelectors";

describe("Perform delete actions for access role", () => {
  it("delete access role", () => {
    cy.AdminLogin();
    // cy.get(HRSelectors.accordionIcon).eq(0).click();
    cy.contains(HRSelectors.settingsTab, { matchCase: false }).click();
    cy.get("div.v-list-item-title").eq(11).click();
    cy.get("svg[data-v-2c033c97]").last().click();
    cy.contains("Delete", { matchCase: false }).click();
    cy.get("button[data-v-97ccaf3e]").click();
  });
});
