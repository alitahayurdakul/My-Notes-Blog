/// <reference types="Cypress" />

describe("React Notes Page renders", () => {
    beforeEach(() => {
        cy.getReactNotes();
        cy.visit("/react");
        cy.wait("@getReactNotes")
    });

    it("image src file is right?", () => {
        cy.get(".notes-part-header")
            .should("have.css", "background-image", 'url("http://localhost:3000/static/media/react.8887fc1e8ca4b52d9e4d.png")')
    });

    it("react notes lenght", () => {
        cy.get(".notes-part-left")
            .find("li")
            .should("have.length", "3");
    });

    it.only("react notes link is work", () => {
        cy.get(".notes-part-left")
            .find("li")
            .contains("React Router Dom").click();
        cy.url().should("include","/react-router-dom")
    });
})