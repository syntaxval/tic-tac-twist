const Player = require("./Player")




/**
 *
 */
class Computer extends Player {
    constructor (name, symbol) {
        super()
        this.name = `${name} (AI)`
        this.symbol = symbol
    }
}




// ...
module.exports = Computer
