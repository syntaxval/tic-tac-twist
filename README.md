## prerequisites


`Node.js®` v.10 or higher

## installation

In order to play the game, navigate to the root directory and install all
required dependencies with:

`npm install`


## play

Start the game from the root directory with:

`npm start`


## how to play

The game follows the regular _tic-tac-toe_
[rules](https://en.wikipedia.org/wiki/Tic-tac-toe) with a twist. There are
three players (one of the is the "AI"). Boards can be of any size between 3x3
up to 10x10. The rules are always to fill horizontal, diagonal or vertical rows
with the same symbol (owned by a player). Oh, and the symbols can be any valid
`UTF8` character.

Take turns by entering your desired position. For example: `1,3` would place
your symbol at __first row__ and __third column__. Invalid or out of range
input is ignored.


## documentation

Code documentation can be generated with:

`npm run jsdoc`

After running the documentation generator, the documentation root can be found
under `docs` directory with `index.html` as a home file.


## test

Execute test suite with:

`npm run test`


## license

**tic-tac-toe** is released under the _Apache License, Version 2.0_. See the
[LICENSE](./LICENSE) for more details.


## references

* [AI Player with Minimax Algorithm](https://medium.com/@alialaa/tic-tac-toe-with-javascript-es2015-ai-player-with-minimax-algorithm-59f069f46efa)
* [Minimax Algorithm - Wikipedia](https://en.wikipedia.org/wiki/Minimax)
