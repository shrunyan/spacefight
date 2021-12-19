export default class GameEngine {

    static none = "NONE"
    static hit = "HIT"
    static miss = "MISS"

    static destroyer = "DESTROYER"
    static submarine = "SUBMARINE"
    static crusier = "CRUSIER"
    static battleship = "BATTLESHIP"
    static carrier = "CARRIER"

    grid = 32
    players = [{
        name: "",
        moves: []
    }]
    ships = [{

    }]

    battleSpaceEnemy = {
        cells: [{
            ship: GameEngine.destroyer,
            shot: GameEngine.none
        }],
        ships: [{
            type: GameEngine.destroyer,
            size:
        }]
    }

    battleSpaceFriendly = {
        cells: [],
        ships: []
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

    place(ship) {
        // TODO update cells to note the ship type placed there
    }
}