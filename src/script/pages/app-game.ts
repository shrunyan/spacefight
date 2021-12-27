import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { GameEngine, cell, player } from '../game-engine';

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

      #player0 {
        border-bottom: 3px solid red;
        display: flex;
        flex-direction: column;
      }
      #player1 {
        border-top: 3px solid red;
        display: flex;
        flex-direction: column-reverse;
      }

      .board {
        background-color: #444;
        display: grid;
        height: 100%;

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
        background-color: white;
      }
      .cell.hit {
        background-color: red;
      }
      .cell.destroyer,
      .cell.submarine,
      .cell.crusier,
      .cell.battleship,
      .cell.carrier {
        background-color: blue;
      }
    `;
  }

  @property() game: GameEngine;
  @property() hit = 0;

  constructor() {
    super();
    this.game = new GameEngine({ grid: 12 });
    this.game.start();
  }

  attack(player: number, cell: number) {
    this.game.attack(player, cell)

    // Changing value causes render
    this.hit = cell
  }

  render() {
    return html`<main id="game">
      ${this.game.players.map((player: player, playerIndex: number) => {
      return html`
            <section id="player${playerIndex}">
              <header><p>${player.name}</p></header>
              <div class="board">
              ${this.game.boards[playerIndex].cells.map((cell: cell, cellIndex: number) => {
        return html`
          <div @click="${this.attack.bind(this, playerIndex, cellIndex)}" class="cell ${cell.shot.toLowerCase()}" data-cell="${cellIndex}">&nbsp;</div>`
      })}
              </div>
            </section>
          `
    })}
    </main>`;
  }
}
