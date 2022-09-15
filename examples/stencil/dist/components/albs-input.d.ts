import type { Components, JSX } from "../types/components";

interface AlbsInput extends Components.AlbsInput, HTMLElement {}
export const AlbsInput: {
  prototype: AlbsInput;
  new (): AlbsInput;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
