// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


Cypress.Commands.add('getLoggedIn',()=>{
    cy.intercept("GET","http://localhost:5000/authentication/loggedIn", {
        statusCode:200,
        body:[
            {
                isLogin:true
            }
        ]
    }).as("loggedIn")
});

Cypress.Commands.add("getById", (Id) => {
    cy.get(`[data-cy = ${Id}]`)
});

Cypress.Commands.add("getLastAdded", () => {
    cy.intercept("GET","http://localhost:5000/notes/list", {
        statusCode:200,
        fixture: "LastAdded.json"
    }).as("getLastAdded")
})