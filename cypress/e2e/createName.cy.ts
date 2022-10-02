/// <reference types="cypress"/>

import {Timestamp} from "@firebase/firestore";

context("Name Page", () => {
  it("should create a name and redirect to the game", () => {
    // Generate random game name
    const gameName = Math.random().toString(36).slice(2, 15)
    // Create game
    cy.callFirestore('add', 'games', {
      created: Timestamp.now(),
      name: gameName,
      players: [],
      turns: {
        1: {turnsRecord: {}, isFinished: false},
      }
    });
    // Assert game is created and get game id
    cy.callFirestore('get', 'games', {
      where: ['name', '==', gameName],
    }).then((results) => {
      const gameId = results[0].id
      expect(results).to.exist
      expect(results).to.have.length(1)

      // Visit name page
      cy.visit(`http://localhost:3000/${gameId}/name`)
      // Type name and press submit
      cy.get('[name="player_name"]').type("MyUserName")
      cy.get('button').click()
      // Assert the user is redirected to the game
      cy.wait(2000)
      cy.url().should('include', `/${gameId}`)
      cy.wait(3000)
      // Assert cookie is set
      cy.getCookie(`${gameId}__Na`).should('have.property', 'value', 'MyUserName')
      // Assert the user card is showing on the screen
      cy.get('[id="playerOne"]').should("have.text", "MyUserName")
      // Delete game
      cy.callFirestore('delete', 'games', {
        where: ['name', '==', gameName],
      })
      cy.wait(2000)
      // Assert once deleted the game will reset to home screen
      cy.url().should('equal', `http://localhost:3000/`)
    })
  })
  it("should return the player in the game if cookie and the player isn't already there", () => {
    // This will cover a case where the user, for example, accidentally closes their window. This would result
    // in their removal from the game. However, they still have the valid cookie, so they should be brought back.
    // Of course if meanwhile the game get full the user will be refused place despite having valid cookie. This will
    // be the case as long as there are no empty slots in the game.
    // Usually in such cases the user would request the game and not the name page but because getServerSideProps is
    // shared between the two pages we are making a check and if the user is requesting the name page, in addition
    // to bringing them back to game we are also redirecting them to the game page. Using shared server props can be a
    // bit confusing but in this particular case they overlap relatively well. The name page is a publicly available
    // page, so it makes sense for it to undergo the same checks that we do on the game page. For example, this will
    // not be valid on the index page where we still don't have the game created and any cookies set.
    // Generate random game name
    const gameName = Math.random().toString(36).slice(2, 15)
    // Create game
    cy.callFirestore('add', 'games', {
      created: Timestamp.now(),
      name: gameName,
      players: [],
      turns: {
        1: {turnsRecord: {}, isFinished: false},
      }
    });
    // Assert game is created and get game id
    cy.callFirestore('get', 'games', {
      where: ['name', '==', gameName],
    }).then((results) => {
      const gameId = results[0].id
      expect(results).to.exist
      expect(results).to.have.length(1)

      // Set cookie
      cy.setCookie(`${gameId}__Na`, "MyUserName")

      // Visit name page
      cy.visit(`http://localhost:3000/${gameId}/name`)
      // Assert the user is redirected to the game
      cy.wait(2000)
      cy.url().should('include', `/${gameId}`)
      cy.wait(2000)
      // Assert the user card is showing on the screen
      cy.get('[id="playerOne"]').should("have.text", "MyUserName")
      // Delete game
      cy.callFirestore('delete', 'games', {
        where: ['name', '==', gameName],
      })
      cy.wait(2000)
      // Assert once deleted the game will reset to home screen
      cy.url().should('equal', `http://localhost:3000/`)
    })
  })
})
