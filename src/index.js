"use strict"




var Board = require("./classes/Board")

try {
    var b3x3 = new Board(10)

    b3x3.print()

} catch (error) {
    // eslint-disable-next-line no-console
    console.log(error.message)
}
