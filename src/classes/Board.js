"use strict"


// Declare some globals.
const
    config = require("../../config"),
    minBoardSize = 3,
    maxBoardSize = 10




/**
 * @desc Represents _Tic-Tac-Toe_ `Board`.
 */
class Board {


    /**
     * @param {number} size Integer between 3 and 10 specifying the size of the
     *  `Board`.
     */
    constructor (size = config.boardSize) {

        // allow only valid Board sizes
        if (typeof size !== "number" ||
            size < minBoardSize ||
            size > maxBoardSize
        ) {
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




        // private method returning 2D `Array` of rows of the `Board`
        this.getRows = function getRows ()  {

            let rowIndices = []
            let rowIndicesMatrix = []

            for (let i = 1; i <= this.cellCount; i++) {
                rowIndices.push(i-1)
                if (i % size === 0) {
                    rowIndicesMatrix.push(rowIndices.slice())
                    rowIndices = []
                }
            }

            return rowIndicesMatrix
        }




        // private method returning 2D `Array` of columns of the `Board`
        this.getColumns = function getColumns () {
            const rows = this.getRows()

            // transpose the rows matrix to get columns matrix
            // `idx` is really the element value but it is the same as index
            return rows[0].map((idx) => rows.map((row) => row[idx]))
        }




        // private method returning 2D `Array` of the diagonals of the `Board`
        this.getDiagonals = function getDiagonals () {
            const rows = this.getRows()

            // get two diagonals of the square matrix
            return [
                rows[0].map((idx) => rows[idx][idx]),
                rows[0].map((idx) => rows[idx][this.size - idx - 1]),
            ]
        }




        // Private helper method for checking if there is a possible winner
        // at either row, column or diagonal cells. `matrix` is a 2D `Array`
        // of indices representing a row, column or diagonal cells.
        this.declareWinner = function declareWinner (matrix) {

            // compare if all "symbols" are the same at every matrix[i]
            // i.e. if row[0] === row[1] === row[2] or
            // column[0] === column[3] === column[6] or
            // diagonal[0] === diagonal[4] === diagonal[8] etc.
            for (let i = 0; i < matrix.length; i++) {
                if (matrix[i].every(
                    (idx) => this.state[matrix[0][0]] === this.state[idx]
                )) {
                    return ({
                        cells: matrix[i],
                        symbol: this.state[matrix[0][0]],
                    })
                }
            }

        }


    }

    setState (state) {
        this.state = state
    }



    /**
     * Prints the `Board` in the terminal.
     * @returns {Board}
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


        // allow for method chaining
        return this
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
     * @param {string} symbol Character that should represent particular
     *  player's moves.
     * @param {number} index Linear coordinate where on the `Board` the symbol
     *  should be placed.
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




    /**
     * Provides an `Array` of empty cell indices signifying possible "moves".
     * @returns {array}
     */
    getEmptyCells () {
        return this.state.map((cell, idx) => {
            if (!cell) {
                return idx
            }
        }).filter((cell) => cell !== undefined)
    }




    /**
     * Checks for a possible win or a draw.
     * @returns {boolean}
     */
    getOutcome () {

        // looks like the game has just begun
        if (this.isEmpty()) return false




        // state machine - check for possible winner
        let winner


        winner = this.declareWinner(this.getRows())

        // "row" winner was found
        if (winner) return ({ winner, type: "row", gameOver: true })


        winner = this.declareWinner(this.getColumns())

        // "column" winner was found
        if (winner) return ({ winner, type: "column", gameOver: true })


        winner = this.declareWinner(this.getDiagonals())

        // "diagonal" winner was found
        if (winner) return ({ winner, type: "diagonal", gameOver: true })


        // looks like a "draw"
        // TODO: revisit later. Maybe this check can happen elsewhere
        if (this.isFull()) return ({ winner: {}, type: "draw", gameOver: true })


        // for now returning this.
        return ({ winner: {}, gameOver: false })
    }

}




// ...
module.exports = Board
