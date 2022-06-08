"use strict";

const jokeEl = document.getElementById("joke");
const jokeBtn = document.getElementById("jokeBtn");

// generateJoke();

jokeBtn.addEventListener("click", generateJoke);

/* Using ASYNC/AWAIT */
async function generateJoke() {
  // As per icanhazdadjoke instructions
  const config = {
    headers: {
      Accept: "application/json",
    },
  };

  // Since fetch is async we need to 'await' until it is done fetching so we use the await keyword.
  // Place whatever you get back from fetch into a variable
  const response = await fetch("https://icanhazdadjoke.com", config);

  // Place whatever you get back from response.json() into a variable
  const data = await response.json();
  jokeEl.innerHTML = data.joke;
  jokeBtn.innerText = "Get Another Joke";
}

/* ---- Using Promises ----
function generateJoke() {
  // As per icanhazdadjoke instructions - different for each API
  const config = {
    headers: {
      Accept: "application/json",
    },
  };

  fetch("https://icanhazdadjoke.com", config) // This gives a promise back so need to set to .then
    .then((response) => response.json()) // With fetch API we get the response and we want to get json data
    //.then((data) => console.log(data)) // get the actual data and log to console to view the data as an object
    .then((data) => {
      // Select and show only the 'joke' key from the data object
      jokeEl.innerHTML = data.joke;
    });
}
*/
