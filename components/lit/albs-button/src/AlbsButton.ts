import { html, css, LitElement } from "lit";
import { property } from "lit/decorators.js";

export class AlbsButton extends LitElement {

  @property({ type: String }) type: "submit" | "reset" | "button" = "button";
  @property({ type: Boolean }) disabled = false;
  @property({ type: Boolean }) loading = false;

  // Styles are scoped to this element: they won't conflict with styles
  // on the main page or in other components. Styling API can be exposed
  // via CSS custom properties.
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

  button[disabled] {
    background: gray;
    cursor: not-allowed;
    opacity: 0.5;
  }
  button[disabled="false"] {
    pointer-events:all
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

  constructor() {
    super();
  }

  render() {
    console.log(this.type, this.disabled)
    return html`
      <button @click=${this.handleClick}
      ?disabled="${this.disabled}"
        type="${this.type}"
        >
        ${this.loading
        ? html`<span class="albs-button--loading"></span>`
        : html``}
        <slot/>
      </button>
    `;
  }

  handleClick(event: Event) {
    console.log("handleClick")
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
          console.log(form)
          form.reset();
        } else {
          throw "Button reset must be inside a form"
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
}
