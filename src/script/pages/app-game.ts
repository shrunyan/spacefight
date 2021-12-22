import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { GameEngine, cell } from '../game-engine';

@customElement('app-game')
export class AppGame extends LitElement {
  static get styles() {
    return css`
      #game {
        height: 100%;
        width: 100%;
        display: grid;
        grid-template-rows: 1fr 1fr;
      }

      #enemy {
        border-bottom: 3px solid red;
      }
      #fleet {
        border-top: 3px solid red;
      }

      .board {
        background-color: #444;
        display: grid;

        /*
        grid base, e.g. 12 in a 12x12 grid, determines repeat and devisor
        number of cells to render is grid result, e.g. 12x12 = 64 cells
        */
        grid-template-columns: repeat(12, calc(100% / 12));
        grid-template-rows: repeat(12, calc(100% / 12));
      }
      .cell {
        border: 1px solid #000;
      }
      .cell:hover,
      .cell:focus,
      .cell.active {
        background-color: #666;
      }

      .cell.miss {
        background-color: blue;
      }
      .cell.hit {
        background-color: red;
      }
    `;
  }

  engine = {
    boards: {
      enemy: { cells: [] },
      friendly: { cells: [] },
    },
  };

  constructor() {
    super();

    console.log(this.engine);

    this.engine = new GameEngine({ grid: 12 });
    this.engine.start();

    console.log('boards', this.engine);
  }

  attack(cell) {}

  render() {
    return html`
      <main id="game">
        <section id="enemy" class="board">
          ${this.engine.boards.enemy.cells.map(
            (cell: cell, index: number) =>
              html`<div class="cell" data-index="${index}">${cell.ship}</div>`
          )}
        </section>
        <section id="fleet" class="board">
          ${this.engine.boards.friendly.cells.map(
            (cell: cell, index: number) =>
              html`<div class="cell" data-index="${index}">${cell.ship}</div>`
          )}
        </section>
      </main>
    `;
  }
}
