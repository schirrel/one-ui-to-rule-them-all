import { proxyCustomElement, HTMLElement, createEvent, h } from '@stencil/core/internal/client';

const inputCss = ":host{display:flex}input{display:flex;border-color:coral;border-radius:4px;padding:4px 8px}input:invalid{border-color:crimson}input:valid{border-color:cadetblue}";

const Input = /*@__PURE__*/ proxyCustomElement(class extends HTMLElement {
  constructor() {
    super();
    this.__registerHost();
    this.__attachShadow();
    this.inputEmitter = createEvent(this, "inputEmitter", 7);
    this.inputChangeEmitter = createEvent(this, "inputChangeEmitter", 7);
    this.changeEmitter = createEvent(this, "changeEmitter", 7);
    this.disabled = false;
    this.required = false;
    this.value = '';
    this.type = 'text'; //https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attributes
  }
  valueChanged(newValue) {
    if (newValue !== this.value) {
      this.setValue(newValue);
    }
  }
  // Maybe this is not necessary as vue is suposed to dont clean the input value on reset (https://github.com/vuejs/vue/issues/833)
  // connectedCallback() {
  //   const form = this.element.closest('form');
  //   if (form) {
  //     form.addEventListener('reset', () => {
  //       this.setValue('');
  //     });
  //   }
  // }
  setValue(value) {
    this.value = value;
    this.inputEmitter.emit(new InputEvent('input', {
      data: this.value,
    }));
    this.inputEmitter.emit(new InputEvent('beforeinput', {
      data: this.value,
    }));
    /* nothing of this works with onChange for react
    this.inputEmitter.emit(
      new CustomEvent('change', {
        detail: {
          value,
        },
      }),
    );
    this.changeEmitter.emit('change', { value });

    this.inputEmitter.emit(
      new InputEvent('change', {
        data: this.value as string,
      }),
    );
    this.inputChangeEmitter.emit({ value: this.value.toString() });
*/
    // only this works with onChange of react
    // if (this.reactHandler) {
    //   this.element[this.reactHandler].onChange({
    //     target: this.element,
    //     data: this.value as string,
    //   });
    // }
  }
  get reactHandler() {
    return Object.keys(this.element).find(key => key.indexOf('__reactEventHandlers') != -1);
  }
  handleChange(event) {
    const input = event.target;
    this.setValue((input === null || input === void 0 ? void 0 : input.value) || '');
  }
  render() {
    return h("input", { type: this.type, disabled: this.disabled, required: this.required, placeholder: this.placeholder, value: this.value, onInput: this.handleChange.bind(this) });
  }
  get element() { return this; }
  static get watchers() { return {
    "value": ["valueChanged"]
  }; }
  static get style() { return inputCss; }
}, [1, "albs-input", {
    "placeholder": [1],
    "disabled": [1540],
    "required": [1540],
    "value": [1032],
    "inputmode": [1],
    "type": [1]
  }]);
function defineCustomElement$1() {
  if (typeof customElements === "undefined") {
    return;
  }
  const components = ["albs-input"];
  components.forEach(tagName => { switch (tagName) {
    case "albs-input":
      if (!customElements.get(tagName)) {
        customElements.define(tagName, Input);
      }
      break;
  } });
}

const AlbsInput = Input;
const defineCustomElement = defineCustomElement$1;

export { AlbsInput, defineCustomElement };
