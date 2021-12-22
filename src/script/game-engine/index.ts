'use strict';

export type cell = {
  ship: string;
  shot: string;
};

export type board = {
  cells: Array<cell>;
};

export class GameEngine {
  static none = 'NONE';
  static hit = 'HIT';
  static miss = 'MISS';

  static destroyer = { name: 'DESTROYER', size: 2 };
  static submarine = { name: 'SUBMARINE', size: 3 };
  static crusier = { name: 'CRUSIER', size: 4 };
  static battleship = { name: 'BATTLESHIP', size: 5 };
  static carrier = { name: 'CARRIER', size: 6 };

  grid = 8;
  gridCount = 8 * 8;

  players = [
    {
      name: '',
      moves: [],
    },
  ];

  battleSpaceEnemy = {
    cells: [
      {
        ship: GameEngine.none,
        shot: GameEngine.none,
      },
    ],
    ships: [
      GameEngine.destroyer,
      GameEngine.submarine,
      GameEngine.crusier,
      GameEngine.battleship,
      GameEngine.carrier,
    ],
  };

  battleSpaceFriendly = {
    cells: [
      {
        ship: GameEngine.none,
        shot: GameEngine.none,
      },
    ],
    ships: [
      GameEngine.destroyer,
      GameEngine.submarine,
      GameEngine.crusier,
      GameEngine.battleship,
      GameEngine.carrier,
    ],
  };

  constructor(
    opts = {
      grid: null,
    }
  ) {
    if (opts.grid) {
      this.grid = opts.grid;
      this.gridCount = opts.grid * opts.grid;
    }

    this.battleSpaceFriendly.cells = this.generateBoard(this.gridCount);
    this.battleSpaceEnemy.cells = this.generateBoard(this.gridCount);

    // console.log('GameEngine', this);
  }

  generateBoard(size: number) {
    const cells = Array(size);
    for (let index = 0; index < cells.length; index++) {
      cells[index] = {
        ship: GameEngine.none,
        shot: GameEngine.none,
      };
    }
    return cells;
  }

  fire(index: number) {
    const cell = this.battleSpaceEnemy.cells[index];

    if (cell.ship !== GameEngine.none) {
      cell.shot = GameEngine.hit;
    } else {
      cell.shot = GameEngine.miss;
    }

    // TODO determine game state. Are all ships sunk, is game over?
  }

  start() {
    // place ships randomly
    // console.log('GameEngine:start');

    const boards = [this.battleSpaceEnemy, this.battleSpaceFriendly];

    boards.forEach((board) => {
      board.ships.forEach((ship) => {
        // generate basic cell info
        const cell = this.seed(this.gridCount);
        const [row, col] = this.calcCoords(cell);

        // determine valid placement directions
        const top = row - ship.size >= 0;
        const right = col + ship.size <= this.grid;
        const bottom = row + ship.size <= this.grid;
        const left = col - ship.size >= 0;

        // generate first available direction cells
        let cells: Array<number> = [];

        // TODO figure out random direction selection
        // const randDir = this.seed(4);
        // switch (randDir) {
        //   case 0:
        //     cells = this.rangeCells(ship.size, cell, 'top');
        //   case 1:
        //     cells = this.rangeCells(ship.size, cell, 'right');
        //   case 2:
        //     cells = this.rangeCells(ship.size, cell, 'bottom');
        //   case 3:
        //     cells = this.rangeCells(ship.size, cell, 'left');

        //   default:
        //     // console.log('size', ship.size);
        //     // console.log('seed', cell);
        //     // console.log('row, col', row, col);
        //     // console.log('top', top);
        //     // console.log('right', right);
        //     // console.log('bottom', bottom);
        //     // console.log('left', left);

        //     // throw new Error('could not draw ship from seed');

        //     console.error('could not draw ship from seed');
        // }

        if (top) {
          cells = this.rangeCells(ship.size, cell, 'top');
        } else if (right) {
          cells = this.rangeCells(ship.size, cell, 'right');
        } else if (bottom) {
          cells = this.rangeCells(ship.size, cell, 'bottom');
        } else if (left) {
          cells = this.rangeCells(ship.size, cell, 'left');
        } else {
          // console.log('size', ship.size);
          // console.log('seed', cell);
          // console.log('row, col', row, col);
          // console.log('top', top);
          // console.log('right', right);
          // console.log('bottom', bottom);
          // console.log('left', left);

          // // could not draw ship from seed
          // throw new Error('could not draw ship from seed');

          return cells;
        }

        // console.log('cells', cells);

        // TODO check for collisions
        const collision = this.findCollisions(board, cells);

        // console.log('collision ', Boolean(collision));

        // if collision try again. maybe needs while loop?
        if (Boolean(collision)) {
          console.error('COLLISION', cell, ship);
        } else {
          this.place(board, cells, ship.name);
        }
      });
    });

    console.log(this);

    return boards;
  }

  seed(max: number) {
    return Math.floor(Math.random() * max);
  }

  rangeCells(size: number, cell: number, direction: string) {
    // console.log('rangeCells', size, cell, direction);

    const cells = Array(size);

    for (let index = 0; index < cells.length; index++) {
      if (index === 0) {
        cells[index] = cell;
      } else if (direction === 'top') {
        cells[index] = cells[index - 1] - this.grid;
      } else if (direction === 'right') {
        cells[index] = cells[index - 1] + 1;
      } else if (direction === 'bottom') {
        cells[index] = cells[index - 1] + this.grid;
      } else if (direction === 'left') {
        cells[index] = cells[index - 1] - 1;
      }
    }

    return cells;
  }

  // given a set of cells check for collisions
  // with already placed ships
  findCollisions(board: board, cells: Array<number>) {
    return cells.find((cell) => board.cells[cell].ship !== GameEngine.none);
  }

  /**
   * Caclulate row, column coordinates from a cell
   * @param cell
   * @returns
   */
  calcCoords(cell: number) {
    const decimal = cell / this.grid;
    const remainder = decimal % 1 !== 0;
    const floored = Math.floor(decimal);

    const row = floored + 1;
    const col = remainder ? cell - floored * this.grid : this.grid;

    return [row, col];
  }

  /**
   * update cells to note the ship type placed there
   * @param ship
   * @param cells
   * @returns Array
   */
  place(board: board, cells: Array<number>, name: string) {
    cells.forEach((cell) => (board.cells[cell].ship = name));
  }
}
