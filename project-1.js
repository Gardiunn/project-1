/**
 * Copyright 2024 Benjamin Hauk
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import { siteCard } from "./site-card";

let items = [];
let title = "";
let siteURL = "";

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
        #controls {
          display: flex;
          justify-content: center;
          margin: var(--ddd-spacing-4);
        }

        #results {
          display: flex;
          flex-wrap: wrap;
        }
        #title {
          text-align: center;
        }
        #overview {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
        }
        site-card {
          width: 20%;
          min-width: 300px;
          margin: var(--ddd-spacing-10);
          border: 1px solid white;
          position: relative;
          padding-bottom: 232px;
        }
      `,
    ];
  }

  // Lit render the HTML
  render() {
    return html`
      <div id="controls">
        <input id="input" placeholder="Site address here" />
        <button id="analyze" @click=${this.analyzeSite}>Analyze</button>
      </div>

      <div id="overview"></div>

      <div id="results"></div>
    `;
  }

  dateToString(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toUTCString();
  }

  checkSite() {
    // Get the input value
    const input = this.shadowRoot.getElementById("input");
    let site = input.value;
    // If the user didn't include site.json, add it
    if (!input.value.includes("site.json")) {
      site = input.value + "/site.json";
    }
    siteURL = site.replace("/site.json", "");
    return site;
  }

  async analyzeSite() {
    try {
      // Get the JSON data
      const site = this.checkSite();
      if (!site) {
        throw new Error("Invalid site URL");
      }

      const response = await fetch(site);
      if (!response.ok) {
        throw new Error("Failed to fetch site data");
      }

      const data = await response.json();

      // Get overview info
      const name = data.metadata.site.name;
      const description = data.description;
      const logo = siteURL + "/" + data.metadata.site.logo;
      const created = this.dateToString(data.metadata.site.created);
      const updated = this.dateToString(data.metadata.site.updated);
      const theme = data.metadata.theme.variables.hexCode;

      // Get overview container
      const overContainer = this.shadowRoot.getElementById("overview");
      // Clear container
      overContainer.innerHTML = "";

      // Create overview card
      const overview = document.createElement("site-card");
      overview.name = name;
      overview.description = description;
      overview.logo = logo;
      overview.createdTime = created;
      overview.updatedTime = updated;
      overview.siteURL = siteURL;
      overview.style.borderColor = theme;

      overContainer.appendChild(overview);

      // Get items array
      const items = data.items;

      // get container
      const container = this.shadowRoot.getElementById("results");
      // clear container
      container.innerHTML = "";

      for (let i = 0; i < items.length; i++) {
        const card = document.createElement("site-card");

        card.name = items[i].title;
        card.description = items[i].description;
        card.createdTime = this.dateToString(items[i].metadata.created);
        card.updatedTime = this.dateToString(items[i].metadata.updated);
        card.siteURL = siteURL + "/" + items[i].slug;
        card.sourceURL = siteURL;
        card.style.borderColor = theme;

        if (items[i].metadata.images.length == 0) {
          card.logo =
            "https://iam.hax.psu.edu/bmh6200/sites/256/assets/banner.jpg";
        } else {
          card.logo = siteURL + "/" + items[i].metadata.images[0];
        }
        container.appendChild(card);
      }
    } catch (error) {
      console.error("Error analyzing site:", error);
      const container = this.shadowRoot.getElementById("title");
      container.innerHTML = `<p>Error: ${error.message}</p>`;
    }
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
