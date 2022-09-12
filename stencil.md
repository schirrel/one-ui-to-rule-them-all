# one-ui-to-rule-them-all

This is a study on web-component or simething-like to build reusable components for both Vue and React.

So far we have some options to study:

- Plain Web Components | [Web Components](https://www.webcomponents.org/) | [Open WC](https://open-wc.org/) 
- Lit (Polymer evolutions) | [Docs](https://lit.dev/docs/)
- Mitosis | [Docs](https://github.com/BuilderIO/mitosis) |  [Tutorial](https://blog.logrocket.com/creating-reusable-components-mitosis-builder-io/)
- Stencil | [Docs](https://stenciljs.com/) | [Example](https://github.com/ionic-team/ionic-framework/tree/main/core)




## Stencil
### Vanilla
Works like a charm, obviously

### Vue
Works 99.99% so far, only button `reset` event, but as far as Evan has wrote [here](https://github.com/vuejs/vue/issues/833), its was a decision make during the development of Vue

### React
So far working pretty well, but we have to take attention to:
- React form/state change listem to `onChange` event, which is not a native event, so is quite annoying to do a work around.   
React create a prop at the element called `__reactEventHandlers` plus a hash of the component, this prop has a callable `onChange` function.  

So by now we have two work arounds:
- have take this props and call `onChange` inside it
- use the `onInput` instead of `onChange`

As far as i have seen about it, this is pretty much a common solution for any approach.