/// <reference types="cypress"/>

context("Home Page", () => {
  // beforeEach(() => {
  //   cy.visit("http://localhost:3000")
  // });

  it("should create a game and redirect for choosing name", () => {
    cy.visit("http://localhost:3000")
    // Generate random game name
    const gameName = Math.random().toString(36).slice(2, 15)
    // Type game name
    cy.get('[name="game_name"]').type(gameName)
    // Submit the form
    cy.get('button').click()
    // Assert the user is redirected
    cy.url().should('include', '/name')
    // Assert the game is created
    cy.callFirestore('get', 'games', {
      where: ['name', '==', gameName],
    }).then((results) => {
      cy.log('get respond', results[0].id)
      expect(results).to.exist
      expect(results).to.have.length(1)
    })
    // Delete the game
    cy.callFirestore('delete', 'games', {
      where: ['name', '==', gameName],
    })
  })
})

export {}
