import { Component, Prop, Element, Event, h, EventEmitter, Watch } from '@stencil/core';

@Component({
  tag: 'albs-input',
  styleUrl: 'input.css',
  shadow: true,
})
export class Input {
  @Element() element!: HTMLElement;

  @Prop() placeholder: string;
  @Prop({ reflect: true, mutable: true }) disabled?: boolean = false;
  @Prop({ reflect: true, mutable: true }) required?: boolean = false;
  @Prop({ mutable: true }) value?: string | number | null = '';
  @Prop() inputmode?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url'; //https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode
  @Prop() type: 'date' | 'datetime-local' | 'email' | 'month' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url' | 'week' | 'datetime' = 'text'; //https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#attributes

  @Event() inputEmitter: EventEmitter;

  @Watch('value')
  protected valueChanged(newValue) {
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

  private setValue(value) {
    console.log('setValue', value);
    this.value = value;
    this.inputEmitter.emit(
      new InputEvent('input', {
        data: this.value as string,
      }),
    );
  }

  handleChange(event) {
    const input = event.target as HTMLInputElement | null;
    this.setValue(input?.value || '');
  }

  render() {
    return <input type={this.type} disabled={this.disabled} required={this.required} placeholder={this.placeholder} value={this.value} onInput={this.handleChange.bind(this)} />;
  }
}
