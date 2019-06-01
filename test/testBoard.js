"use strict"


/* global describe it */


var

    // needed modules
    assert = require("assert"),
    Board = require("../src/classes/Board")




// helper function
function declareWinner (cells, type, symbol) {

    const board3x3 = new Board(3)

    cells.forEach((idx) => board3x3.insert(symbol, idx))

    it("should return a winner", () => {
        assert.ok(JSON.stringify(
            board3x3.getOutcome()
        ) === JSON.stringify(
            {winner: {cells, symbol}, type, gameOver: true}
        ))
    })
}




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





describe("Instance methods.", () => {

    const board5x5 = new Board(5)


    // ...
    describe("Empty Board", () => {

        it("should return true on isEmpty check", () => {
            assert.ok(board5x5.isEmpty())
        })

    })


    // ...
    describe("Insert Symbol at 0", () => {

        it("should return true", () => {
            assert.ok(board5x5.insert("✹", 0))
        })

        it("should return false on already occupied cell", () => {
            assert.ok(!board5x5.insert("✹", 0))
        })

        it("should return false on out of bounds index", () => {
            assert.ok(!board5x5.insert("✹", 200))
        })

    })




    // ...
    describe("Get empty cells after insertions", () => {
        const board3x3 = new Board(3)
        board3x3.insert("x", 0)
        it("should return remaining empty cells", () => {
            assert.ok(JSON.stringify(
                board3x3.getEmptyCells()
            ) === JSON.stringify(
                [1,2,3,4,5,6,7,8]
            ))
        })
    })




    // ...
    describe(
        "We have a row winner",
        () => declareWinner([0,1,2], "row", "✹")
    )




    // ...
    describe(
        "We have a column winner",
        () => declareWinner([0,3,6], "column", "x")
    )




    // ...
    describe(
        "We have a diagonal winner",
        () => declareWinner([0,4,8], "diagonal", "@")
    )




    // ...
    describe("Game is ongoing", () => {
        const board3x3 = new Board(3)
        board3x3.insert("x", 0)
        it("should return proper object", () => {
            assert.ok(JSON.stringify(
                board3x3.getOutcome()
            ) === JSON.stringify(
                { winner: {}, gameOver: false }
            ))
        })
    })


})
