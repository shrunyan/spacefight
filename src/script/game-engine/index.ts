'use strict';

export class GameEngine {

    static none = "NONE"
    static hit = "HIT"
    static miss = "MISS"

    static destroyer = { name: "DESTROYER", size: 2 }
    static submarine = { name: "SUBMARINE", size: 3 }
    static crusier = { name: "CRUSIER", size: 4 }
    static battleship = { name: "BATTLESHIP", size: 5 }
    static carrier = { name: "CARRIER", size: 6 }

    grid = 32
    players = [{
        name: "",
        moves: []
    }]
    // ships = [{}]

    battleSpaceEnemy = {
        cells: [{
            ship: GameEngine.none,
            shot: GameEngine.none
        }],
        ships: [
            GameEngine.destroyer,
            GameEngine.submarine,
            GameEngine.crusier,
            GameEngine.battleship,
            GameEngine.carrier
        ]
    }

    battleSpaceFriendly = {
        cells: [{
            ship: GameEngine.none,
            shot: GameEngine.none
        }],
        ships: [
            GameEngine.destroyer,
            GameEngine.submarine,
            GameEngine.crusier,
            GameEngine.battleship,
            GameEngine.carrier
        ]
    }

    constructor(opts = {
        grid: null
    }) {
        if (opts.grid) {
            this.grid = opts.grid
        }

        this.generateCells()
    }

    generateCells() {
        this.battleSpaceEnemy.cells = new Array(this.grid)
        this.battleSpaceEnemy.cells.forEach((_, index: number) => this.battleSpaceEnemy.cells[index] = {
            ship: GameEngine.none,
            shot: GameEngine.none
        })
    }

    fire(index: number) {
        const cell = this.battleSpaceEnemy.cells[index]

        if (cell.ship !== GameEngine.none) {
            cell.shot = GameEngine.hit
        } else {
            cell.shot = GameEngine.miss
        }

        // TODO determine game state. Are all ships sunk, is game over?
    }

    start() {
        // place ships randomly
    }

    /**
     * update cells to note the ship type placed there
     * @param ship
     * @param cells
     * @returns Array
     */
    place(ship: string, cells: Array<number>): Array<Object> {
        const unavailable = cells.filter(cell =>
            this.battleSpaceFriendly.cells[cell].ship !== GameEngine.none
        );

        if (unavailable.length) {
            return unavailable
        } else {
            cells.forEach(cell =>
                this.battleSpaceFriendly.cells[cell].ship !== ship
            );
            return []
        }
    }
}