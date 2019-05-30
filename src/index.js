"use strict"




var Board = require("./classes/Board")

try {
    var board = new Board(3)

    board.print().insert("✹", "0")
    board.print().insert("✹", "3")
    board.print().insert("✹", "6")
    board.print()

} catch (error) {
    // eslint-disable-next-line no-console
    console.log(error.message)
}
