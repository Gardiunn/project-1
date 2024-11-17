import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

export class siteCard extends DDDSuper(I18NMixin(LitElement)) {
  static get tag() {
    return "site-card";
  }

  constructor() {
    super();
    this.name = "Hax the Web";
    this.description = "A collection of web components for building websites";
    this.logo =
      "https://th.bing.com/th/id/OIP.SQQFm-oK6Lu_eMaiGGRI1AHaE8?rs=1&pid=ImgDetMain";
    this.createdTime = "2021-10-01";
    this.updatedTime = "2021-10-01";
  }

  // Lit reactive properties
  static get properties() {
    return {
      name: { type: String },
      description: { type: String },
      logo: { type: String },
      createdTime: { type: String },
      updatedTime: { type: String },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [
      super.styles,
      css`
        .card {
          display: flex;
          flex-direction: column;
          text-align: center;
        }
        .image {
          width: 75%;
          max-height: 200px;
          margin: var(--ddd-spacing-12) auto;
        }
        .logo {
          width: 100%;
          border-radius: var(--ddd-radius-md);
        }
        .dates {
          font-size: 12px;
          display: flex;
          flex-direction: row;
          justify-content: center;
          position: absolute;
          bottom: 0;
        }
        .info {
          position: absolute;
          bottom: var(--ddd-spacing-16);
        }
        .name {
          margin: 0 var(--ddd-spacing-8);
        }
        .changed {
          margin: 0 var(--ddd-spacing-4);
          font-style: italic;
          text-align: center;
        }
        .description {
          font-size: 16px;
          margin: var(--ddd-spacing-2) var(--ddd-spacing-4);
        }
      `,
    ];
  }

  // Lit render the HTML
  render() {
    return html`
      <div class="card">
        <div class="image">
          <img class="logo" src="${this.logo}" alt="${this.name}" />
        </div>
        <div class="info">
          <h2 class="name">${this.name}</h2>
          <p class="description">${this.description}</p>
        </div>

        <div class="dates">
          <div class="changed">Created ${this.createdTime}</div>
          <div class="changed">Updated ${this.updatedTime}</div>
        </div>
      </div>
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

globalThis.customElements.define(siteCard.tag, siteCard);
