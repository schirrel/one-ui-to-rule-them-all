const { ref, createApp, compilerOptions } = Vue;

const app = createApp({
  setup() {
    const count = ref(0);
    const message = ref("Valor Inicial");
    const placeholder = ref("placeholder");
    const increment = () => {
      console.log("Outer Vue Click");
      count.value++;
      placeholder.value = "placeholder " + count.value;
    };

    const submittedForm = (evt) => {
      evt.preventDefault();
      console.log(evt);
    };
    return {
      count,
      message,
      placeholder,
      increment,
      submittedForm,
    };
  },
});
app.config.compilerOptions.isCustomElement = (tag) => tag.includes("-");
app.mount("#app");
