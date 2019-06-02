"use strict"

const
    Board = require("./Board"),
    config = require("../../config"),
    utils = require("../utils")




/**
 * @desc Abstract class representing `Player` entity.
 */
class Player {

    /**
     *
     */
    constructor () {
        this.nodeMap = new Map()
        this.maximizingScore = 100
        this.minimizingScore = -100
    }


    /**
     * Minimax algorithm implementation.
     * @param {Board} board an instance of a `Board`
     * @param {number} recursionDepth max level of recursion for minimax
     * @param {boolean} isMaximizing whether the player is maximizing
     * @param {string} minimizingSymbol symbol of other player
     * @param {function} callback function to be executed
     */
    minimax (
        board,
        recursionDepth = config.maxDepth,
        isMaximizing = true,
        minimizingSymbol = config.symbol["human1"],
        callback = () => {}
    ) {

        // Allow only instances of Board class.
        if (board.constructor.name !== "Board") {
            throw new Error("First argument needs to be of type `Board`.")
        }


        const outcome = board.getOutcome()


        // Reset nodeMap on initial call.
        if (recursionDepth === config.maxDepth) this.nodeMap.clear()


        // This is the case where we've either reached search depth limit or
        // the game is actually over. In either case we need to return static
        // evaluation of the score at the current position.
        if (recursionDepth === 0 || outcome.gameOver) {

            // Convention: Computer will always be a maximizing player.
            if (outcome.winner.symbol === config.symbols["computer"]) {
                return this.maximizingScore - recursionDepth
            } else {
                return this.minimizingScore + recursionDepth
            }
        }


        // setup new/next board state
        const childBoard = new Board(config.boardSize)
        childBoard.setState(board.state.slice())



        const
            // get all possible "choices" for a "move"
            possibleMoves = board.getEmptyCells(),
            findBestScore = (isMaximizing = true) => {

                let best = isMaximizing ?
                    this.minimizingScore : this.maximizingScore


                possibleMoves.forEach((idx) => {
                    childBoard.insert(config.symbols["computer"], idx)


                    const nodeValue = this.minimax(
                        childBoard,
                        recursionDepth - 1,
                        isMaximizing,
                        minimizingSymbol,
                        callback
                    )


                    best = isMaximizing ?
                        Math.max(best, nodeValue) :
                        Math.min(best, nodeValue)



                    // initial call of minimax
                    if (recursionDepth === config.maxDepth) {
                        const moves = this.nodeMap.has(nodeValue) ?
                            `${this.nodeMap.get(nodeValue)},${idx}` : idx
                        this.nodeMap.set(nodeValue, moves)
                    }

                })

                // initial call of minimax
                if (recursionDepth === config.maxDepth) {

                    const bestNode = this.nodeMap.get(best)

                    let bestFirst

                    if (typeof bestNode === "string") {
                        bestFirst = utils.draw(bestNode.split(","))
                    } else {
                        bestFirst = bestNode
                    }

                    callback(bestFirst)
                    return bestFirst

                }

                // recursive call case
                return best

            }




        // Computer's turn.
        if (isMaximizing) {
            return findBestScore(isMaximizing)
        }




        // Human's turn.
        if(!isMaximizing) {
            return findBestScore(!isMaximizing)
        }


    }

}




// ...
module.exports = Player
