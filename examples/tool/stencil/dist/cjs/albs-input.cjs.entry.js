'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-776fa6ce.js');

const inputCss = ":host{display:flex}input{display:flex;border-color:coral;border-radius:4px;padding:4px 8px}input:invalid{border-color:crimson}input:valid{border-color:cadetblue}";

const Input = class {
  constructor(hostRef) {
    index.registerInstance(this, hostRef);
    this.inputEmitter = index.createEvent(this, "inputEmitter", 7);
    this.inputChangeEmitter = index.createEvent(this, "inputChangeEmitter", 7);
    this.changeEmitter = index.createEvent(this, "changeEmitter", 7);
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
    return index.h("input", { type: this.type, disabled: this.disabled, required: this.required, placeholder: this.placeholder, value: this.value, onInput: this.handleChange.bind(this) });
  }
  get element() { return index.getElement(this); }
  static get watchers() { return {
    "value": ["valueChanged"]
  }; }
};
Input.style = inputCss;

exports.albs_input = Input;
