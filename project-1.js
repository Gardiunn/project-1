/**
 * Copyright 2024 Benjamin Hauk
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
 * `project-1`
 *
 * @demo index.html
 * @element project-1
 */
export class project1 extends DDDSuper(I18NMixin(LitElement)) {
  static get tag() {
    return "project-1";
  }

  constructor() {
    super();
  }

  // Lit reactive properties
  static get properties() {
    return {};
  }

  // Lit scoped styles
  static get styles() {
    return [
      super.styles,
      css`
        :host {
        }
        #input {
          width: 50%;
          font-size: 24px;
          padding: var(--ddd-spacing-4);
        }
        #analyze {
          font-size: 24px;
          padding: var(--ddd-spacing-4);
          margin-left: var(--ddd-spacing-2);
        }
        #inputs {
          display: flex;
          justify-content: center;
          margin: var(--ddd-spacing-4);
        }

        #results {
          border: var(--ddd-border-md);
          height: 500px;
          width: 75%;
        }
      `,
    ];
  }

  // Lit render the HTML
  render() {
    return html`
      <div id="inputs">
        <input id="input" placeholder="Site address here" />
        <button id="analyze">Analyze</button>
      </div>

      <div id="results"></div>
    `;
  }

  /**
   * haxProperties integration via file reference
   */
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }
}

globalThis.customElements.define(project1.tag, project1);
