/// <reference types="Cypress" />

describe("english page list and update render", () => {

    beforeEach(() => {
        cy.Login().then(() => {
            cy.getEnglishWords();
            cy.visit("/english-test/list")
            cy.wait("@getEnglishWords")
        })
    });

    it.skip("list api is render", () => {
        cy.get("[data-test='table-body']").find("tr").should("have.length", "4")
    });

    it.skip("add button is working?", () => {
        cy.get(".datatable-page")
        cy.get(".add-button").click();
        cy.url().should("include", "/english-test/add")
    });

    it.skip("real api delete button is working and response message class", () => {
        cy.get("[data-test='table-body']")
            .find("button", "Soru Sil")
            .first()
            .click()
        cy.get(".alert-success").should("exist")
    });

    it.skip("real api update button is routing true url", () => {
        cy.get("[data-test='table-body']")
            .get(".update-button")
            .first()
            .click()
        cy.url().should("include", "/english-test/word/update")
    });

    it.skip("real api update operation", () => {
        cy.get("[data-test='table-body']")
            .get(".update-button")
            .first()
            .click()
        cy.get("#word").clear().type("words")
        cy.get("#optionA").clear().type("kelimeler")
        cy.get("form").submit()
        cy.get(".alert-success").should("have.text","Soru güncelleme işlemi başarılı")
    })

});