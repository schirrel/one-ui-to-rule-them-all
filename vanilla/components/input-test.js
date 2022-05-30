const props = ["value", "placeholder"];
const propsIfEmptyTrue = ["required", "disabled"];

class ALBSInput extends HTMLElement {
  static formAssociated = true;
  static get observedAttributes() {
    return ["onChange", ...props, ...propsIfEmptyTrue];
  }

  setPropValues() {
    const self = this;

    props.forEach((prop) => {
      console.log(prop, this[`_${prop}`]);
      if (self[`_${prop}`]) self.input[prop] = self[`_${prop}`];
    });

    propsIfEmptyTrue.forEach((prop) => {
      console.log(prop, this[`_${prop}`]);
      if (self.hasOwnProperty([`_${prop}`])) {
        self.input[prop] = self[`_${prop}`];
      }
    });
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if (propsIfEmptyTrue.find((prop) => prop === attr)) {
      if (newValue !== false) {
        this[`_${attr}`] = true;
        return;
      }
    }

    this[`_${attr}`] = newValue;
    this.setPropValues();
  }
  formResetCallback() {
   this.setValue("")
  }

  constructor() {
    super();

    this.internals = this.attachInternals();

    this.input = null;
    const shadow = this.attachShadow({ mode: "open", delegatesFocus: true });
    const sheet = new CSSStyleSheet();
    sheet.insertRule(`
      input{
        border: none;
        border-bottom: 2px solid silver;
        box-shadow: rgb(0 0 0 / 20%) 2px 2px 5px 1px;
        cursor: pointer;
        padding: 4px 8px;
        outline: none;
        min-width: 100px;
        min-height: 40px;
        display: flex;
        margin: 10px;
        border-radius: 4px 4px 0 0;
        transition: box-shadow .3s ease
      }
  `);
    sheet.insertRule(`
  input:focus{
    border: none;
    border-bottom: 2px solid cornflowerblue;
    box-shadow: rgb(0 0 0 / 20%) 0px 0px 6px 2px;
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
    this.setValue(this._value || this.value || "");

    this.setPropValues();
  }

  setValue(v) {
    this.value = v;
    this.internals.setFormValue(this.value);
    this.setAttribute("value", this.value);
    this.dispatchEvent(new Event("change", { bubbles: true }, this.value));
    this.dispatchEvent(new Event("input", { bubbles: true }, this.value));
    if (this.onChange) {
      eval(this.onChange, this.value);
    }

    const reactHandler = Object.keys(this).find(
      (key) => key.indexOf("__reactEventHandlers") != -1
    );

    if (reactHandler && this[reactHandler]) {
      this[reactHandler].onChange(this.value);
    }
  }

  get type() {
    return this.getAttribute("type") || "text";
  }

  get form() {
    return this.internals.form;
  }
  get name() {
    return this.getAttribute("name");
  }
  get validity() {
    return this.internals.validity;
  }
  get validationMessage() {
    return this.internals.validationMessage;
  }
  get willValidate() {
    return this.internals.willValidate;
  }

  checkValidity() {
    return this.internals.checkValidity();
  }
  reportValidity() {
    return this.internals.reportValidity();
  }
}
window.customElements.define("albs-input", ALBSInput);
