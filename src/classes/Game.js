const config = require("../../config"),
    readline = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout,
    })




/**
 *
 */
class Game {
    constructor (board, players) {

        // Allow only instances of Board class.
        if (board.constructor.name !== "Board") {
            throw new Error("First argument needs to be of type `Board`.")
        }

        // Allow only instances of Array of Players.
        if (!Array.isArray(players)) {
            throw new Error("Second argument needs to be of type `Array`.")
        }


        //  Setup players in the game.
        this.players = players.map((player, idx) => {

            if (!(
                player.constructor.name === "Human" ||
                player.constructor.name === "Computer"
            )) {
                throw new Error("Not a player!")
            }
            return {
                queue: idx,
                name: player.name,
                symbol: player.symbol,
                player,
            }
        })


        // Board
        this.board = board


        // Map player tuns to player index in the queue.
        this.turns = {
            COMPUTER: 0,
            PLAYER1: 1,
            PLAYER2: 2,
        }

    }




    /**
     * Translates (validated for format) user input into an index coresponding
     *  to the cell on the `Board`.
     * @param {string} input valid format of a user input string
     * @returns {number} index of a cell or -1 when out of range
     */
    getPlayIndex (input) {
        const availableRange = this.board.getEmptyCells(),
            indexFromCoordinates = this.board.getIndexFromCoordinates(input)

        // Coordinates were out of range.
        if (indexFromCoordinates < 0) {
            return indexFromCoordinates
        }

        // Coordinates in range - return corresponding index.
        if (availableRange.some((index) =>
            index === indexFromCoordinates
        )) return indexFromCoordinates

        // Anything else that is not valid.
        return -1
    }




    /**
     * Checks user input against allowed format.
     * @param {string} input raw user input
     * @returns {boolean}
     */
    inputFormatValid (input) {
        const format = new RegExp(/^[1-9]{1}[0-9]?,[1-9]{1}[0-9]?$/)
        return format.test(input) ? true : false
    }




    /**
     * Executes a play turn.
     * @param {number} turn integer representing a player in the game queue
     * @param {number} move integer representing index of the selected cell
     * @param {boolean} [aiMove] whether this move represents AI
     * @returns {Game}
     */
    playTurn (turn, move, aiMove = false) {
        this.board.insert(this.players[turn].symbol, move)
        if (aiMove) {
            console.log(`\u001B[31m${this.players[turn].name} > \u001B[39m${move}`)
        }
        this.board.print()
        return this
    }



    /**
     * Finds the best move for the computer by using minimax algorithm.
     * @returns {number}
     */
    findBestMove () {
        let bestMove

        this.players[this.turns.COMPUTER].player.minimax(
            this.board,
            config.maxDepth,
            true,
            this.players[this.turns.PLAYER1].symbol,
            bestIndex => {

                const human1 = bestIndex

                this.players[this.turns.COMPUTER].player.minimax(
                    this.board,
                    config.maxDepth,
                    true,
                    this.players[this.turns.PLAYER2].symbol,
                    bestIndex => {

                        const human2 = bestIndex

                        bestMove = Math.max(human1, human2)
                    }
                )
            }
        )

        return bestMove
    }




    /**
     * Prints final game score summary.
     * @returns {Game}
     */
    printGameScore () {
        console.log("\n=========================\n")
        if (this.board.getOutcome().type === "draw") {
        // eslint-disable-next-line no-console
            console.log("It's a draw!")
        } else {
            // eslint-disable-next-line no-console
            console.log("Winner:", this.board.getOutcome().winner)
            // this.board.print()
        }
        console.log("\n=========================\n")
        return this
    }




    /**
     * Starts the game.
     */
    start () {

        console.log("\nWelcome to Tic-Tac-Toe! The players are:")

        this.players.forEach((player) => {
            console.log(`Player ${player.queue}: ${player.name}`)
        })


        let turn = this.turns.COMPUTER

        const
            firstPlayerSymbol = this.players[turn].symbol,
            firstMove = Math.floor(
                Math.random() * this.board.getEmptyCells().length
            )


        this.board.insert(firstPlayerSymbol, firstMove)
        this.board.print()

        console.log(`${this.players[turn].name} played first at ${firstMove}\n`)


        turn = this.turns.PLAYER1


        const prompt = "TTT> "
        readline.setPrompt(
            `\u001B[31m${this.players[turn].name} > \u001B[39m`,
            prompt.length
        )
        readline.prompt()




        readline.on("line", (line) => {

            const input = line.trim()

            if (this.inputFormatValid(input)) {

                const playIndex = this.getPlayIndex(input)

                if (playIndex < 0) {
                    // Display input error prompt for current player.
                    console.log("Invalid move! Please repeat.")
                    readline.setPrompt(
                        `\u001B[31m${this.players[turn].name} > \u001B[39m`,
                        prompt.length
                    )
                    readline.prompt()
                    return
                }


                // Human Player 1 turn.
                if (turn === this.turns.PLAYER1) {
                    this.playTurn(turn, playIndex)
                    turn = this.turns.PLAYER2
                }

                // Human Player 2 turn.
                else if (turn === this.turns.PLAYER2) {
                    this.playTurn(turn, playIndex)
                    turn = this.turns.COMPUTER

                    // Quit CLI if game is over before AI plays.
                    if (this.board.getOutcome().gameOver) {
                        this.printGameScore()
                        readline.close()
                        return
                    }

                    // Piggy back AI's turn.
                    this.playTurn(turn, this.findBestMove(), true)
                    turn = this.turns.PLAYER1
                }




                // Quit CLI if game is over.
                if (this.board.getOutcome().gameOver) {
                    this.printGameScore()
                    readline.close()
                    return
                }




                // Display prompt for current player.
                readline.setPrompt(
                    `\u001B[31m${this.players[turn].name} > \u001B[39m`,
                    prompt.length
                )
                readline.prompt()

            } else {
                // Display input error prompt for current player.
                console.log("Wrong input! Please repeat.")
                readline.setPrompt(
                    `\u001B[31m${this.players[turn].name} > \u001B[39m`,
                    prompt.length
                )
                readline.prompt()
            }




        }).on("close", () => {

            //eslint-disable-next-line no-process-exit
            process.exit()

        })

        return this
    }
}




// ...
module.exports = Game
