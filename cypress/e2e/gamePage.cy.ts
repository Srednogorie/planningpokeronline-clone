/// <reference types="cypress"/>

import {Timestamp} from "@firebase/firestore";

context("Home Page", () => {
    // beforeEach(() => {
    //   cy.visit("http://localhost:3000")
    // });

    it("should render a game with 3 players", () => {
        // Create game
        const gameName = Math.random().toString(36).slice(2, 15)
        cy.callFirestore('add', 'games', {
            created: Timestamp.now(),
            name: gameName,
            players: ["PlayerOne", "PlayerTwo"],
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

            // Set cookie as will the name page. We didn't include the PlayerThree in the game but this doesn't
            // matter as we set cookie which means they will be included when we request the game page anyway.
            cy.setCookie(`${gameId}__Na`, "PlayerThree")

            // Visit game. For the sake of simplicity
            cy.visit(`http://localhost:3000/${gameId}`)
            // Assert the user is redirected to the game
            cy.wait(2000)
            // Assert PlayerOne is in the game
            cy.get('[id="0"]').contains("PlayerOne")
            // Assert PlayerTwo is in the game
            cy.get('[id="1"]').contains( "PlayerTwo")
            // Assert PlayerThree is in the game
            cy.get('[id="2"]').contains("PlayerThree")
            // Delete game
            cy.callFirestore('delete', 'games', {
                where: ['name', '==', gameName],
            })
            cy.wait(2000)
            // Assert once deleted the game will reset to home screen
            cy.url().should('equal', `http://localhost:3000/`)
        })
    })
    it("should render a game with 8 players", () => {
        // Create game
        const gameName = Math.random().toString(36).slice(2, 15)
        cy.callFirestore('add', 'games', {
            created: Timestamp.now(),
            name: gameName,
            players: ["One", "Two", "Three", "Four", "Five", "Six", "Seven"],
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

            // Set cookie as will the name page. We didn't include the PlayerThree in the game but this doesn't
            // matter as we set cookie which means they will be included when we request the game page anyway.
            cy.setCookie(`${gameId}__Na`, "Eight")

            // Visit game. For the sake of simplicity
            cy.visit(`http://localhost:3000/${gameId}`)
            // Assert the user is redirected to the game
            cy.wait(2000)
            // Assert all players are in the game
            cy.get('[id="0"]').contains("One")
            cy.get('[id="1"]').contains( "Two")
            cy.get('[id="2"]').contains("Three")
            cy.get('[id="3"]').contains("Four")
            cy.get('[id="4"]').contains("Five")
            cy.get('[id="5"]').contains("Six")
            cy.get('[id="6"]').contains("Seven")
            cy.get('[id="7"]').contains("Eight")
            // Delete game
            cy.callFirestore('delete', 'games', {
                where: ['name', '==', gameName],
            })
            cy.wait(2000)
            // Assert once deleted the game will reset to home screen
            cy.url().should('equal', `http://localhost:3000/`)
        })
    })
    it.only("should redirect to home page if the game is full", () => {
        // Create game
        const gameName = Math.random().toString(36).slice(2, 15)
        cy.callFirestore('add', 'games', {
            created: Timestamp.now(),
            name: gameName,
            players: ["One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight"],
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

            // Visit the name page. GetServerSideProps are shared between game and name, if the game is full it doesn't
            // matter if we request the name or the game page but this test will cover requesting the name page, this
            // will also not require setting cookie.
            cy.visit(`http://localhost:3000/${gameId}/name`)
            cy.wait(2000)
            // Assert the user is redirected to home page
            cy.url().should('equal', `http://localhost:3000/`)
            cy.wait(2000)
            // Delete game
            cy.callFirestore('delete', 'games', {
                where: ['name', '==', gameName],
            })
        })
    })
})

export {}
