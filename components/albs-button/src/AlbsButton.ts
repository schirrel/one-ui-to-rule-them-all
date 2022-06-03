import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";

export class AlbsButton extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 25px;
      color: var(--albs-button-text-color, #000);
    }

    button {
      background: royalblue;
      padding: 8px 10px;
      border-radius: 16px;
      border: 1px solid white;
      color: white;
      cursor: pointer;
    }
    button[type="submit"] {
      background: goldenrod;
    }

    button[type="reset"] {
      background: crimson;
    }

    button[disabled="true"] {
      background: gray;
      cursor: not-allowed;
      opacity: 0.5;
    }
    .albs-button--loading {
      display: inline-block;
      padding: 0 8px;
    }
    .albs-button--loading:after {
      content: "   ";
      width: 10px;
      display: inline-block;
      text-align: left;
      animation: spin 2s linear infinite;
    }
    @keyframes spin {
      0 {
        content: "   ";
      }
      30% {
        content: ".  ";
      }
      60% {
        content: ".. ";
      }
      100% {
        content: "...";
      }
    }
  `;

  @property({ type: String }) type: "submit" | "reset" | "button" = "button";
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) loading = false;

  handleClick(event: Event) {
    event.stopPropagation();

    if (this.loading || this.disabled) return;
    const form = this.closest("form");

    switch (this.type) {
      case "submit":
        if (form) {
          form.requestSubmit();
        }
        break;
      case "reset":
        if (form) {
          form.reset();
        }

        break;
      case "button":
      default:
        this.dispatchEvent(
          new CustomEvent("click", {
            bubbles: true,
            composed: true,
          })
        );
        break;
    }
  }
  render() {
    return html`
      <button
        disabled="${this.disabled}"
        type="${this.type}"
        @click=${this.handleClick}
      >
        ${this.loading
          ? html`<span class="albs-button--loading"></span>`
          : html``}
        <slot></slot>
      </button>
    `;
  }
}
