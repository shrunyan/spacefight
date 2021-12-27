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
        grid-template-areas: "a a"
        "b b";
      }

      #player0 {
        grid-area: b;
        border-top: 2px solid red;
        display: flex;
        flex-direction: column-reverse;
      }
      #player1 {
        grid-area: a;
        border-bottom: 2px solid red;
        display: flex;
        flex-direction: column;
      }

      .player header {
        padding: 0 8px;
        display: grid;
        grid-template-columns: max-content max-content max-content;
        align-items: center;
        grid-gap: 10px;
      }

      .player header * {
        margin: 0;
      }

      .player header .circle {
          background: green;
          width: 10px;
          height: 10px;
          border-radius: 50%;
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

  @property() hack = 0

  constructor() {
    super();
    this.game = new GameEngine({ grid: 12 });
    this.game.start();

    /**
     * FIXME
     * Force render every second because I don't know how
     * to make lit observe the engine state and render based on it's changes
     */
    setInterval(() => this.hack++, 1000)
  }

  attack(player: number, cell: number) {

    console.log('current player', this.game.currentPlayer);
    console.log('selected player board', player);

    if (this.game.currentPlayer === player) {
      console.log('You attacked your own board');
    } else {
      this.game.attack(player, cell)
    }

    // Changing value causes render
    this.hit = cell
  }

  render() {
    return html`<main id="game">
      ${this.game.players.map((player: player, playerIndex: number) => {
      return html`
            <section id="player${playerIndex}" class="player">
              <header>
                <img src="https://robohash.org/${player.name}" height="50px" width="50px" />
                <p>${player.name}</p>
                ${this.game.currentPlayer === playerIndex ? html`<span class="circle">&nbsp;</span>` : null}
              </header>
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
