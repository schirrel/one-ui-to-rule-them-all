import type { Components, JSX } from "../types/components";

interface AlbsButton extends Components.AlbsButton, HTMLElement {}
export const AlbsButton: {
  prototype: AlbsButton;
  new (): AlbsButton;
};
/**
 * Used to define this component and all nested components recursively.
 */
export const defineCustomElement: () => void;
