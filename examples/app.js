
      const type = window.location.search.replace("?", "");
      if (!type) window.location.href = window.location.origin;

      const loaders = {
        lit: () => {
          return new Promise((resolve) => {
            createScript([
              "../tool/lit/button/index.js",
              "../tool/lit/input/index.js",
            ]).then(() => {
              resolve();
            });
          });
        },
        stencil: () => {
          return new Promise((resolve) => {
            createScript([
              "../tool/stencil/dist/esm/polyfills/index.js",
              "../tool/stencil/dist/esm/albs.js",
              "../tool/stencil/dist/esm/index-f6ea0d03.js",
            ]).then(() => {
              resolve();
            });
          });
        },
        javascript: () => {
          return new Promise((resolve) => {
            createScript([
              "../tool/javascript/button.js",
              "../tool/javascript/input.js",
            ]).then(() => {
              resolve();
            });
          });
        },
      };

      const createScript = (urls, type = null) => {
        return new Promise((resolve) => {
          let loaded = 0;
          if (!urls.length) resolve();
          urls.forEach((url) => {
            const script = document.createElement("script");
            script.setAttribute("src", url);
            if (!type) script.setAttribute("type", "module");
            else script.setAttribute("type", type);

            script.onload = function handleScriptLoaded() {
              loaded++;
              if (loaded >= urls.length) {
                resolve();
              }
            };

            script.onerror = function handleScriptError() {
              console.log("error loading script");
            };

            document.head.appendChild(script);
          });
        });
      };

      loaders[type]?.();