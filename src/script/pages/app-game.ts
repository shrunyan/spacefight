import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { GameEngine, board, cell } from '../game-engine';

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

  boards: Array<board> = [{ cells: [] }];

  constructor() {
    super();

    const engine = new GameEngine({ grid: 12 });
    const boards = engine.start();

    console.log('boards', boards);

    this.boards = boards;
  }

  render() {
    return html`
      <main id="game">
        <section id="enemy" class="board">
          ${this.boards[0].cells.map(
            (cell: cell, index: number) =>
              html`<div class="cell" data-index="${index}">${cell.ship}</div>`
          )}
        </section>
        <section id="fleet" class="board">
          ${this.boards[1].cells.map(
            (cell: cell, index: number) =>
              html`<div class="cell" data-index="${index}">${cell.ship}</div>`
          )}
        </section>
      </main>
    `;
  }
}
