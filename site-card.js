import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

export class siteCard extends DDDSuper(I18NMixin(LitElement)) {
  static get tag() {
    return "site-card";
  }

  constructor() {
    super();
    this.name = "";
    this.description = "";
    this.logo = "";
    this.createdTime = "";
    this.updatedTime = "";
    this.siteURL = "";
    this.sourceURL = "";
    this.theme = "#121212";
  }

  // Lit reactive properties
  static get properties() {
    return {
      name: { type: String },
      description: { type: String },
      logo: { type: String },
      createdTime: { type: String },
      updatedTime: { type: String },
      siteURL: { type: String },
      sourceURL: { type: String },
    };
  }

  // Lit scoped styles
  static get styles() {
    return [
      super.styles,
      css`
        .source {
          font-size: 12px;
          text-align: left;
          margin: 0 var(--ddd-spacing-2);
        }
        .card {
          display: flex;
          flex-direction: column;
          text-align: center;
          color: white;
          border-width: thick;
        }
        .image {
          width: 70%;
          max-height: 200px;
          margin: var(--ddd-spacing-4) var(--ddd-spacing-12);
          padding-bottom: var(--ddd-spacing-16);
        }
        .logo {
          width: 75%;
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
          width: 100%;
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
      <a class="source" href="${this.sourceURL}" target="_blank"
        >Open site source</a
      >
      <a href="${this.siteURL}" target="_blank">
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
      </a>
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
