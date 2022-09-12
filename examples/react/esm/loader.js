import { p as promiseResolve, b as bootstrapLazy } from './index-19825f49.js';

/*
 Stencil Client Patch Esm v2.15.2 | MIT Licensed | https://stenciljs.com
 */
const patchEsm = () => {
    return promiseResolve();
};

const defineCustomElements = (win, options) => {
  if (typeof window === 'undefined') return Promise.resolve();
  return patchEsm().then(() => {
  return bootstrapLazy([["albs-button",[[1,"albs-button",{"type":[1],"loading":[1540],"disabled":[1540]}]]]], options);
  });
};

export { defineCustomElements };
