import { faker } from "@faker-js/faker";
import { HRSelectors } from "../../selectors/hrSelectors";

describe("Create a new access role", () => {
  it("add a new access role to the system by admin", () => { 
    cy.AdminLogin();
    // cy.get(HRSelectors.accordionIcon).eq(0).click()
    cy.contains(HRSelectors.settingsTab, { matchCase: false }).click();
    cy.get("div.v-list-item-title").eq(11).click();
    cy.get("button[data-v-50b16f5d]").click();
    cy.get('input[placeholder="Role Title"]').type(faker.person.jobArea());


    // Employee module roles
    cy.get(".access_level>:nth-child(1)>:nth-child(3)").eq(0).click();
    cy.get(".access_level>:nth-child(1)>:nth-child(2)").eq(1).click();
    cy.get(".access_level>:nth-child(1)>:nth-child(2)").eq(2).click();
    cy.get(".access_level>:nth-child(1)>:nth-child(2)").eq(3).click();
    cy.get(".access_level>:nth-child(1)>:nth-child(2)").eq(4).click();
    cy.get(".access_level>:nth-child(1)>:nth-child(2)").eq(5).click();

    // // Leave module roles
    cy.get(".access_level>:nth-child(1)>:nth-child(3)").eq(6).click();
    cy.get(".access_level>:nth-child(1)>:nth-child(2)").eq(7).click();
    cy.get(".access_level>:nth-child(1)>:nth-child(2)").eq(8).click();
    cy.get(".access_level>:nth-child(1)>:nth-child(2)").eq(9).click();

    // Experts & Partners module
    // Experts
    cy.get(".access_level>:nth-child(1)>:nth-child(3)").eq(10).click();
    cy.get(".access_level>:nth-child(1)>:nth-child(3)").eq(11).click();
    cy.get(".access_level>:nth-child(1)>:nth-child(2)").eq(12).click();
    cy.get(".access_level>:nth-child(1)>:nth-child(2)").eq(13).click();
    cy.get(".access_level>:nth-child(1)>:nth-child(2)").eq(14).click();
    cy.get(".access_level>:nth-child(1)>:nth-child(2)").eq(15).click();

    // Partners
    cy.get(".access_level>:nth-child(1)>:nth-child(3)").eq(16).click();
    cy.get(".access_level>:nth-child(1)>:nth-child(2)").eq(17).click();
    cy.get(".access_level>:nth-child(1)>:nth-child(2)").eq(18).click();
    cy.get(".access_level>:nth-child(1)>:nth-child(2)").eq(19).click();
    cy.get(".access_level>:nth-child(1)>:nth-child(2)").eq(20).click();
    cy.get(".access_level>:nth-child(1)>:nth-child(2)").eq(21).click();


    // Projects
    cy.get(".access_level>:nth-child(1)>:nth-child(3)").eq(22).click();
    cy.get(".access_level>:nth-child(1)>:nth-child(2)").eq(23).click();
    cy.get(".access_level>:nth-child(1)>:nth-child(2)").eq(24).click();
    cy.get(".access_level>:nth-child(1)>:nth-child(2)").eq(25).click();
    cy.get("button[data-v-50b16f5d]").click();
  });
});
