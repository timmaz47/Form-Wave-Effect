"use strict";

const labels = document.querySelectorAll(".form-control label");
//console.log(labels);

labels.forEach((label) => {
  console.log(label.innerHTML); //innerHTML before

  label.innerHTML = label.innerText
    .split("")
    //splits the inner text into an array where first value is E, second is m ...
    .map(
      (letter, idx) =>
        `<span style="transition-delay:${idx * 50}ms">${letter}</span>`
    )
    // map can be used on an array to convert to a different array. Here we want to turn each letter (as well as get the index) into an array of the letters with a <span> and transition-delay
    .join("");
  // since we dont want to display an array we use join to turn the array into a string

  console.log(label.innerHTML); //innerHTML after
});
