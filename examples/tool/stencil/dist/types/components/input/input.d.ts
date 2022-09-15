import { EventEmitter } from '../../stencil-public-runtime';
import { InputChangeEventDetail } from './types';
export declare class Input {
  element: HTMLElement;
  placeholder: string;
  disabled?: boolean;
  required?: boolean;
  value?: string | number | null;
  inputmode?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
  type: 'date' | 'datetime-local' | 'email' | 'month' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url' | 'week' | 'datetime';
  inputEmitter: EventEmitter;
  inputChangeEmitter: EventEmitter<InputChangeEventDetail>;
  changeEmitter: any;
  protected valueChanged(newValue: any): void;
  private setValue;
  get reactHandler(): string;
  handleChange(event: any): void;
  render(): any;
}
