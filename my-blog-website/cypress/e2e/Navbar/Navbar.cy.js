/// <reference types="Cypress" />

describe("navbar renders", () => {
    beforeEach(() => {
        cy.visit("/");
        // cy.wait("@loggedIn")
    })

    it("navbar brand is right?", () => {
        cy.get(".navbar-brand").should("have.text", "Ali'nin Notları")
    });

    it("navbar anasayfa link is working right?", () => {
        cy.get(".navbar");
        cy.get(".navbar-nav");
        cy.contains("AnaSayfa").click();
        cy.url().should("include", "/")
    });

    it("navbar react link is working right?", () => {
        cy.get(".navbar");
        cy.get(".navbar-nav");
        cy.contains("React").click();
        cy.url().should("include", "/react")
    });

    it("navbar nodejs link is working right?", () => {
        cy.get(".navbar");
        cy.get(".navbar-nav");
        cy.contains("Node.Js").click();
        cy.url().should("include", "/nodejs")
    });

    it("navbar Javascript link is working right?", () => {
        cy.get(".navbar");
        cy.get(".navbar-nav");
        cy.get("[data-cy='js']").click();
        cy.url().should("include", "/javascript")
    });

    it.skip("navbar React Native link is working right?", () => {
        cy.get(".navbar");
        cy.get(".navbar-nav");
        cy.contains("React Native").click();
        cy.url().should("include", "/react-native")
    });

    it("navbar SEO link is working right?", () => {
        cy.get(".navbar");
        cy.get(".navbar-nav");
        cy.contains("SEO").click();
        cy.url().should("include", "/seo")
    });

    it("navbar English Test link is working right?", () => {
        cy.get(".navbar");
        cy.get(".navbar-nav");
        cy.contains("İngilizce").click();
        cy.url().should("include", "/english-test")
    });

    it("when not log in, navbar user icon link's url includes login?", () => {

        cy.get(".navbar");
        cy.get(".footer-social");
        cy.getById("user-icon").click()
        cy.url().should("include", "sign-in")
    });

    it("when log in, navbar user icon link's url includes my-information?", () => {
        cy.getLoggedIn();
        cy.visit("/");
        cy.wait("@loggedIn");
        cy.get(".navbar");
        cy.get(".footer-social");
        cy.getById("user-icon").click()
        cy.url().should("include", "my-information")
    });

    it("when not log in, navbar logout icon link is not exist?", () => {
        cy.get(".navbar");
        cy.get(".footer-social");
        cy.getById("log-out").should("not.exist")
    });

    it("when log in, navbar logout icon link is exist?", () => {
        cy.getLoggedIn()
        cy.visit("/")
        cy.wait("@loggedIn")
        cy.get(".navbar");
        cy.get(".footer-social");
        cy.getById("log-out").should("exist")
    });

    it.only("when log in, navbar logout icon link is exist?", () => {
        cy.getLoggedIn();
        cy.visit("/");
        cy.wait("@loggedIn");
        cy.get(".navbar");
        cy.get(".footer-social");
        cy.getById("log-out").click()
            .should("not.exist")
    });

})