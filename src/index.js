"use strict"




var Board = require("./classes/Board")

try {
    var board = new Board(3)

    board.insert("✹", "0")
    board.insert("✹", "3")
    board.insert("✹", "6")

} catch (error) {
    // eslint-disable-next-line no-console
    console.log(error.message)
}
