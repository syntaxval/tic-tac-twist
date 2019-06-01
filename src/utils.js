const maxInt = Number.MAX_SAFE_INTEGER  ||  2 ** 53 - 1

const randomInt = () => Math.floor(Math.random() * (maxInt * 1e-3))

const draw = (arr) => arr[randomInt() % arr.length]




// ...
module.exports = {
    maxInt,
    randomInt,
    draw,
}
