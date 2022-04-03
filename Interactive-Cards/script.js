"use strict";
// Create variable to hold array of all elements with class panel
const panels = document.querySelectorAll(".panel");
console.log(panels[0]); // optional: log the array

// Loop through each array element and check for a click
for (let i = 0; i < panels.length; i++) {
  panels[i].addEventListener("click", function () {
    // If a click is heard, first remove active class from all elements by looping through all again
    for (let j = 0; j < panels.length; j++) {
      panels[j].classList.remove("active");
    }
    // Then add active class only to element which has been clicked
    panels[i].classList.toggle("active");
  });
}

// Using forEach loop instead of for

// const panels = document.querySelectorAll(".panel");
// console.log(panels);

// panels.forEach((panel) => {
//   panel.addEventListener("click", function () {
//     removeActiveClasses();
//     panel.classList.toggle("active");
//   });
// });

// function removeActiveClasses() {
//   panels.forEach((panel) => {
//     panel.classList.remove("active");
//   });
// }
