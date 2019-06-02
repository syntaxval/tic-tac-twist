const Player = require("./Player")




/**
 * @desc Represents computer player.
 */
class Computer extends Player {

    /**
     * @param {string} name this player's name alias
     * @param {string} symbol this player's symbol on the `Board`
     */
    constructor (name, symbol) {
        super()
        this.name = `${name} (AI)`
        this.symbol = symbol
    }
}




// ...
module.exports = Computer
