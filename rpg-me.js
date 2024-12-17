/**
 * Copyright 2024 eglicky
 * @license Apache-2.0, see LICENSE for full text.
 */

import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "@haxtheweb/rpg-character/rpg-character.js";
import "wired-elements";

export class RpgMe extends DDDSuper(I18NMixin(LitElement)) {
  static get tag() {
    return "rpg-me";
  }

  constructor() {
    super();
    this.title = "Design Your Character";
    this.character = {
      seed: "0000000000",
      accessories: 0,
      base: 0,
      leg: 0,
      face: 0,
      faceItem: 0,
      hair: 0,
      pants: 0,
      shirt: 0,
      skin: 0,
      hatColor: 0,
      hat: "none",
      fire: false,
      walking: false,
      circle: false,
    };
    console.log(this.character.seed);
    this._applySeedToSettings(); // Ensure consistent character style on initialization
  }

  static get properties() {
    return {
      ...super.properties,
      character: { type: Object },
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          font-family: var(--ddd-font-navigation);
        }
        .container {
          display: flex;

          gap: var(--ddd-spacing-5);
          justify-content: center;
          align-items: flex-start;
          padding: var(--ddd-spacing-5);
        }
        .character-preview {
          flex: 1;
          min-width: 300px;
          text-align: center;
          position: relative;
          width: 50%;
        }
        .character-preview rpg-character {
          width: 50%;
          transition: height 0.3s ease, width 0.3s ease;
        }
        .seed-display {
          color: white;
        }
        .controls {
          min-width: 300px;
          text-align: left;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--ddd-spacing-5);
        }
        wired-input,
        wired-checkbox,
        wired-slider,
        #genderContainer {
          display: block;
          margin-bottom: var(--ddd-spacing-4);
          height: 40px;
          max-width: 300px;
        }

        label {
          display: block;
          font-size: 14px;
          font-weight: bold;
          margin-bottom: var(--ddd-spacing-1);
        }
        button {
          margin-top: var(--ddd-spacing-3);
          padding: var(--ddd-spacing-3) var(--ddd-spacing-5);
          cursor: pointer;
          background-color: var(--ddd-primary-color);
          color: white;
          border-radius: var(--ddd-spacing-1);
          font-size: 12px;
          transition: background-color 0.3s ease, border-color 0.3s ease;
        }
        button:hover {
          background-color: #0056b3;
          border-color: #004085;
        }
        .character-name {
          font-size: 1.5rem;
          margin-bottom: var(--ddd-spacing-3);
        }
        .notification {
          position: fixed;
          bottom: var(--ddd-spacing-5);
          right: var(--ddd-spacing-5);
          background-color: #28a745;
          color: white;
          padding: var(--ddd-spacing-3) var(--ddd-spacing-4);
          border-radius: var(--ddd-spacing-1);
          font-size: 14px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
          opacity: 0;
          transition: opacity 0.5s ease-in-out;
          z-index: 1000;
        }
        .notification.show {
          opacity: 1;
        }
      `,
    ];
  }

  render() {
    return html`
      <div class="container">
        <div class="character-preview">
          <div class="seed-display">Seed: ${this.character.seed}</div>
          <div class="character-name">${this.character.name}</div>
          <rpg-character
            accessories="${this.character.accessories}"
            base="${this.character.base}"
            face="${this.character.face}"
            faceItem="${this.character.faceItem}"
            hair="${this.character.hair}"
            pants="${this.character.pants}"
            shirt="${this.character.shirt}"
            skin="${this.character.skin}"
            hatColor="${this.character.hatColor}"
            .fire="${this.character.fire}"
            .walking="${this.character.walking}"
          ></rpg-character>
        </div>
        <div class="controls">
          <div>
            <label for="characterNameInput">Character Name:</label>
            <wired-input
              id="characterNameInput"
              type="text"
              placeholder="Enter character name"
              @input="${(e) => this._updateSetting("name", e.target.value)}"
            ></wired-input>

            <label for="genderContainer">Gender:</label>
            <div id="genderContainer">
              <wired-button
                elevation="3"
                @click="${(e) => this._toggleGender(e)}"
                id="maleButton"
                >Male</wired-button
              >
              <wired-button
                @click="${(e) => this._toggleGender(e)}"
                id="femaleButton"
                >Female</wired-button
              >
            </div>

            <label for="accessories">Accessories:</label>
            <wired-slider
              id="accessories"
              value="${this.character.accessories}"
              min="0"
              max="9"
              @change="${(e) =>
                this._updateSetting("accessories", parseInt(e.detail.value))}"
            ></wired-slider>

            <label for="face">Face:</label>
            <wired-slider
              id="face"
              value="${this.character.face}"
              min="0"
              max="5"
              @change="${(e) =>
                this._updateSetting("face", parseInt(e.detail.value))}"
            ></wired-slider>

            <label for="faceItem">Face Item:</label>
            <wired-slider
              id="faceItem"
              value="${this.character.faceItem}"
              min="0"
              max="9"
              @change="${(e) =>
                this._updateSetting("faceItem", parseInt(e.detail.value))}"
            ></wired-slider>

            <wired-checkbox
              ?checked="${this.character.fire}"
              @change="${(e) => this._updateSetting("fire", e.target.checked)}"
              >On Fire</wired-checkbox
            >
          </div>
          <div class="rightControls">
            <label for="hair">Hair Style:</label>
            <wired-slider
              id="hair"
              value="${this.character.hair}"
              min="0"
              max="9"
              @change="${(e) =>
                this._updateSetting("hair", parseInt(e.detail.value))}"
            ></wired-slider>

            <label for="pants">Pants Style:</label>
            <wired-slider
              id="pants"
              value="${this.character.pants}"
              min="0"
              max="9"
              @change="${(e) =>
                this._updateSetting("pants", parseInt(e.detail.value))}"
            ></wired-slider>

            <label for="shirt">Shirt Style:</label>
            <wired-slider
              id="shirt"
              value="${this.character.shirt}"
              min="0"
              max="9"
              @change="${(e) =>
                this._updateSetting("shirt", parseInt(e.detail.value))}"
            ></wired-slider>

            <label for="skin">Skin Tone:</label>
            <wired-slider
              id="skin"
              value="${this.character.skin}"
              min="0"
              max="9"
              @change="${(e) =>
                this._updateSetting("skin", parseInt(e.detail.value))}"
            ></wired-slider>

            <label for="hatColor">Hat Color:</label>
            <wired-slider
              id="hatColor"
              value="${this.character.hatColor}"
              min="0"
              max="9"
              @change="${(e) =>
                this._updateSetting("hatColor", parseInt(e.detail.value))}"
            ></wired-slider>

            <wired-checkbox
              ?checked="${this.character.walking}"
              @change="${(e) =>
                this._updateSetting("walking", e.target.checked)}"
              >Walking</wired-checkbox
            >
          </div>

          <button @click="${this._generateShareLink}">Share</button>
        </div>
      </div>
      <div id="notification" class="notification"></div>
    `;
  }

  _applySeedToSettings() {
    const seed = this.character.seed;
    const paddedSeed = seed.padStart(8, "0").slice(0, 8);
    const values = paddedSeed.split("").map((v) => parseInt(v, 10));

    [
      this.character.accessories,
      this.character.base,
      this.character.face,
      this.character.faceItem,
      this.character.hair,
      this.character.pants,
      this.character.shirt,
      this.character.hatColor,
    ] = values;

    this.requestUpdate(); // Ensure UI updates after applying settings
  }

  _toggleGender(e) {
    const maleButton = this.shadowRoot.getElementById("maleButton");
    const femaleButton = this.shadowRoot.getElementById("femaleButton");

    if (e.target.id === "maleButton") {
      maleButton.elevation = 3;
      femaleButton.elevation = 1;
      this.character.base = 0;
    } else {
      maleButton.elevation = 1;
      femaleButton.elevation = 3;
      this.character.base = 1;
    }
    this.requestUpdate();
  }

  _generateSeed() {
    const {
      accessories,
      base,
      leg,
      face,
      faceItem,
      hair,
      pants,
      shirt,
      skin,
      hatColor,
    } = this.character;
    this.character.seed = `${accessories}${base}${leg}${face}${faceItem}${hair}${pants}${shirt}${skin}${hatColor}`;
  }

  _updateSetting(key, value) {
    this.character = { ...this.character, [key]: value };
    this._generateSeed();
    this.requestUpdate();
  }

  _generateShareLink() {
    const baseUrl = window.location.href.split("?")[0];
    const params = new URLSearchParams({
      seed: this.character.seed,
    }).toString();
    const shareLink = `${baseUrl}?${params}`;

    navigator.clipboard.writeText(shareLink).then(
      () => this._showNotification("Link copied!"),
      (err) => this._showNotification(`Error: ${err}`)
    );
  }

  _showNotification(message) {
    const notification = this.shadowRoot.getElementById("notification");
    notification.textContent = message;
    notification.classList.add("show");

    setTimeout(() => {
      notification.classList.remove("show");
    }, 2000);
  }

  connectedCallback() {
    super.connectedCallback();
    const params = new URLSearchParams(window.location.search);

    if (params.has("seed")) {
      this.character.seed = params.get("seed");
      console.log(this.character.seed);
      this._applySeedToSettings(); // Apply the seed to settings
    }

    this.requestUpdate();
  }
}

globalThis.customElements.define(RpgMe.tag, RpgMe);
