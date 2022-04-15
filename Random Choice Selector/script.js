"use strict";

const choicesEl = document.getElementById("choices");
const textarea = document.getElementById("textarea");

// Automatically place cursor inside textarea
textarea.focus();

textarea.addEventListener("keyup", (e) => {
  // Whatever is typed is used as input for the createChoices function
  createChoices(e.target.value);

  // If enter is pressed clear the text area and keep choices showing. Also run the randomSelect function
  if (e.key === "Enter") {
    setTimeout(() => {
      e.target.value = "";
    }, 10);

    randomSelect();
  }
});

function createChoices(input) {
  // choices will be an array where the input is a string and using split() it is turned into an array. Whenever there is a comma a new string is created within the array
  const choices = input
    .split(",")
    // For each choice filter out any input which is just an empty space
    .filter((choice) => choice.trim() !== "")
    // For each choice check for whitespace and trim it.
    .map((choice) => choice.trim());
  console.log(choices);

  // Clear the choices element
  choicesEl.innerHTML = "";

  // Loop through the choices array and for each input
  choices.forEach((choice) => {
    // Create a div with class of 'choice' and set the inner text to be the user input
    const choiceEl = document.createElement("div");
    choiceEl.classList.add("choice");
    choiceEl.innerText = choice;
    // Add each choice to the choices element
    choicesEl.appendChild(choiceEl);
  });
}

// Randomly select a choice
function randomSelect() {
  const times = 30;

  // Set variable interval to be equal to every 100ms select random tag add and remove active class
  // This will keep switching the active class randomly between the choices indefinitely
  const interval = setInterval(() => {
    // Set var to be equal to a random coice
    const randomChoice = pickRandomChoice();
    console.log(randomChoice);

    // Add the active class
    activeChoice(randomChoice);

    // Remove the active class after 100ms
    setTimeout(() => {
      inactiveChoice(randomChoice);
    }, 100);
  }, 100);

  // Randomly pick a choice and set it as active
  setTimeout(() => {
    // Stop the interval
    clearInterval(interval);

    // Pick one random choice and highlight
    setTimeout(() => {
      const randomChoice = pickRandomChoice();

      activeChoice(randomChoice);
    }, 100);
  }, times * 100);
}

// Pick a random choice
function pickRandomChoice() {
  // Grab all elements with choice class and return a random one
  const choices = document.querySelectorAll(".choice");
  return choices[Math.floor(Math.random() * choices.length)];
}

// Set the active class to the random choice
function activeChoice(choice) {
  choice.classList.add("active");
}

// Remove active class from random choice
function inactiveChoice(choice) {
  choice.classList.remove("active");
}
