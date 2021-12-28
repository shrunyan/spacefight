import { LitElement, css, html } from 'lit';
import { customElement } from 'lit/decorators.js';

import './app-home';

import { Router } from '@vaadin/router';

import '../components/app-menu';

@customElement('app-index')
export class AppIndex extends LitElement {
  static get styles() {
    return css`
      #routerOutlet {
        height: 100vh;
        width: 100vw;
      }

      #routerOutlet > .leaving {
        animation: 160ms fadeOut ease-in-out;
      }

      #routerOutlet > .entering {
        animation: 160ms fadeIn linear;
      }

      @keyframes fadeOut {
        from {
          opacity: 1;
        }

        to {
          opacity: 0;
        }
      }

      @keyframes fadeIn {
        from {
          opacity: 0.2;
        }

        to {
          opacity: 1;
        }
      }
    `;
  }

  constructor() {
    super();
  }

  firstUpdated() {
    // this method is a lifecycle even in lit
    // for more info check out the lit docs https://lit.dev/docs/components/lifecycle/

    // For more info on using the @vaadin/router check here https://vaadin.com/router
    const router = new Router(this.shadowRoot?.querySelector('#routerOutlet'));
    router.setRoutes([
      // temporarily cast to any because of a Type bug with the router
      {
        path: '',
        // animate: true,
        children: [
          { path: '/', component: 'app-home' },
          {
            path: '/about',
            component: 'app-about',
            action: async () => {
              await import('./app-about.js');
            },
          },
          {
            path: '/game',
            component: 'app-game',
            action: async () => {
              await import('./app-game.js');
            },
          },
        ],
      } as any,
    ]);
  }

  render() {
    return html`
      <div id="screen">
        <div id="routerOutlet"></div>
        <app-menu></app-menu>
      </div>
    `;
  }
}
