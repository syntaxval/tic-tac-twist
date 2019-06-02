"use strict"


/* global describe it */


const

    // needed modules
    assert = require("assert"),
    Human = require("../src/classes/Human"),
    Computer = require("../src/classes/Computer")




// instantiate Board with valid/invalid sizes
describe("Player instantiation.", () => {



    // human
    describe("Human player", () => {
        const human = new Human("John")

        it("with a name", () =>
            assert.ok(
                human.name === "John"
            )
        )
    })

    // computer
    describe("Computer player", () => {
        const computer = new Computer("HAL 9000")

        it("with a name", () =>
            assert.ok(
                computer.name === "HAL 9000 (AI)"
            )
        )
    })


})
