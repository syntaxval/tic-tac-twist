"use strict"


const
    config = require("../config"),
    Board = require("./classes/Board"),
    Human = require("./classes/Human"),
    Computer = require("./classes/Computer"),
    Game = require("./classes/Game"),
    utils = require("./utils")




try {

    const game = new Game(
        new Board(),
        [
            new Computer(
                "Zalgo",
                config.symbols.computer,
                utils.prompt.yellow
            ),
            new Human(
                "Brent",
                config.symbols.player1,
                utils.prompt.blue
            ),
            new Human(
                "Josh",
                config.symbols.player2,
                utils.prompt.green
            ),
        ]
    )

    game.start()

} catch (error) {

    // eslint-disable-next-line no-console
    console.log(error.message)

    //eslint-disable-next-line no-process-exit
    process.exit()

}
