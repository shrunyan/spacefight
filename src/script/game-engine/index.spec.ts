'use strict'

// import * as tape from "tape";
// import { GameEngine } from '.';

const tape = require('tape')
const { GameEngine } = require('.')

tape('game engine', (t: any) => {
    const engine = new GameEngine()

    t.equal(engine.grid, 8)
    t.end()
})

tape('game engine > calcCoords', (t: any) => {
    // default 8 by grid
    const engine = new GameEngine()

    const cell = 50
    const coords = engine.calcCoords(cell)

    // row 7
    t.equal(coords[0], 7)

    // col 2
    t.equal(coords[1], 2)
})