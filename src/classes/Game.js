const config = require("../../config")




/**
 *
 */
class Game {
    constructor (board, players) {

        // Allow only instances of Board class.
        if (board.constructor.name !== "Board") {
            throw new Error("First argument needs to be of type `Board`.")
        }

        if (!Array.isArray(players)) {
            throw new Error("Second argument needs to be of type `Array`.")
        }

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

        this.board = board

        this.turns = {
            COMPUTER: 0,
            PLAYER1: 1,
            PLAYER2: 2,
        }
    }

    isGameOver () {
        return this.board.getOutcome().gameOver
    }

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
    }


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


    start () {


        console.log("\nWelcome to Tic-Tac-Toe! The players are:")

        this.players.forEach((player) => {
            console.log(`Player ${player.queue}: ${player.name}`)
        })


        let
            turn = this.turns.COMPUTER,
            bestMove

        const
            firstPlayerSymbol = this.players[turn].symbol,
            firstMove = Math.floor(
                Math.random() * this.board.getEmptyCells().length
            )


        this.board.insert(firstPlayerSymbol, firstMove)
        this.board.print()

        console.log(`${this.players[turn].name} played first at ${firstMove}\n`)


        turn = this.turns.PLAYER1


        const rl = require("readline").createInterface({
            input: process.stdin,
            output: process.stdout,
        })

        const prompt = "TTT> "
        rl.setPrompt(
            `\u001B[31m${this.players[turn].name} > \u001B[39m`,
            prompt.length
        )
        rl.prompt()

        rl.on("line", (line) => {




            if (turn === this.turns.PLAYER1) {
                this.board.insert(this.players[turn].symbol, line.trim())
                this.board.print()
                turn = this.turns.PLAYER2
            } else {
                this.board.insert(this.players[turn].symbol, line.trim())
                this.board.print()

                if (this.isGameOver()) {
                    this.printGameScore()
                    rl.close()
                    return
                }

                // AI plays here too
                turn = this.turns.COMPUTER

                bestMove = this.findBestMove()
                this.board.insert(
                    this.players[turn].symbol,
                    bestMove
                )
                console.log(`\u001B[31m${this.players[turn].name} > \u001B[39m${bestMove}`)
                this.board.print()

                turn = this.turns.PLAYER1


            }

            if (this.isGameOver()) {
                this.printGameScore()
                rl.close()
                return
            }


            rl.setPrompt(`\u001B[31m${this.players[turn].name} > \u001B[39m`, prompt.length)
            rl.prompt()

        }).on("close", () => {

            //eslint-disable-next-line no-process-exit
            process.exit()

        })
    }
}


module.exports = Game
