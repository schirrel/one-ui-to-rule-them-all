import { html, css, LitElement } from 'lit';
import { property, query } from 'lit/decorators.js';

interface AnyProp extends LitElement {
  [elem: string]: any
}

export class AlbsInput extends LitElement {
  static styles = css`
    :host {
      display: block;
      padding: 25px;
      color: var(--albs-input-text-color, #000);
    }
  `;

  @property({ type: String }) type: 'date' | 'datetime-local' | 'email' | 'month' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url' | 'week' | 'datetime' = 'text'; //https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attributes
  @property({ type: String }) inputmode: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url' = "text"; //https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode
  @property({ type: String }) placeholder = "";
  @property({ reflect: true, }) disabled?: boolean = false;
  @property({ reflect: true, }) required?: boolean = false;

  @query("input") element!: HTMLInputElement;

  @property({}) set value(value: string | number | null) {
    console.log("value change")
    const oldValue = this.__value;
    this.__value = value;
    this.requestUpdate("value", oldValue);
  }
  get value() {
    return this.__value;
  }

  private __value: string | number | null = null;

  render() {
    return html`
       <input type="${this.type}"   ?disabled="${this.disabled}"
      ?required="${this.required}"
      placeholder="${this.placeholder}" 
      value="${this.value}" 
      @input="${this.handleChange}" />

    `;
  }

  //work around to find if react registred this component
  get reactHandler() {
    return Object.keys(this).find(key => key.indexOf('__reactEventHandlers') != -1);
  }

  handleChange(event: Event) {
    event.stopPropagation();
    this.__value = this.element.value
    if (this.reactHandler) {
      //workaround to call on change from react
      (this as AnyProp)[this.reactHandler].onChange(this.__value)
    }
    else {

      // react doesnot accept below events
      this.dispatchEvent(new InputEvent("input", { "bubbles": true, data: this.__value, }))
      this.dispatchEvent(new InputEvent("beforeinput", { "bubbles": true, data: this.__value, }))

    }
  }
}
