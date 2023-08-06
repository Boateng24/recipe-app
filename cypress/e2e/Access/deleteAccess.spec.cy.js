import { HRSelectors } from "../../selectors/hrSelectors";

describe("Perform delete actions for access role", () => {
  it("delete access role", () => {
    cy.AdminLogin();
    // cy.get(HRSelectors.accordionIcon).eq(0).click();
    cy.contains(HRSelectors.settingsTab, { matchCase: false }).click();
    cy.get("div.v-list-item-title").eq(11).click();
    cy.get("svg[id='dotIcon']").last().click();
    cy.contains(" Delete ", { matchCase: false }).click();
    cy.get("[type='button']").last().click();
  });
});
