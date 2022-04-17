"use strict";

const nav = document.getElementById("nav");
const button = document.querySelector(".btn");

button.addEventListener("click", () => {
  nav.classList.toggle("active");
});
