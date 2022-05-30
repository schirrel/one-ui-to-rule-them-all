class ALBSButton extends HTMLElement {
  static get observedAttributes() {
    return ["type"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "type") {
      this.type = newValue;
    }
    this.render();
  }

  clickHandler(event) {
    event.stopPropagation();
    console.log("Inner click");
    switch (this.type) {
      case "submit":
        this.dispatchEvent(new Event("submit", { bubbles: true }));
        if (this.parentElement && this.parentElement.nodeName === "FORM") {
          this.parentElement.requestSubmit();
        }
        break;
      case "reset":
        this.dispatchEvent(new Event("reset", { bubbles: true }));
        if (this.parentElement && this.parentElement.nodeName === "FORM") {
          this.parentElement.reset();
        }
        break;

      default:
        this.dispatchEvent(new Event("click", { bubbles: true }));
        break;
    }
  }

  render() {
    this.button = document.createElement("button");
    this.button.type = this.type;
    this.button.innerHTML = "<slot></slot>";
    this.button.addEventListener("click", (event) => this.clickHandler(event));
    this.shadow.innerHTML = "";
    this.shadow.appendChild(this.button);
  }
  constructor() {
    super();
    this.type = "button";

    const sheet = new CSSStyleSheet();
    sheet.insertRule(`
      button{
        background: cornflowerblue;
        border: 2px solid transparent;
        border-radius: 20px;
        box-shadow: rgb(0 0 0 / 20%) 2px 2px 5px 1px;
        cursor: pointer;
        padding: 8px 12px;
        outline: none;
        transition: background 0.4s ease-in-out, box-shadow 0.2s ease-in-out;
      }
  `);
    sheet.insertRule(`
  button:hover{
    background: dodgerblue;
    box-shadow: rgb(0 0 0 / 50%) 0px 0px 4px 1px;
  }`);
    this.shadow = this.attachShadow({ mode: "open" });
    this.shadow.adoptedStyleSheets = [sheet];
    this.render();
  }
}
// Register the Custom Element:
window.customElements.define("albs-button", ALBSButton);
