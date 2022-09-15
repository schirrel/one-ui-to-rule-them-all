import { EventEmitter } from '../../stencil-public-runtime';
export declare class Button {
  formFunctions: {
    reset: string;
    submit: string;
  };
  element: HTMLElement;
  type: 'submit' | 'reset' | 'button';
  loading: boolean;
  disabled: boolean;
  clickEmitter: EventEmitter;
  private onClick;
  render(): any;
}
