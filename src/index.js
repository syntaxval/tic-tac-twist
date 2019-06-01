"use strict"

const
    config = require("../config"),
    Board = require("./classes/Board"),
    Player = require("./classes/Player"),
    readline = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout,
    })


function isGameOver (board) {
    return board.getOutcome().gameOver
}

function printGameScore (board) {
    if (board.getOutcome.type === "draw") {
        // eslint-disable-next-line no-console
        console.log("It's a draw!")
    } else {
        // eslint-disable-next-line no-console
        console.log("Winner:", board.getOutcome().winner)
        board.print()
    }
}


function exitGame () {
    readline.close()
}


function playTurn (board, player, turn = "1") {

    const playerAlias = {
        "1": `Player 1 (${config.symbols["human1"]})`,
        "2": `Player 2 (${config.symbols["human2"]})`,

    }


    readline.question(`${playerAlias[turn]} > `, (move) => {
        if (move == "exit" || move === "quit"){
            exitGame()
        }



        if (isGameOver(board)) {
            printGameScore(board)
            exitGame()
            return
        }

        else {
            // eslint-disable-next-line no-console
            console.log(`${playerAlias[turn]} entered ${move}`)





            // Player 1
            if (turn === "1") {
                board.insert(config.symbols["human1"], move)
                board.print()

                if (isGameOver(board)) {
                    printGameScore(board)
                    exitGame()
                    return
                }
                else {
                    turn = "2"
                    playTurn(board, player, turn)
                }



            }

            // Player 2 && AI
            else {
                board.insert(config.symbols["human2"], move)
                board.print()




                player.minimax(
                    board,
                    config.maxDepth,
                    true,
                    config.symbols["human1"],
                    bestIndex => {
                        const human1 = bestIndex
                        player.minimax(
                            board,
                            config.maxDepth,
                            true,
                            config.symbols["human2"],
                            bestIndex => {
                                const human2 = bestIndex

                                board.insert(config.symbols["computer"], Math.max(human1, human2))
                                board.print()

                                if (isGameOver(board)) {
                                    printGameScore(board)
                                    exitGame()
                                    return
                                } else {
                                    turn = "1"
                                    playTurn(board, player, turn)
                                }

                            })
                    })


            }

        }
    })
}


function newGame () {
    let player = new Player()
    let board = new Board()

    let firstMove = Math.floor(Math.random() * board.getEmptyCells().length)

    board.insert(config.symbols["computer"], firstMove)
    board.print()


    playTurn(board, player)

}


try {

    newGame()

} catch (error) {
    // eslint-disable-next-line no-console
    console.log(error.message)
}
