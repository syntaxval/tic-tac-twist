"use strict"


/* global describe it */


var

    // needed modules
    assert = require("assert"),
    Board = require("../src/classes/Board")






// instantiate Board with valid/invalid sizes
describe("Board instantiation.", () => {

    const errorMessage = "Invalid board size."


    // valid
    describe("3x3 Board size", () => {
        const board3x3 = new Board(3)

        it("should be valid", () =>
            assert.ok(
                board3x3.size === 3
            )
        )
    })


    // valid
    describe("10x10 Board size", () => {
        const board10x10 = new Board(10)

        it("should be valid", () =>
            assert.ok(
                board10x10.size === 10
            )
        )
    })


    // invalid
    describe("2x2 Board size", () => {

        it("should fail with argument out of lower bounds", () =>
            assert.throws(
                () => new Board(2),
                Error,
                errorMessage
            )
        )
    })


    // invalid
    describe("11x11 Board size", () => {

        it("should fail with argument out of upper bounds", () =>
            assert.throws(
                () => new Board(11),
                Error,
                errorMessage
            )
        )
    })


    // invalid argument type
    describe("✹x✹ Board size", () => {

        it("should fail with invalid argument type", () =>
            assert.throws(
                () => new Board("✹"),
                Error,
                errorMessage
            )
        )
    })




})




// instance methods
describe("Instance methods.", () => {

    var board = new Board(5)


    // ...
    describe("Empty Board", () => {

        it("should return true on isEmpty check", () => {
            assert.ok(board.isEmpty())
        })

    })


    // ...
    describe("Insert Symbol at 0", () => {

        it("should return true", () => {
            assert.ok(board.insert("✹", 0))
        })

        it("should return false on already occupied cell", () => {
            assert.ok(!board.insert("✹", 0))
        })

        it("should return false on out of bounds index", () => {
            assert.ok(!board.insert("✹", 200))
        })

    })

})
