"use strict"


const
    config = require("../config"),
    Board = require("./classes/Board"),
    Human = require("./classes/Human"),
    Computer = require("./classes/Computer"),
    Game = require("./classes/Game")




try {

    const game = new Game(
        new Board(),
        [
            new Computer("Zalgo", config.symbols.computer),
            new Human("Brent", config.symbols.human1),
            new Human("Josh", config.symbols.human2),
        ]
    )

    game.start()

} catch (error) {

    // eslint-disable-next-line no-console
    console.log(error.message)

}
