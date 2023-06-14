import { HRSelectors } from "../../selectors/hrSelectors";
import { faker } from "@faker-js/faker";
import { format } from "date-fns";
import { genderData } from "../../fixtures/gender";
import countries from "../../fixtures/country_api";
import { countryCitizens } from "../../fixtures/citizenship";
import { civilStatus } from "../../fixtures/civilStatus";
import {
  accessLevel,
  employmentType,
  probationPeriod,
} from "../../fixtures/employment";
import { universities, courses } from "../../fixtures/education";
import { languages, proficiencyLevels } from "../../fixtures/language";

describe("Perform update actions on employees", () => {
  const getCitizenValues = Object.values(countryCitizens);
  let gender = genderData[Math.floor(Math.random() * genderData.length)];
  let country = countries[Math.floor(Math.random() * countries.length)].name;
  let citizen =
    getCitizenValues[Math.floor(Math.random() * getCitizenValues.length)];
  let maritalstatus =
    civilStatus[Math.floor(Math.random() * civilStatus.length)];
  let typeofEmployment =
    employmentType[Math.floor(Math.random() * employmentType.length)];
  let probationTime =
    probationPeriod[Math.floor(Math.random() * probationPeriod.length)];
  let employeeAccess =
    accessLevel[Math.floor(Math.random() * accessLevel.length)];
  let university =
    universities[Math.floor(Math.random() * universities.length)].name;
  let course = courses[Math.floor(Math.random() * courses.length)].courseName;
  let language = languages[Math.floor(Math.random() * languages.length)];
  let proficiencyLevel =
    proficiencyLevels[Math.floor(Math.random() * proficiencyLevels.length)];

  const startDate = format(faker.date.past(), "yyyy-MM-dd");
  const endDate = format(faker.date.future(), "yyyy-MM-dd");
  const birthday = format(faker.date.birthdate(), "yyyy-MM-dd");
  it("edits employee information", () => {
    // login and individual employee page
    cy.AdminLogin();
    cy.wait(3000);
    cy.reload();
    cy.get(HRSelectors.accordionIcon).eq(0).click();
    cy.get(".v-list-item-title").eq(2).click();
    cy.get(".v-list-item-title").eq(3).click();
    cy.url().should("contain", "/employees");
    cy.get("tbody[data-v-5f9f8757]>:nth-child(3)").click();

    //  Personal Info section
    cy.contains("Edit Profile", { matchCase: false }).click({ force: true });
    cy.get('[name="5"]').type(birthday.toString());
    cy.get('[placeholder="Select gender"]').select(gender);
    cy.get('[placeholder="Select country"]').select(country);
    cy.get('[placeholder="Select citizenship"]').select(citizen);
    cy.get('[placeholder="Select civil status"]').select(maritalstatus);
    cy.get("button[data-v-50b16f5d]").click();
    cy.contains("Employee information updated successfully", {
      matchCase: false,
    }).should("exist");

    // contact section
    cy.get("button.tab-button").eq(1).click();
    cy.get("input#5").clear().type(faker.phone.number());
    cy.get("input#6").clear().type(faker.internet.email());
    cy.get("input#8").clear().type(faker.location.zipCode());
    cy.get("button[data-v-50b16f5d]").click();

    // employment section
    cy.get("button.tab-button").eq(2).click();
    cy.get("[placeholder='Select employment type']").select(typeofEmployment);
    cy.get("[placeholder='Select probation period']").select(probationTime);
    cy.get("[placeholder='Add access level']").select(employeeAccess);
    cy.get("span[data-v-50b16f5d]").eq(0).click();
    cy.get("button[data-v-50b16f5d]").eq(2).click();

    // Qualification section
    //  education
    cy.get("span[data-v-50b16f5d]").eq(0).click();
    cy.get('input[id="input-field"]')
      .eq(0)
      .invoke("removeAttr", "disabled")
      .type(university);
    cy.get('input[id="input-field"]').eq(1).type(course);
    cy.get("button[data-v-50b16f5d]").eq(4).click();

    // language
    cy.get("span[data-v-50b16f5d]").eq(1).click();
    cy.get("select[data-v-4d86c427]").select(language);
    cy.get("select[data-v-3a2a3aa8]").eq(0).select(proficiencyLevel);
    cy.get("select[data-v-3a2a3aa8]").eq(1).select(proficiencyLevel);
    cy.get("select[data-v-3a2a3aa8]").eq(2).select(proficiencyLevel);
    cy.get("button[data-v-50b16f5d]").eq(4).click();
    cy.contains("User language added successfully", {
      matchCase: false,
    }).should("exist");

    //  experience
    cy.get("button[data-v-50b16f5d]").eq(2).click();
    cy.get('input[placeholder="ICON"]').type(faker.company.name());
    cy.get('input[placeholder="Cologne"]').type(faker.location.city());
    cy.get('input[placeholder="Solution Architect"]').type(
      faker.person.jobTitle()
    );
    cy.get("input[data-v-0b993928]").eq(0).type(startDate.toString());
    cy.get("#end-date").type(endDate.toString());
    cy.get("button[data-v-50b16f5d]").eq(4).click();
    cy.contains("User professional experience added successfully", {
      matchCase: false,
    }).should("exist");
  });
});
