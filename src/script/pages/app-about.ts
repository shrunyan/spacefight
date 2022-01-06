import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('app-about')
export class AppAbout extends LitElement {
  static get styles() {
    return css`

    #about {
        padding: 16px;
    }

    fluent-card {
      padding: 0px 18px 18px;
    }

    @media(prefers-color-scheme: light) {
      fluent-card {
        --fill-color: #edebe9;
      }
    }

    @media(prefers-color-scheme: dark) {
      fluent-card {
        --fill-color: #4e4e4e;
        color: white;
        border: none;
      }
    }

    @media (min-width: 1024px) {
      fluent-card {
        width: 54%;
      }
    }
    `;
  }

  constructor() {
    super();
  }

  render() {
    return html`
      <div id="about">
        <fluent-card>
          <h2>Built with Help From</h2>
          <ul>
            <li>https://pwabuilder.com</li>
            <li>https://robohash.org</li>
            <li>https://codepen.io/erikterwan/pen/EVzeRP</li>
          <ul>
        </fluent-card>
      </div>
    `;
  }
}
