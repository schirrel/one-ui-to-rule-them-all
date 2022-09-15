import { h } from '@stencil/core';
export class Input {
  constructor() {
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
  static get is() { return "albs-input"; }
  static get encapsulation() { return "shadow"; }
  static get originalStyleUrls() {
    return {
      "$": ["input.css"]
    };
  }
  static get styleUrls() {
    return {
      "$": ["input.css"]
    };
  }
  static get properties() {
    return {
      "placeholder": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "string",
          "resolved": "string",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "placeholder",
        "reflect": false
      },
      "disabled": {
        "type": "boolean",
        "mutable": true,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "disabled",
        "reflect": true,
        "defaultValue": "false"
      },
      "required": {
        "type": "boolean",
        "mutable": true,
        "complexType": {
          "original": "boolean",
          "resolved": "boolean",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "required",
        "reflect": true,
        "defaultValue": "false"
      },
      "value": {
        "type": "any",
        "mutable": true,
        "complexType": {
          "original": "string | number | null",
          "resolved": "number | string",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "value",
        "reflect": false,
        "defaultValue": "''"
      },
      "inputmode": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url'",
          "resolved": "\"decimal\" | \"email\" | \"none\" | \"numeric\" | \"search\" | \"tel\" | \"text\" | \"url\"",
          "references": {}
        },
        "required": false,
        "optional": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "inputmode",
        "reflect": false
      },
      "type": {
        "type": "string",
        "mutable": false,
        "complexType": {
          "original": "'date' | 'datetime-local' | 'email' | 'month' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url' | 'week' | 'datetime'",
          "resolved": "\"date\" | \"datetime\" | \"datetime-local\" | \"email\" | \"month\" | \"number\" | \"password\" | \"search\" | \"tel\" | \"text\" | \"time\" | \"url\" | \"week\"",
          "references": {}
        },
        "required": false,
        "optional": false,
        "docs": {
          "tags": [],
          "text": ""
        },
        "attribute": "type",
        "reflect": false,
        "defaultValue": "'text'"
      }
    };
  }
  static get events() {
    return [{
        "method": "inputEmitter",
        "name": "inputEmitter",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }, {
        "method": "inputChangeEmitter",
        "name": "inputChangeEmitter",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "InputChangeEventDetail",
          "resolved": "InputChangeEventDetail",
          "references": {
            "InputChangeEventDetail": {
              "location": "import",
              "path": "./types"
            }
          }
        }
      }, {
        "method": "changeEmitter",
        "name": "changeEmitter",
        "bubbles": true,
        "cancelable": true,
        "composed": true,
        "docs": {
          "tags": [],
          "text": ""
        },
        "complexType": {
          "original": "any",
          "resolved": "any",
          "references": {}
        }
      }];
  }
  static get elementRef() { return "element"; }
  static get watchers() {
    return [{
        "propName": "value",
        "methodName": "valueChanged"
      }];
  }
}
