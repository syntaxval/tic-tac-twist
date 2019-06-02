// maximal (safe) integer representation in JavaScript
const maxInt = Number.MAX_SAFE_INTEGER  ||  2 ** 53 - 1


// produces "random" integer
const randomInt = () => Math.floor(Math.random() * (maxInt * 1e-3))


// draws "random" element from an array
const draw = (arr) => arr[randomInt() % arr.length]


// collection of prompt functions
const prompt = {
    blue: function (text, displayPostfix = true) {
        return `\u001b[30m\u001b[1m\u001b[44m${text}${
            displayPostfix ? " >" : ""
        }\u001b[49m\u001b[22m\u001b[39m `
    },

    green: function (text, displayPostfix = true) {
        return `\u001b[30m\u001b[1m\u001b[42m${text}${
            displayPostfix ? " >" : ""
        }\u001b[49m\u001b[22m\u001b[39m `
    },

    yellow: function (text, displayPostfix = true) {
        return `\u001b[30m\u001b[1m\u001b[45m${text}${
            displayPostfix ? " >" : ""
        }\u001b[49m\u001b[22m\u001b[39m `
    },
}




// ...
module.exports = {
    draw,
    maxInt,
    prompt,
    randomInt,
}
