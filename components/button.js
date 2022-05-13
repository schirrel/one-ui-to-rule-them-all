class ALBSButton extends HTMLElement {
  static get observedAttributes() {
    return ["type"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "type") {
      this.type = newValue;
    }
  }

  clickHandler(event) {
    event.stopPropagation();
    console.log("Inner click");
    switch (this.type) {
      case "submit":
        this.dispatchEvent(new SubmitEvent("submit", { bubbles: true }));
        break;
      case "reset":
        this.dispatchEvent(new Event("reset", { bubbles: true }));
        break;

      default:
        this.dispatchEvent(new Event("click", { bubbles: true }));
        break;
    }
  }
  constructor() {
    super();

    const template = document.createElement("template");

    template.innerHTML = `
              <button type="${this.type}">  <slot></slot> </button>
      `;

    const sheet = new CSSStyleSheet();
    sheet.insertRule(`

      button{
          padding: 8px 12px;
          background: cornflowerblue;
          outline: none;
          border: none;
      }
  `);

    this.shadow = this.attachShadow({ mode: "open" });
    const button = document.createElement("button");
    button.innerHTML = "<slot></slot>";
    button.addEventListener("click", (event) => this.clickHandler(event));
    this.shadow.appendChild(button);
    this.shadow.adoptedStyleSheets = [sheet];
  }
}
// Register the Custom Element:
window.customElements.define("albs-button", ALBSButton);
