import { LitElement, css, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';

@customElement('app-menu')
export class AppMenu extends LitElement {
  @property({ type: String }) title = 'Spacefight';

  @property() enableBack: boolean = false;

  static get styles() {
    return css`
      #menuToggle {
        display: block;
        position: fixed;
        bottom: 10px;
        right: 10px;

        z-index: 1;

        -webkit-user-select: none;
        user-select: none;
      }

        #menuToggle a {
          // text-align: right;
        text-decoration: none;
        color: #232323;

        transition: color 0.3s ease;
      }

      #menuToggle a:hover
      {
        color: tomato;
      }


      #menuToggle input
      {
        display: block;
        width: 40px;
        height: 32px;
        position: absolute;
        top: -7px;
        left: -5px;

        cursor: pointer;

        opacity: 0; /* hide this */
        z-index: 2; /* and place it over the hamburger */

        -webkit-touch-callout: none;
      }

      /*
      * Just a quick hamburger
      */
      #menuToggle span
      {
        display: block;
        width: 33px;
        height: 4px;
        margin-bottom: 5px;
        position: relative;

        background: #cdcdcd;
        border-radius: 3px;

        z-index: 1;

        transform-origin: 4px 0px;

        transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                    background 0.5s cubic-bezier(0.77,0.2,0.05,1.0),
                    opacity 0.55s ease;
      }

      #menuToggle span:first-child
      {
        transform-origin: 0% 0%;
      }

      #menuToggle span:nth-last-child(2)
      {
        transform-origin: 0% 100%;
      }

      /*
      * Transform all the slices of hamburger
      * into a crossmark.
      */
      #menuToggle input:checked ~ span
      {
        opacity: 1;
        transform: rotate(45deg) translate(-2px, -1px);
        background: #232323;
      }

      /*
      * But let's hide the middle one.
      */
      #menuToggle input:checked ~ span:nth-last-child(3)
      {
        opacity: 0;
        transform: rotate(0deg) scale(0.2, 0.2);
      }

      /*
      * Ohyeah and the last one should go the other direction
      */
      #menuToggle input:checked ~ span:nth-last-child(2)
      {
        transform: rotate(-45deg) translate(0, -1px);
      }

      /*
      * Make this absolute positioned
      * at the top left of the screen
      */
      #menu {
        position: fixed;
        width: 130px;
        margin: -100px 0 0 -50px;
        padding: 10px 20px;
        background: #ededed;
        list-style-type: none;
        -webkit-font-smoothing: antialiased;
        transform-origin: 0% 0%;
        transform: translate(100%, 0);
        transition: transform 0.5s cubic-bezier(0.77,0.2,0.05,1.0);
        bottom: 0;
        right: 0;
      }

      #menu li {
        padding: 10px 0;
        font-size: 22px;
      }

      /*
      * And let's slide it in from the left
      */
      #menuToggle input:checked ~ ul
      {
        transform: none;
      }
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
    <nav role="navigation">
      <div id="menuToggle">
        <!--
        A fake / hidden checkbox is used as click reciever,
        so you can use the :checked selector on it.
        -->
        <input type="checkbox" />

        <!--
        Some spans to act as a hamburger.

        They are acting like a real hamburger,
        not that McDonalds stuff.
        -->
        <span></span>
        <span></span>
        <span></span>

        <ul id="menu">
          <a href="/"><li>Home</li></a>
          <a href="/about"><li>About</li></a>
          <a href="/game"><li>Play</li></a>
        </ul>
      </div>
    </nav>
    `;
  }
}
