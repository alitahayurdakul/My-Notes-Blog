/// <reference types="Cypress" />

describe("HomePage About Me renders", () => {
    beforeEach(() => {
        cy.visit("/");
    })

    it("about us header ?", () => {
        cy.getById("about-me")
            .find("h2")
            .should("have.text","Hakkımda")
    });

    it("about us body ?", () => {
        cy.getById("about-me")
            .find("p")
            .should("have.text","TMS Tren Bakım Onarım şirketinde Full-Stack Developer olarak çalışıyorum. Bu sitenin yapılış amacı konu ile ilgili önemli notlarımı saklamaktır.")
    });


});