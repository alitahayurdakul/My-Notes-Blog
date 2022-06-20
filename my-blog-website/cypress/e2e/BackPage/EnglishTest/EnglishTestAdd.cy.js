/// <reference types="Cypress" />

describe("english page add render", () => {
    beforeEach(() => {
        cy.Login().then(() => {
            cy.visit("/english-test/add")
        })
    });

    it.skip("add button is exist and response Message is success after adding", () => {
        cy.get("#word").type("deneme2");
        cy.get("#optionA").type("yeni");
        cy.get("#optionB").type("eski");
        cy.get("#optionC").type("orta");
        cy.get("#correctAnswer").type("A");
        cy.get("#exampleCentence").type("this is new one");
        cy.get("form").submit();
        cy.get(".alert-success").should("have.text","Yeni soru başarıyla eklenmiştir.")
    });

    it("add button is exist and response Message is error after adding already exist word", () => {
        cy.get("#word").type("deneme2");
        cy.get("#optionA").type("yeni");
        cy.get("#optionB").type("eski");
        cy.get("#optionC").type("orta");
        cy.get("#correctAnswer").type("A");
        cy.get("#exampleCentence").type("this is new one");
        cy.get("form").submit();
        cy.get(".alert-danger").should("have.text","Böyle bir sorun zaten bulunmaktadır. Lütfen başka bir kelimeye ait soru ekleyiniz")
    });
})