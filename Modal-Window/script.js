'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
// When you have more than one element with the same class you use querySelectorAll which returns an 'array' of all elements
const btnsShowModal = document.querySelectorAll('.show-modal');
console.log(btnsShowModal);
const hidden = document.querySelectorAll('.hidden');
console.log(hidden);

// Create a function to eliminate repeated code
const styleDisplay = function (display) {
  for (let j = 0; j < hidden.length; j++) {
    hidden[j].style.display = display;
  }
};

// Function for DRY code if adding/removing classes
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

// Loop through the 'array' to apply the event handler function to all elements
for (let i = 0; i < btnsShowModal.length; i++) {
  btnsShowModal[i].addEventListener('click', function () {
    styleDisplay('block');
    /* Another way is to remove (delete) the hidden class - especially useful if there are more than 1 properties in the class that need to be changed
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
    */
  });
}

btnCloseModal.addEventListener('click', function () {
  styleDisplay('none');
  /* Another way is to add the hidden class:
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
    */
});

overlay.addEventListener('click', function () {
  styleDisplay('none');
  /* Another way is to add the hidden class:
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
    */
});

document.addEventListener('keydown', function (e) {
  //   console.log('A key was pressed');
  console.log(e.key);
  if (e.key === 'escape') {
    styleDisplay('none');

    /*
    //Alternative method using closeModal function
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
    */
  }
});
