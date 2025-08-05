Cypress.Commands.add('fillMandatoryFieldsAndSubmit', (data = {
    firstName: 'Pedro QA',
    lastName: 'Autonomo',
    email: 'pedro@teste.com',
    text: 'Teste de mensagem'
}) => {
    cy.get('input[name="firstName"]')
    .as('firstName')
    .should('be.visible')
    .type(data.firstName)
    cy.get('@firstName')
    .should('have.value', data.firstName)

    cy.get('input[name="lastName"]')
    .as('lastName')
    .should('be.visible')
    .type(data.lastName)
    cy.get('@lastName')
    .should('have.value', data.lastName)

    cy.get('#email')
    .as('email')
    .should('be.visible')
    .type(data.email)
    cy.get('@email')
    .should('have.value', data.email)

    cy.get('#open-text-area')
    .as('openTextArea')
    .should('be.visible')
    .type(data.text)
    cy.get('@openTextArea')
    .should('have.value', data.text)


    cy.get('button[type="submit"]')
    .as('submitButton')
    .should('be.visible')
    .click()

})
Cypress.Commands.add('fillInFieldsAndValidateErrorMessage', () => {
    cy.get('button[type="submit"]')
    .as('submitButton')
    .should('be.visible')
    .click()

})