"use strict"


/* global describe it */


const

    // needed modules
    assert = require("assert"),
    Game = require("../src/classes/Game"),
    Human = require("../src/classes/Human"),
    Computer = require("../src/classes/Computer"),
    config = require("../config"),
    Board = require("../src/classes/Board"),
    utils = require("../src/utils")




// instantiate Board with valid/invalid sizes
describe("Test Game methods.", () => {
    const game = new Game(
        new Board(),
        [
            new Computer(
                "Zalgo",
                config.symbols.computer,
                utils.prompt.magenta
            ),
            new Human(
                "Brent",
                config.symbols.player1,
                utils.prompt.blue
            ),
            new Human(
                "Josh",
                config.symbols.player2,
                utils.prompt.green
            ),
        ]
    )


    describe("Finding best move for the computer", () => {

        it("should return best move index.", () =>
            assert.ok(
                typeof game.findBestMove() === "number"
            )
        )
    })


    describe("Valid input", () => {

        it("should be valid.", () =>
            assert.ok(
                game.inputFormatValid("2,2")
            )
        )

    })


    describe("Invalid input", () => {

        it("should be invalid.", () =>
            assert.ok(
                !game.inputFormatValid("2.3")
            )
        )

    })


    describe("Invalid in range", () => {

        it("should be valid.", () =>
            assert.ok(
                game.getPlayIndex("2,3") >= 0
            )
        )

    })


    describe("Invalid out of range", () => {

        it("should be invalid.", () =>
            assert.ok(
                game.getPlayIndex("23,33") < 0
            )
        )

    })




})
