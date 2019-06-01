const Player = require("./Player")




/**
 *
 */
class Human extends Player {
    constructor (name, symbol) {
        super()
        this.name = name
        this.symbol = symbol
    }
}




// ...
module.exports = Human
