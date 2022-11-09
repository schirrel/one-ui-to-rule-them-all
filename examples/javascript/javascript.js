let increment = 0;
const button = document.querySelector("#button");
const submit = document.querySelector("#submit");
const input = document.querySelector("albs-input");

const form = document.querySelector("form");
const span = document.querySelector("span");

button.addEventListener("click", (event) => {
  // console.log("Outer click");
  increment++;
  span.innerText = increment;
});

submit.addEventListener("submit", (event) => {
  event.preventDefault()
  console.log("Outer click - submit");
});

input.addEventListener("input", (event) => {
  console.log("Outer click - input", event);
});