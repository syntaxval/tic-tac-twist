"use strict"


/**
 * @desc Represents _Tic-Tac-Toe_ `Board`.
 */
class Board {


    /**
     * @param {Number} size Integer between 3 and 10 specifying the size of the `Board`
     */
    constructor (size = 3) {

        // allow only valid Board sizes
        if (typeof size !== "number" || size < 3 || size > 10) {
            throw new Error("Invalid Board size.")
        }


        // report the Board size
        this.size = size


        // report total number of "cells" on the `Board`
        this.cellCount = Math.pow(size, 2)


        // construct "empty" Board state
        this.state = []
        for (let i = 0; i < this.cellCount; i++) {
            this.state.push("")
        }
    }




    /**
     * Prints the `Board` in the terminal.
     * @returns {undefined}
     */
    print () {

        let boardElements = "\n"


        this.state.forEach((cell, index) => {

            // construct "cell" elements with vertical bars for each "row"
            boardElements += cell ? ` ${cell} ┃` : "   ┃"

            // detect "row" and construct it with horizontal bars as well
            if (
                index < (this.cellCount - (this.size)) &&
                    (index + 1) % this.size == 0
            )  {
                // clean up
                boardElements = boardElements.slice(0,-1)
                boardElements += "\n"
                // construct "row"
                let row = ""
                for (let i = 0; i < this.size; i++) {
                    row += "━━━┃"
                }
                // append constructed "row"
                boardElements += row.slice(0, -1) + "\n"
            }

        })


        // final clean up
        boardElements = boardElements.slice(0, -1) + "\n"


        // eslint-disable-next-line no-console
        console.log(boardElements)
    }




    /**
     * Checks whether the `Board` is empty.
     * @returns {boolean}
     */
    isEmpty () {
        return this.state.every((cell) => !cell)
    }




    /**
     * Checks whether the `Board` is full.
     * @returns {boolean}
     */
    isFull () {
        return this.state.every((cell) => cell)
    }




    /**
     * Inserts a `Symbol` at the given `Board` index.
     * @returns {boolean}
     */
    insert (symbol, index) {

        // ignore out of bounds indices and non-empty cells
        if (index > this.cellCount || this.state[index]) {
            return false
        }

        this.state[index] = symbol
        return true

    }

}




// ...
module.exports = Board
