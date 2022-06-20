/// <reference types="Cypress" />

describe("HomePage Body Notes renders", () => {
    beforeEach(() => {
        cy.visit("/");

    })

    it("the answer to the question of how many titles are 5 ?", () => {
        cy.get(".home-body-part")
            .find("li").should("have.length", 5)
    });

    it("react notları link is working?", () => {
        cy.get(".home-body-part")
            .find("li")
            .contains("React Notları")
            .click()
        
        cy.url().should("equal","http://localhost:3000/react")
    });

    it("seo notları link is working?", () => {
        cy.get(".home-body-part")
            .find("li")
            .contains("SEO Notları")
            .click()
        
        cy.url().should("equal","http://localhost:3000/seo")
    });
});