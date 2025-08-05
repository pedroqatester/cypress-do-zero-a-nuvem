describe('Central de atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('/src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')

  })
  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longText = Cypress._.repeat('teste', 20)

    cy.get('input[name="firstName"]')
    .as('firstName')
    .should('be.visible')
    .type('Pedro QA')
    cy.get('@firstName')
    .should('have.value', 'Pedro QA')

    cy.get('input[name="lastName"]')
    .as('lastName')
    .should('be.visible')
    .type('Autonomo')
    cy.get('@lastName')
    .should('have.value', 'Autonomo')

    cy.get('#email')
    .as('email')
    .should('be.visible')
    .type('pedro@cat.com.br')
    cy.get('@email')
    .should('have.value', 'pedro@cat.com.br')

    // cy.get('input[type="number"]')
    // .as('number')
    // .should('be.visible')
    // .type('13978796538')
    // cy.get('number')
    // .should('have.value', '13978796538')
    
    cy.get('#open-text-area')
    .as('openTextArea')
    .should('be.visible')
    .type(longText, { delay: 0 })
    cy.get('@openTextArea')
    .should('have.value', longText)

    cy.get('button[type="submit"]')
    .as('submitButton')
    .should('be.visible')
    .click()

    cy.get('.success')
    .should('be.visible')
    .and('contain', 'Mensagem enviada com sucesso.')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    const longText = Cypress._.repeat('teste', 20)
    
    cy.get('input[name="firstName"]')
    .as('firstName')
    .should('be.visible')
    .type('Pedro QA')

    cy.get('input[name="lastName"]')
    .as('lastName')
    .should('be.visible')
    .type('Autonomo')

    cy.get('#email')
    .as('email')
    .should('be.visible')
    .type('pedrocat,com.br')

    cy.get('#open-text-area')
    .as('openTextArea')
    .should('be.visible')
    .type(longText, { delay: 0 })
    cy.get('@openTextArea')
    .should('have.value', longText)

    cy.get('button[type="submit"]')
    .as('submitButton')
    .should('be.visible')
    .click()

    cy.get('.error')
    .should('be.visible')
  })
  it('campo telefone continua vazio quando preenchido com valor não numérico', () => {
    cy.get('input[type="number"]')
    .as('phone')
    .should('be.visible')
    .type('abcdefghij')
    cy.get('@phone')
    .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('input[type="checkbox"][value="phone"]')
    .as('phoneCheckbox')
    .should('be.visible')
    .check()

    cy.contains('button', 'Enviar')
    .as('submitButton')
    .should('be.visible')
    .click()

    cy.get('.error')
    .should('be.visible')

  })

  it('preenche e limpa os campos nome', () => {
    cy.get('input[name="firstName"]')
    .as('firstName')
    .should('be.visible')
    .type('Pedro QA')
    .should('have.value', 'Pedro QA')
    .clear()
    cy.get('@firstName')
    .should('have.value', '')

  })
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.contains('button', 'Enviar')
    .as('submitButton')
    .should('be.visible')
    .click()
    cy.get('.error')
    .should('be.visible')
    .and('contain', 'Valide os campos obrigatórios!')
  })

  it('envia o formulário com sucesso usando um comando customizado', () => {
    // const data = {
    //   firstName: 'Pedro QA',
    //   lastName: 'Autonomo',
    //   email: 'pedro@teste.com',
    //   text: 'teste'
    // }
    
    cy.fillMandatoryFieldsAndSubmit()
    cy.get('.success')
    .should('be.visible')
    .and('contain', 'Mensagem enviada com sucesso.')
  })
  it('envia formulario vazio e válida mensagem de erro', () => {
    cy.fillInFieldsAndValidateErrorMessage()
    cy.get('.error')
    .should('be.visible')
    .and('contain', 'Valide os campos obrigatórios!')    

  })
  it('Seleciona um produto (Blog) por seu texto', () => {
    cy.get('select#product')
    .as('productSelect')
    .should('be.visible')
    .select('Blog')
    cy.get('@productSelect')
    .should('have.value', 'blog')
  })
  it('Seleciona um produto (YouTube) por seu indice', () => {
    cy.get('select#product')
    .as('productSelect')
    .should('be.visible')
    .select(4)
    cy.get('@productSelect')
    .should('have.value', 'youtube')
  })
  it('marca o tipo de atendimento "Elogio"', () => {
    cy.get('input[type="radio"][value="elogio"]')
    .as('feedbackRadio')
    .should('be.visible')
    .check()
    cy.get('@feedbackRadio')
    .should('be.checked')
  })
  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
    .should('have.length', 3)
    .each(($typeOfService) => {
      cy.wrap($typeOfService)
      .check()
      cy.wrap($typeOfService)
      .should('be.checked')
    })
  })
  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
    .should('have.length', 2)
    .each(($checkbox) => {
      cy.wrap($checkbox)
      .check()
      cy.wrap($checkbox)
      .should('be.checked')
    })
    cy.get('input[type="checkbox"]')
    .last()
    .uncheck()
    cy.get('input[type="checkbox"]')
    .last()
    .should('not.be.checked')
  })
  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[type="file"]')
    .as('fileInput')
    .should('be.visible')
    .selectFile('./cypress/fixtures/example.json')
    .should(input => {
      expect(input[0].files[0].name).to.equal('example.json')
    })
  })
  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('input[type="file"]')
    .as('fileInput')
    .should('be.visible')
    .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
    .should(input => {
      expect(input[0].files[0].name).to.equal('example.json')
    })
  })
  it('seleciona um arquivo utilizando uma fixture para qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile')

    cy.get('input[type="file"]')
    .as('fileInput')
    .should('be.visible')
    .selectFile('@sampleFile')
    .should(input => {
      expect(input[0].files[0].name).to.equal('example.json')
    })
  })
  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade')
    .should('have.attr', 'href', 'privacy.html')
    .and('have.attr', 'target', '_blank')
  })
  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
    .should('have.attr', 'href', 'privacy.html')
    .invoke('removeAttr', 'target')
    .click()

    cy.url()
    .should('include', 'privacy.html')

    cy.contains('h1', 'CAC TAT - Política de Privacidade')
    .should('be.visible')
  })
})