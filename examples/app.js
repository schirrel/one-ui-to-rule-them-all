import poli from "stencil/dist/esm/polyfills/index.js"
import "stencil/dist/esm/albs.js"
import "stencil/dist/esm/index-f6ea0d03.js"

const viewer = document.querySelector("#viewer");
const loaders = {
  lit: () => {},
  stencil: () => {
    return new Promise((resolve) => {
      createScript([
        "stencil/dist/esm/polyfills/index.js",
        "stencil/dist/esm/albs.js",
        "stencil/dist/esm/index-f6ea0d03.js",
      ]).then(() => {
        resolve();
      });
    });
  },
  javascript: () => {},
};
const html = {
  javascript: `<form name="form" action="">
      <albs-input type="text" required name="myinput"> </albs-input>

      <!-- <button id="submitNative" type="submit"> Submit</button> -->
      <albs-button id="submit" type="submit"
        >Web Component Button - Submit</albs-button
      >
      <albs-button id="reset" type="reset"
        >Web Component Button - reset</albs-button
      >
      <!-- onclick não funciona -->
      <albs-button id="button">
        Web Component Button <span> 0 </span></albs-button
      >
    </form>`,
  vue: ` <div id="app">
  {{message}}
  </albs-input>
  <albs-button @click="increment">
    Web Component Button {{ count }}</albs-button
  >

  <hr />
  <h2>Form</h2>
  <form v-on:submit="submittedForm">
    <input type="text"  v-model="message" /> <input type="email" required="" />
    <albs-button type="submit">Submit</albs-button>
    <albs-button type="reset">Reset</albs-button>
  </form>
</div>
`,
  react: `<div id="root"></div>
    `,
};

const fws = {
  vue: ["https://cdn.jsdelivr.net/npm/vue"],
  react: [
    "https://unpkg.com/react@16.7.0/umd/react.production.min.js",
    "https://cdn.jsdelivr.net/npm/emotion@9.2.12/dist/emotion.umd.min.js",
    "https://unpkg.com/react-dom@16.7.0/umd/react-dom.production.min.js",
    "https://unpkg.com/prop-types@15.5.10/prop-types.min.js",
    "https://unpkg.com/babel-standalone@6/babel.min.js",
  ],
  javascript: [],
};
const scripts = {
  vue: ["vue.js"],
  react: ["react.js"],
  javascript: ["javascript.js"],
};
const types = {
  react: "text/babel",
  javascript: "application/javascript",
  vue: "application/javascript",
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
const injectHTML = (type) => {
  viewer.innerHTML = html[type];
};
const injectScript = (type, content) => {
  const script = document.createElement("script");
  script.setAttribute("type", type);
  script.innerHTML = content;

  document.body.appendChild(script);
};

const onSelectChange = () => {
  if (!wc.value || !framework.value) return;

  loaders[wc.value]?.()?.then(() => {
    injectHTML(framework.value);
    createScript(fws[framework.value], "application/javascript").then(() => {
      createScript(scripts[framework.value], "application/javascript");
    });
  });
};
