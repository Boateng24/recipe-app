import { HRSelectors } from "../../selectors/hrSelectors";
import { faker} from "@faker-js/faker";
import {format} from 'date-fns';
import { genderData } from "../../fixtures/gender";
import countries from "../../fixtures/country_api";
import { countryCitizens } from "../../fixtures/citizenship";
import { civilStatus} from "../../fixtures/civilStatus";
import { employmentType, probationPeriod, accessLevel, position, companies, teams, weeklyHours} from "../../fixtures/employment";
import {universities, courses} from '../../fixtures/education';
import { languages, proficiencyLevels } from "../../fixtures/language";
import { iconUrls } from "../../urls/urls";


describe("Add employee to the to the system", () => {
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
    cy.wait(3000);
    cy.reload();
    // cy.get(HRSelectors.accordionIcon).eq(0).click();
    cy.get(".v-list-item-title").eq(2).click();
    cy.get(".v-list-item-title").eq(3).click();
    cy.url().should("contain", "/employees");
    cy.get("[type='button']").last().click();
    cy.get('[name="1"]').type(faker.person.middleName());
    cy.get('[placeholder="Enter first name"]', { matchCase: false }).type(
      faker.person.firstName()
    );
    cy.get('[name="3"]').type(faker.person.lastName());
    cy.get('[name="4"]').type(faker.person.middleName());
    cy.get('[name="5"]').type(birthday.toString());
    cy.get('[placeholder="Select gender"]').select(gender);
    cy.get('[placeholder="Select country of birth"]').select(country);
    cy.get('[placeholder="Select citizenship"]').select(citizen);
    cy.get('[name="6"]').type(faker.internet.email());
    cy.get('[placeholder="Select civil status"]').select(maritalstatus);
    cy.get('[type="checkbox"]').check();
    cy.get("[data-cy='btn_saveAndContinue']").click();
    cy.contains("Personal information created successfully", {
      matchCase: false,
    }).should("exist");

    // Contact information section
    cy.get('[placeholder="Enter phone number"]').type(faker.phone.number());
    cy.get('[placeholder="Enter mobile number"]').type(faker.phone.number());
    cy.get("#emailAddress").type(faker.internet.email());
    cy.get("#emergencyPhone").type(faker.location.streetAddress());
    cy.get("#contact_postalCode").type(faker.location.zipCode());
    cy.get("#contact_City").type(faker.location.city());
    cy.get("#contact_Country>:nth-child(2)>:nth(0)").as("Country");
    cy.get("@Country").select(country);
    cy.get("[type='button']").last().click();

    // Employment information section
    cy.get("[placeholder='Select employment type']").select(typeofEmployment);
    cy.get("[placeholder='Select probation period']").select(probationTime);
    cy.get("[placeholder='Add access level']").select(employeeAccess);
    cy.contains("Add Position", { matchCase: false }).click();
    cy.get("[placeholder='Select a position']").select(userPosition);
    cy.get("[placeholder='Select a company']").select(company);
    cy.get("[placeholder='Select a team']").select(team);
    cy.get("#employment_workTime").type(hoursWorked);
    cy.get("#start-date").type(startDate.toString());
    cy.get("#end-date").type(endDate.toString());
    cy.get("[type='button']").last().click();
    cy.contains("Position added successfully", { matchCase: false }).should(
      "exist"
    );
    cy.get("[type='button']").last().click();
    cy.wait(5000);

    // Qualification section
    //  education
    cy.get("[type='button']").eq(4).click();
    cy.get("#institution")
      .eq(0)
      .invoke("removeAttr", "disabled")
      .type(university);
    cy.get("#course").type(course);
    cy.get("[type='button'").last().click();

    // language
    cy.get("[type='button']").eq(5).click();
    cy.get("[placeholder='Select language']").select(language);
    cy.get("[placeholder='Select reading proficiency']").select(
      proficiencyLevel
    );
    cy.get("[placeholder='Select speaking proficiency']").select(
      proficiencyLevel
    );
    cy.get("[placeholder='Select writing proficiency']").select(
      proficiencyLevel
    );
    cy.get("[type='button']").last().click();
    cy.contains("User language added successfully", {
      matchCase: false,
    }).should("exist");

    //  experience
    cy.get("[type='button']").eq(6).click();
    cy.get('input[placeholder="Enter company name"]').type(faker.company.name())
    cy.get('input[placeholder="Enter location name"]').type(faker.location.city())
    cy.get('input[placeholder="Enter job title"]').type(faker.person.jobTitle());
    cy.get("[type='date']").first().type(startDate.toString());
    cy.get('#end-date').type(endDate.toString())
    cy.get("[data-cy='btn_experience']").click()
     cy.contains("User professional experience added successfully", {
       matchCase: false,
     }).should("exist");
     cy.contains('span', 'Finish').parent('button').click();
     cy.url().should("eq", iconUrls.employeesUrl);
  });
});
