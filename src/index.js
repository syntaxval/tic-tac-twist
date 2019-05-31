"use strict"

const
    config = require("../config"),
    Board = require("./classes/Board"),
    Player = require("./classes/Player"),
    readline = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout,
    })


function playTurn (board, player, turn = "1") {

    const playerAlias = {
        "1": `Player 1 (${config.symbols["human1"]})`,
        "2": `Player 2 (${config.symbols["human2"]})`,

    }


    readline.question(`${playerAlias[turn]} > `, (move) => {
        if (move == "exit" || move === "quit"){
            readline.close()
        } else {
            // eslint-disable-next-line no-console
            console.log(`${playerAlias[turn]} entered ${move}`)


            // Player 1
            if (turn === "1") {
                board.insert(config.symbols["human1"], move)
                board.print()
                // turn = "2"
                // playTurn(board, player, turn)

                /************* TEST */
                if (board.getOutcome().gameOver) {
                    if (board.getOutcome().type === "draw") {
                        console.log("It's a draw!")
                    } else {
                        console.log("Winner: ", board.getOutcome().winner)
                    }
                    readline.close()
                } else {
                    turn = "2"
                    playTurn(board, player, turn)
                }
                /************* TEST */

            }

            // Player 2 && AI
            else {
                board.insert(config.symbols["human2"], move)
                board.print()



                /************* TEST */
                if (board.getOutcome().gameOver) {
                    if (board.getOutcome().type === "draw") {
                        console.log("It's a draw!")
                    } else {
                        console.log("Winner: ", board.getOutcome().winner)
                    }
                    readline.close()
                } else {
                    turn = "1"
                    playTurn(board, player, turn)
                }
                /************* TEST */


                // scenario with computer + 2 players

                // player.findBestMove(board, true, bestIndex => {
                //     board.insert(config.symbols["computer"], bestIndex)
                //     board.print()
                //     // eslint-disable-next-line no-console
                //     console.log(`Computer played: ${bestIndex}`)

                //     if (board.getOutcome().gameOver) {
                //         if (board.getOutcome().winner) {
                //             // eslint-disable-next-line no-console
                //             console.log("We have a winner!", board.getOutcome())
                //         } else {
                //             // eslint-disable-next-line no-console
                //             console.log("It's a draw!")
                //         }

                //         readline.close()
                //     } else {
                //         turn = "1"
                //         playTurn(board, player, turn)
                //     }
                // })

            }



            //  else {
            //     player.findBestMove(board, true, bestIndex => {
            //         board.insert(config.symbols["computer"], bestIndex)
            //         board.print()
            //         // eslint-disable-next-line no-console
            //         console.log(`Computer played: ${bestIndex}`)

            //         if (board.getOutcome().gameOver) {
            //             console.log("Computer Won!", board.getOutcome().winner)
            //         }
            //     })


            //     if (Math.round(Math.random()) === 1) {
            //         // eslint-disable-next-line no-console
            //         console.log("Computer won!")
            //         readline.close()
            //     } else {
            //         turn = "1"
            //         playTurn(board, player, turn)
            //     }


            // }

        }
    })
}


function newGame () {
    let player = new Player()
    let board = new Board()

    // let firstMove = Math.floor(Math.random() * board.getEmptyCells().length)

    // board.insert(config.symbols["computer"], firstMove)
    // board.print()


    playTurn(board, player)

}


try {
    // const board = new Board(parseInt(config.boardSize, 10))
    // const player = new Player()

    // board.print().insert("✹", "0")
    // board.print().insert("✹", "3")
    // board.print().insert("✹", "6")
    // board.print()

    newGame()

} catch (error) {
    // eslint-disable-next-line no-console
    console.log(error.message)
}
