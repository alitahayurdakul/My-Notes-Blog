/// <reference types="Cypress" />

describe("english-test page list", () => {
    beforeEach(() => {

        const userName = "ali5"
        const password = "totts8613"
        cy.request({
            method: "POST",
            url: "http://localhost:5000/authentication/sign-in",
            body: {
                userName,
                password
            }
        }).then(()=>{
            cy.visit("/english-test/list")
        })
        
    })
    // // it("english test page add real api",()=>{
    // //         cy.get(".add-button").click();
    // //         cy.get("#word").type("deneme")
    // //         cy.get("#optionA").type("ali")
    // //         cy.get("#optionB").type("change")
    // //         cy.get("#optionC").type("change")
    // //         cy.get("#correctAnswer").type("B")
    // //         cy.get("#exampleCentence").type("bu bir cümle")
    // //         cy.get("form").submit()
    // //         cy.get('[data-cy="responseMessage"]').should("have.class","alert-success")
    // // });

    it("english test list fake", () => {
        cy.intercept('GET','http://localhost:5000/english-test/list',{
            statusCode:200,
            fixture:"englishWord"
        })
    });

    // it.only("english test list fake api", () => {
    //     cy.intercept({
    //         method:'GET',
    //         url:'http://localhost:5000/english-test/list'
    //     }, {
    //         statusCode: 200,
    //         fixture:'englishWord.json' //body
    //     }).as("a");
    //     cy.visit("http://localhost:3000/english-test/list")
    //     cy.wait("@a",{timeout:5000}).should(({request,response}) =>  {
    //         cy.get("tbody").find("tr").should("have.length",response.body.length)
    //     })
    // });

    // it.only("english test list fake api", () => {
    //     cy.intercept("GET","http://localhost:3000/english-test/list",(req) => {
    //         req.url="http://localhost:3000/english-test/list"

    //         req.continue((res) => {
    //             expect(res.statusCode).to.equal(404)
    //         })
    //     }).as("a")
    // });

})