/// <reference types="Cypress" />

describe("HomePage LastAdded contents", () => {
    beforeEach(() => {
        cy.getLastAdded();
        cy.visit("/");
        cy.wait("@getLastAdded")
    })

    it.skip("last added list's length is 2 when for is exist ?", () => {
        cy.get(".last-added")
        .find("li")
        .should("have.length","2")
        .contains("Redux Persist")
        .click();
        cy.url().should("include","/redux-persist")
    });

    it.skip("last added list's length is 2 when for is exist ?", () => {
        cy.get(".last-added")
        .find("li")
        .should("have.length","2")
        .contains("SEO")
        .should("not.exist")
    });



});