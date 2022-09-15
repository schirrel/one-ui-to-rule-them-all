import { p as promiseResolve, b as bootstrapLazy } from './index-f6ea0d03.js';

/*
 Stencil Client Patch Browser v2.18.0 | MIT Licensed | https://stenciljs.com
 */
const patchBrowser = () => {
    const importMeta = import.meta.url;
    const opts = {};
    if (importMeta !== '') {
        opts.resourcesUrl = new URL('.', importMeta).href;
    }
    return promiseResolve(opts);
};

patchBrowser().then(options => {
  return bootstrapLazy([["albs-button",[[1,"albs-button",{"type":[1],"loading":[1540],"disabled":[1540]}]]],["albs-input",[[1,"albs-input",{"placeholder":[1],"disabled":[1540],"required":[1540],"value":[1032],"inputmode":[1],"type":[1]}]]]], options);
});
