class ALBSInput extends HTMLElement {
  static formAssociated = true;
  static get observedAttributes() {
    return ["placeholder"];
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    console.log(attr);
    this[`_${attr}`] = newValue;
    if (this.input) this.input[attr] = newValue;
  }
  constructor() {
    super();
    this.counter = 0;
    this.internals = this.attachInternals();
    this.setValue("");
    this.input = null;
    const shadow = this.attachShadow({ mode: "closed" });
    const sheet = new CSSStyleSheet();
    sheet.insertRule(`
      input{
        border: 1px solid cornflowerblue;
        box-shadow: rgb(0 0 0 / 20%) 2px 2px 5px 1px;
        cursor: pointer;
        padding: 4px 8px;
        outline: none;
        min-width: 100px;
        display: flex;
      }
  `);
    this.shadow = shadow;
    this.shadow.innerHTML = "";
    shadow.adoptedStyleSheets = [sheet];
  }
  // connect component
  connectedCallback() {
    this.input = document.createElement("input");

    this.input.type = this.type;
    if (this._placeholder) this.input.placeholder = this._placeholder;

    this.shadow.appendChild(this.input);

    // monitor input values
    this.shadow.querySelector("input").addEventListener("change", (e) => {
      this.setValue(e.target.value);
    });
    this.shadow.querySelector("input").addEventListener("input", (e) => {
      this.setValue(e.target.value);
    });
  }

  setValue(v) {
    this.value = v;
    this.internals.setFormValue(v);
    this.setAttribute("value", this.value);
  }

  get type() {
    return this.getAttribute("type") || "text";
  }
}
window.customElements.define("albs-input", ALBSInput);
