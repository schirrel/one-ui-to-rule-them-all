'use strict';

const index = require('./index-776fa6ce.js');

/*
 Stencil Client Patch Browser v2.18.0 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = (typeof document === 'undefined' ? new (require('u' + 'rl').URL)('file:' + __filename).href : (document.currentScript && document.currentScript.src || new URL('albs.cjs.js', document.baseURI).href));
    const opts = {};
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    return index.promiseResolve(opts);
};

patchBrowser().then(options => {
  return index.bootstrapLazy([["albs-button.cjs",[[1,"albs-button",{"type":[1],"loading":[1540],"disabled":[1540]}]]],["albs-input.cjs",[[1,"albs-input",{"placeholder":[1],"disabled":[1540],"required":[1540],"value":[1032],"inputmode":[1],"type":[1]}]]]], options);
});
