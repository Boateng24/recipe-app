import { faker } from "@faker-js/faker";
import { HRSelectors } from "../../selectors/hrSelectors";

describe("Create a new access role", () => {
  it("add a new access role to the system by admin", () => { 
    cy.AdminLogin();
    // cy.get(HRSelectors.accordionIcon).eq(0).click()
    cy.contains(HRSelectors.settingsTab, { matchCase: false }).click();
    cy.get("div.v-list-item-title").eq(11).click();
    cy.get("[type='button']").eq(4).click();
    cy.get('input[placeholder="Role Title"]').type(faker.person.jobArea());


    // Employee module roles
    cy.get(".access_level>:nth-child(1)>:nth-child(3)").as('Canedit')
    cy.get('@Canedit').eq(0).click();
    cy.get(".access_level>:nth-child(1)>:nth-child(2)").as('Canview')
    cy.get('@Canview').eq(1).click();
    cy.get("@Canview").eq(2).click();
    cy.get("@Canview").eq(3).click();
    cy.get("@Canview").eq(4).click();
    cy.get("@Canview").eq(5).click();

    // // Leave module roles
    cy.get("@Canedit").eq(6).click();
    cy.get("@Canview").eq(7).click();
    cy.get("@Canview").eq(8).click();
    cy.get("@Canview").eq(9).click();

    // Experts & Partners module
    // Experts
    cy.get("@Canedit").eq(10).click();
    cy.get("@Canedit").eq(11).click();
    cy.get("@Canview").eq(12).click();
    cy.get("@Canview").eq(13).click();
    cy.get("@Canview").eq(14).click();
    cy.get("@Canview").eq(15).click();

    // Partners
    cy.get("@Canedit").eq(16).click({force:true});
    cy.get("@Canview").eq(17).click();
    cy.get("@Canview").eq(18).click();
    cy.get("@Canview").eq(19).click();
    cy.get("@Canview").eq(20).click();
    cy.get("@Canview").eq(21).click();


    // Projects
    cy.get("@Canedit").eq(22).click({force:true});
    cy.get("@Canview").eq(23).click();
    cy.get("@Canview").eq(24).click();
    cy.get("@Canview").eq(25).click();
    cy.get('[type="button"]').eq(5).click();
  });
});
