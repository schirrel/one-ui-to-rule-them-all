import { p as promiseResolve, b as bootstrapLazy } from './index-19825f49.js';

/*
 Stencil Client Patch Browser v2.15.2 | MIT Licensed | https://stenciljs.com
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
  return bootstrapLazy([["albs-button",[[1,"albs-button",{"type":[1],"loading":[1540],"disabled":[1540]}]]]], options);
});
