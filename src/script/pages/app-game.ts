import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import { GameEngine } from '../game-engine';

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
        grid base, e.g. 6 in a 6x6 grid, determines repeat and devisor
        number of cells to render is grid result, e.g. 6x6 = 36 cells
        */
        grid-template-columns: repeat(6, calc(100% / 6));
        grid-template-rows: repeat(6, calc(100% / 6));
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

  constructor() {
    super();

    console.log('AppGame');

    const engine = new GameEngine();
    engine.start();
  }

  render() {
    return html`
    <main id="game">
        <section id="enemy" class="board">
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        </section>
        <section id="fleet" class="board">
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        <div class="cell"></div>
        </section>
    </main>
    `;
  }
}
