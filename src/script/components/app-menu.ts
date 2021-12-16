import { LitElement, css, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';

@customElement('app-menu')
export class AppMenu extends LitElement {
  @property({ type: String }) title = 'Spacefight';

  @property() enableBack: boolean = false;

  static get styles() {
    return css`
      menu {
        align-items: center;
        margin: 0 10px;
        padding: 0;
        display: grid;
        grid-auto-flow: column;
        grid-gap: 10px;
        height: 50px;
      }
      menu a {
          align-items: center;
          justify-content: center;
          display: grid;
      }

      // @media(prefers-color-scheme: light) {
      //   header {
      //     color: black;
      //   }

      //   nav fluent-anchor::part(control) {
      //     color: initial;
      //   }
      // }
    `;
  }

  constructor() {
    super();
  }

  updated(changedProperties: any) {
    if (changedProperties.has('enableBack')) {
      console.log('enableBack', this.enableBack);
    }
  }

  render() {
    return html`
      <menu>
          <fluent-anchor href="/">
            ${this.title}
          </fluent-anchor>
          <fluent-anchor appearance="accent" href="/game">
            Play
          </fluent-anchor>
          <fluent-anchor href="/about">
            about
          </fluent-anchor>
      </menu>
    `;
  }
}
