import { HRSelectors } from "../../selectors/hrSelectors";
import { faker, fake} from "@faker-js/faker";
import {format} from 'date-fns';
import { genderData } from "../../fixtures/gender";
import countries from "../../fixtures/country_api";
import { countryCitizens } from "../../fixtures/citizenship";
import { civilStatus} from "../../fixtures/civilStatus";
import { employmentType, probationPeriod, accessLevel, position, companies, teams, weeklyHours} from "../../fixtures/employment";
import {universities, courses} from '../../fixtures/education';
import { languages, proficiencyLevels } from "../../fixtures/language";


describe("Perform crud operations for employees module", () => {
    const getCitizenValues = Object.values(countryCitizens)
    let gender = genderData[Math.floor(Math.random() * genderData.length)]
    let country = countries[Math.floor(Math.random() * countries.length)].name
    let citizen = getCitizenValues[Math.floor(Math.random() * getCitizenValues.length)]
    let maritalstatus = civilStatus[Math.floor(Math.random() * civilStatus.length)]
    let typeofEmployment = employmentType[Math.floor(Math.random() * employmentType.length)]
    let probationTime = probationPeriod[Math.floor(Math.random() * probationPeriod.length)]
    let employeeAccess = accessLevel[Math.floor(Math.random() * accessLevel.length)]
    let userPosition = position[Math.floor(Math.random() * position.length)]
    let company = companies[Math.floor(Math.random() * companies.length)]
    let team = teams[Math.floor(Math.random() * teams.length)]
    let hoursWorked = weeklyHours[Math.floor(Math.random() * weeklyHours.length)]
    let university = universities[Math.floor(Math.random() * universities.length)].name
    let course = courses[Math.floor(Math.random() * courses.length)].courseName
    let language = languages[Math.floor(Math.random() * languages.length)]
    let proficiencyLevel = proficiencyLevels[Math.floor(Math.random() * proficiencyLevels.length)]

    const startDate = format(faker.date.past(), "yyyy-MM-dd");
    const endDate = format(faker.date.future(), "yyyy-MM-dd");
    const birthday = format(faker.date.birthdate(), "yyyy-MM-dd")
  it("creates or add employee to the platform", () => {
    // Personal information section
    cy.AdminLogin();
    cy.wait(3000)
    cy.reload()
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
    cy.contains("Personal information created successfully", {matchCase:false}).should("exist")

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
    cy.get("[placeholder='Select employment type']").select(typeofEmployment);
    cy.get("[placeholder='Select probation period']").select(probationTime);
    cy.get("[placeholder='Add access level']").select(employeeAccess)
    cy.contains('Add Position', {matchCase:false}).click()
    cy.get("select[data-v-4d86c427]").eq(1).select(userPosition);
    cy.get("select[data-v-4d86c427]").eq(2).select(company);
    cy.get("select[data-v-4d86c427]").eq(3).select(team);
    cy.get('#input-field').type(hoursWorked);
    cy.get('#start-date').type(startDate.toString());
    cy.get('#end-date').type(endDate.toString());
    cy.get("span[data-v-50b16f5d]").eq(3).click();
    cy.contains("Position added successfully", {matchCase:false}).should('exist')
    cy.get("span[data-v-50b16f5d]").eq(2).click();

    // Qualification section
      //  education
    cy.get("span[data-v-50b16f5d]").eq(0).click();
    cy.get('input[id="input-field"]').eq(0)
    .invoke('removeAttr', 'disabled')
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
    cy.contains("User language added successfully", { matchCase: false }).should(
       "exist"
     );

      //  experience
    cy.get("button[data-v-50b16f5d]").eq(2).click();
    cy.get('input[placeholder="ICON"]').type(faker.company.name())
    cy.get('input[placeholder="Cologne"]').type(faker.location.city())
    cy.get('input[placeholder="Solution Architect"]').type(faker.person.jobTitle());
    cy.get("input[data-v-0b993928]").eq(0).type(startDate.toString());
    cy.get('#end-date').type(endDate.toString())
    cy.get("button[data-v-50b16f5d]").eq(4).click();
     cy.contains("User professional experience added successfully", {
       matchCase: false,
     }).should("exist");
  });
});
