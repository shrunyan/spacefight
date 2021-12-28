import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { GameEngine, cell, player } from '../game-engine';

@customElement('app-game')
export class AppGame extends LitElement {
  static get styles() {
    return css`
      * {
        margin: 0;
        padding: 0;
      }

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

      .player header > * {
        align-self: end;
      }

      .player .active {
        color: green;
      }

      .player .info {
        display: flex;
        flex-direction: column;
      }

      .player header .ships {
        margin: 0;
        padding: 0;
      }
      .player header .ships li {
        margin: 0;
        padding: 0 6px;
        display: inline-block;
      }
      .player header .ships li:first-child {
        padding-left: 0px;
      }

      .player header .ships li .cell {
        display: inline-block;
        width: 6px;
        height: 6px;
        background-color: white;
      }
      .player header .ships li .cell.hit {
        background-color: red;
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
                <div class="info">
                  <p class="${this.game.currentPlayer === playerIndex ? "active" : null}">${player.name}</p>
                  <ul class="ships">
                  ${this.game.boards[playerIndex].ships.map(ship => {
        const cells = this.game.boards[playerIndex].cells.filter(cell => cell.ship === ship.name)
        return html`<li class="${ship.name}">${cells.map(cell => {
          return html`<span class="cell ${cell.shot === GameEngine.hit ? 'hit' : null}"></span>`
        })}</li>`
      })}
                  <ul>
                <div>
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
