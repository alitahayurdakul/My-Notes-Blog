/// <reference types="Cypress" />

describe("asda",()=>{
    beforeEach(()=>{
        cy.visit("http://localhost:3000/")
        const userName="ali5"
        const password="totts8613"
        cy.request({
            method:"POST",
            url:"http://localhost:5000/authentication/sign-in",
            body:{
                userName,
                password
            }
        })
    })
    it("sadasd",()=>{
            cy.visit("http://localhost:3000/my-information")
    })

})