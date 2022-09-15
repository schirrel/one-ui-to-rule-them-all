'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const index = require('./index-776fa6ce.js');

/*
 Stencil Client Patch Esm v2.18.0 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    return index.promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return index.bootstrapLazy([["albs-button.cjs",[[1,"albs-button",{"type":[1],"loading":[1540],"disabled":[1540]}]]],["albs-input.cjs",[[1,"albs-input",{"placeholder":[1],"disabled":[1540],"required":[1540],"value":[1032],"inputmode":[1],"type":[1]}]]]], options);
  });
};

exports.defineCustomElements = defineCustomElements;
