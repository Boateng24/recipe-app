import { HRSelectors } from "../../selectors/hrSelectors";
import { faker } from "@faker-js/faker";
import {format} from 'date-fns';
import { genderData } from "../../fixtures/gender";
import countries from "../../fixtures/country_api";
import { countryCitizens } from "../../fixtures/citizenship";
import { civilStatus} from "../../fixtures/civilStatus";

describe("Perform crud operations for employees module", () => {
    const getCitizenValues = Object.values(countryCitizens)
    let gender = genderData[Math.floor(Math.random() * genderData.length)]
    let country = countries[Math.floor(Math.random() * countries.length)].name
    let citizen = getCitizenValues[Math.floor(Math.random() * getCitizenValues.length)]
    let maritalstatus = civilStatus[Math.floor(Math.random() * civilStatus.length)]
    const birthday = format(faker.date.birthdate(), "yyyy-MM-dd")
  it("creates or add employee to the platform", () => {
    // Personal information section
    cy.AdminLogin();
    cy.get(HRSelectors.accordionIcon).eq(0).click();
    cy.get(".v-list-item-title").eq(2).click();
    cy.get(".v-list-item-title").eq(3).click();
    cy.url().should("contain", "/employees");
    cy.get("[data-v-50b16f5d]").eq(0).click();
    cy.get('[name="1"]').type(faker.person.middleName())
    cy.get('[name="2"]').type(faker.person.firstName())
    cy.get('[name="3"]').type(faker.person.lastName())
    cy.get('[name="4"]').type(faker.person.middleName())
    cy.get('[name="5"]').type(birthday.toString())
    cy.get('[placeholder="Select gender"]').select(gender)
    cy.get('[placeholder="Select country"]').select(country);
    cy.get('[placeholder="Select citizenship"]').select(citizen);
    cy.get('[name="6"]').type(faker.internet.email());
    cy.get('[placeholder="Select civil status"]').select(maritalstatus);
    cy.get('[type="checkbox"]').check();
    cy.get("span[data-v-50b16f5d]").click();
    cy.contains("Personal information created successfully", {matchCase:false}).should("be.visible")

    // Contact information section
    cy.get('[placeholder="0343 1234 23"]').eq(0).type(faker.phone.number());
    cy.get('[placeholder="0343 1234 23"]').eq(1).type(faker.phone.number());
    cy.get('[name="6"]').eq(1).type(faker.internet.email());
    cy.get('#7').type(faker.location.streetAddress())
    cy.get('#8').type(faker.location.zipCode());
    cy.get('#9').type(faker.location.city());
    cy.get("select[data-v-4d86c427]").select(country);
    cy.get("span[data-v-50b16f5d]").eq(1).click();

    // Employment information section
  });
});
