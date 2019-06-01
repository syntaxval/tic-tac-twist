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
        this.maximizingScore = 100
        this.minimizingScore = -100
    }


    // ...
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
        // if (recursionDepth === config.maxDepth) this.nodeMap.clear()

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

        // get all possible "choices" for a "move"
        const possibleMoves = board.getEmptyCells()


        // Computer's turn.
        if (isMaximizing) {

            let best = this.minimizingScore



            possibleMoves.forEach((idx) => {
                childBoard.insert(config.symbols["computer"], idx)

                const nodeValue = this.minimax(
                    childBoard,
                    recursionDepth - 1,
                    false,
                    minimizingSymbol,
                    callback
                )



                best = Math.max(
                    best,
                    nodeValue
                )

                // initial call of minimax
                if (recursionDepth === config.maxDepth) {

                    const moves = this.nodeMap.has(nodeValue) ? `${this.nodeMap.get(nodeValue)},${idx}` : idx
                    this.nodeMap.set(nodeValue, moves)
                }

            })




            // initial call of minimax
            if (recursionDepth === config.maxDepth) {
                const bestNode = this.nodeMap.get(best)

                let bestFirst

                if (typeof bestNode === "string") {
                    const
                        multiPath = bestNode.split(","),
                        randomNode = Math.floor(Math.random() * multiPath.length)

                    bestFirst = multiPath[randomNode]
                } else {
                    bestFirst = bestNode
                }

                callback(bestFirst)
                return bestFirst

            }

            // recursive call case
            return best


        }



        // Human's turn.
        if(!isMaximizing) {

            let best = this.maximizingScore


            possibleMoves.forEach((idx) => {
                childBoard.insert(minimizingSymbol, idx)

                const nodeValue = this.minimax(
                    childBoard,
                    recursionDepth - 1,
                    true,
                    minimizingSymbol,
                    callback
                )


                best = Math.min(
                    best,
                    nodeValue
                )

                // initial call of minimax
                if (recursionDepth === config.maxDepth) {
                    const moves = this.nodeMap.has(nodeValue) ? `${this.nodeMap.get(nodeValue)},${idx}` : idx
                    this.nodeMap.set(nodeValue, moves)
                }

            })



            // initial call of minimax
            if (recursionDepth === config.maxDepth) {

                const bestNode = this.nodeMap.get(best)
                let bestFirst

                if (typeof bestNode === "string") {
                    const
                        multiPath = bestNode.split(","),
                        randomNode = Math.floor(Math.random() * multiPath.length)

                    bestFirst = multiPath[randomNode]
                } else {
                    bestFirst = bestNode
                }

                callback(bestFirst)
                return bestFirst

            }

            // recursive call case
            return best

        }

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
