/// <reference types="Cypress" />

describe("HomePage Header contents", () => {
    beforeEach(() => {
        cy.visit("/");
    })

    it("header title content", () => {
        cy.getById("home-header")
            .contains("ALİ TAHA YURDAKUL").should("exist")
    });

    it("header background image src", () => {
        cy.getById("home-header")
            .should("have.css", "background-image", 'url("https://mdbcdn.b-cdn.net/img/Photos/Slides/img%20(15).webp")')
    });
})