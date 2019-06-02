const Player = require("./Player")




/**
 * @desc Represents human player.
 */
class Human extends Player {

    /**
     * @param {string} name this player's name alias
     * @param {string} symbol this player's symbol on the `Board`
     */
    constructor (name, symbol, prompt) {
        super()
        this.name = name
        this.symbol = symbol
        this.prompt = prompt
    }
}




// ...
module.exports = Human
