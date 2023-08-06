import { HRSelectors } from "../../selectors/hrSelectors";
import {faker} from '@faker-js/faker';

describe("HR configuration Task Areas tests", () => {
 it("adds a task area to the HR Configuration page by the admin", () => {
    cy.AdminLogin()
   //  cy.get(HRSelectors.accordionIcon).eq(0).click();
    cy.contains(HRSelectors.settingsTab, {matchCase:false}).click()
    cy.contains(HRSelectors.hrconfigTab, {matchCase:false}).click();
    cy.contains("span", "Add").parent('button').click();
    cy.contains("Add Task Area", {matchCase:false}).should('exist')
    cy.get(HRSelectors.taskInput).type(faker.word.noun())
    cy.get("[type='button']").last().click();
   //  cy.contains('Task Area added successfully', {matchCase:false}).should('exist')
 })

 it("edits a task area", () => {
    cy.AdminLogin()
   //  cy.get(HRSelectors.accordionIcon).eq(0).click();
    cy.contains(HRSelectors.settingsTab, {matchCase:false}).click()
    cy.contains(HRSelectors.hrconfigTab, {matchCase:false}).click();
    cy.get(HRSelectors.editIcon).first().click();
    cy.contains('Edit', {matchCase:false}).click();
    cy.get(HRSelectors.taskInput).clear().type(faker.word.noun());
    cy.contains('button', 'Update', {matchCase:false}).click();
   //  cy.contains('Task Area updated successfully', {matchCase:false}).should('exist');
 })

 it("delete a task area", () => {
   cy.AdminLogin();
   // cy.get(HRSelectors.accordionIcon).eq(0).click();
   cy.contains(HRSelectors.settingsTab, { matchCase: false }).click();
   cy.contains(HRSelectors.hrconfigTab, { matchCase: false }).click();
   cy.get(HRSelectors.editIcon).first().click();
   cy.contains("Delete", { matchCase: false }).click();
   cy.contains("button", "Replace and delete", { matchCase: false }).click();
   // cy.contains('Task Area deleted successfully', {matchCase:false}).should('exist');
 })
})