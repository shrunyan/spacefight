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