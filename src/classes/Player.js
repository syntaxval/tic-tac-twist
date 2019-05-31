"use strict"

const
    config = require("../../config"),
    Board = require("./Board")




/**
 * ...
 */
class Player {


    // ...
    constructor (depth = config.maxDepth) {
        this.depth = depth
        this.nodeMap = new Map()
    }




    // ...
    findBestMove (
        board,
        isMaximizing = true,
        callback = () => {},
        recursionDepth = 0
    ) {


        // Allow only instances of Board class.
        if (board.constructor.name !== "Board") throw new Error("First argument needs to be of type `Board`.")

        // Reset nodeMap on "new move" call.
        if (recursionDepth === 0) this.nodeMap.clear()

        const outcome = board.getOutcome()


        if (outcome.gameOver || recursionDepth === config.maxDepth) {
            // AI is always maximizing
            if (outcome.winner.symbol === config.symbols["computer"]) {
                return 100 - recursionDepth
            } else if (
                (outcome.winner.symbol === config.symbols["human1"]) ||
                (outcome.winner.symbol === config.symbols["human2"])
            ) {
                return -100 + recursionDepth
            }
        }



        // computer is always maximizing
        if (isMaximizing) {
            let best = -100
            board.getEmptyCells().forEach((idx) => {

                // Instantiate new Board with a copy of the
                // current Board's state.
                let childBoard = new Board(config.boardSize)
                childBoard.setState(board.state.slice())

                childBoard.insert(config.symbols["computer"], idx)


                // recurse
                let nodeValue = this.findBestMove(childBoard, false, callback, recursionDepth + 1)
                // let nodeValue = 1

                // update best value
                best = Math.max(nodeValue, best)

                // after returning from recursion??? map heuristic value with its move indices - how can it ever get here???
                if (recursionDepth === 0) {
                    const moves = this.nodeMap.has(nodeValue) ? `${this.nodeMap.get(nodeValue)},${idx}` : idx
                    this.nodeMap.set(nodeValue, moves)
                }

            })

            // main call case
            if (recursionDepth === 0) {
                const bestNode = this.nodeMap.get(best)
                let bestMoveIndex

                if (typeof bestNode === "string") {
                    const
                        arr = bestNode.split(","),
                        rand = Math.floor(Math.random() * arr.length)

                    bestMoveIndex = arr[rand]
                } else {
                    bestMoveIndex = this.nodeMap.get(best)
                }

                callback(bestMoveIndex)
                return bestMoveIndex
            }

            // recursive call case
            return best
        }

        // human1 is always minimizing
        if(!isMaximizing) {
            let best = 100
            board.getEmptyCells().forEach((idx) => {

                // Instantiate new Board with a copy of the
                // current Board's state.
                let childBoard = new Board(config.boardSize)
                childBoard.setState(board.state.slice())

                childBoard.insert(config.symbols["human1"], idx)

                // recurse
                let nodeValue = this.findBestMove(childBoard, true, callback, recursionDepth + 1)
                // let nodeValue = 2

                // update best value
                best = Math.min(nodeValue, best)

                // after returning from recursion??? map heuristic value with its move indices - how can it ever get here???
                if (recursionDepth === 0) {
                    const moves = this.nodeMap.has(nodeValue) ? `${this.nodeMap.get(nodeValue)},${idx}` : idx
                    this.nodeMap.set(nodeValue, moves)
                }

            })

            // main call case
            if (recursionDepth === 0) {
                const bestNode = this.nodeMap.get(best)
                let bestMoveIndex

                if (typeof bestNode === "string") {
                    const
                        arr = bestNode.split(","),
                        rand = Math.floor(Math.random() * arr.length)

                    bestMoveIndex = arr[rand]
                } else {
                    bestMoveIndex = this.nodeMap.get(best)
                }

                callback(bestMoveIndex)
                return bestMoveIndex
            }

            // recursive call case
            return best
        }




    }

}




// ...
module.exports = Player
