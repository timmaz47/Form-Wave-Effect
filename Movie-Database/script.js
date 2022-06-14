"use strict";

const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=7809480a1c9a05a0e47bf4221c7c8999&page=";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=7809480a1c9a05a0e47bf4221c7c8999&page=1&query="';

const formEl = document.getElementById("form");
const search = document.getElementById("search");
const main = document.getElementById("main");
const paginationEl = document.getElementById("pagination");
const ulEl = document.querySelector("ul");
const prevEl = document.querySelector(".prev");
const nextEl = document.querySelector(".next");

let currentPage = 1;
const totalPages = 500;

getMovies(API_URL + currentPage);

// Fetch API Data
async function getMovies(url) {
  const result = await fetch(url);
  const data = await result.json();
  //   console.log(data.results);
  //   totalPages = data.total_pages;

  showMovies(data.results);
  pagination(totalPages, currentPage);
  //   setupPagination(totalPageCount, paginationEl);
}

// Display results from API
function showMovies(movies) {
  main.innerHTML = "";

  // Get required info for each movie and display
  movies.forEach((movie) => {
    const { title, poster_path, vote_average: vote, overview } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
        <img src="${
          IMG_PATH + poster_path
        }" alt="${title}" class="movie--image" />
        <div class="movie--info">
          <h3 class="movie--title">${title}</h3>
          <div class="movie--rating ${getClassByRating(vote)}">${vote}</div>
        </div>
        <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>`;

    main.appendChild(movieEl);
  });
}

// Set correct class for rating
function getClassByRating(vote) {
  if (vote >= 7.5) {
    return "green";
  } else if (vote >= 5) {
    return "orange";
  } else if (vote < 5) {
    return "red";
  }
}

// Add pagination Component
function pagination(totalPages, currentPage) {
  let liTag = ""; // Dynamic html will be added
  let activePage;
  let beforeCurrentPage = currentPage - 1;
  let afterCurrentPage = currentPage + 1;

  // Display Prev whenever active page is not 1 and re-run pagination on clicking prev
  //   if (currentPage > 1) {
  //     liTag += `<li class="btn prev" onclick="pagination(totalPages, ${
  //       currentPage - 1
  //     })">
  //           <span><i class="fas fa-angle-left"> Prev</i></span>
  //         </li>`;
  //   }

  if (currentPage > 1) {
    liTag += `<li class="btn prev" onclick="prevAction()">
          <span><i class="fas fa-angle-left"> Prev</i></span>
        </li>`;
  }

  // Always show page 1 whenever active page is larger than 2 and re-run pagination on clicking a page
  if (currentPage > 2) {
    // liTag += `<li class="numb" onclick="pagination(totalPages, 1)"><span>1</span></li>`;
    liTag += `<li class="numb" onclick="pageAction(1)"><span>1</span></li>`;

    // Add dots if current page is greater than 3
    if (currentPage > 3) {
      liTag += `<li class="dots"><span>...</span></li>`;
    }
  }

  // No. of pages to show before final page
  if (currentPage == totalPages) {
    beforeCurrentPage = beforeCurrentPage - 2;
  } else if (currentPage == totalPages - 1) {
    beforeCurrentPage = beforeCurrentPage - 1;
  }

  // No. of pages to show after first page
  if (currentPage == 1) {
    afterCurrentPage = afterCurrentPage + 2;
  } else if (currentPage == 2) {
    afterCurrentPage = afterCurrentPage + 1;
  }

  // For every page display page number before and after it
  for (
    let pageNumber = beforeCurrentPage;
    pageNumber <= afterCurrentPage;
    pageNumber++
  ) {
    if (pageNumber > totalPages) {
      continue;
    }
    if (pageNumber == 0) {
      pageNumber += 1;
    }

    // for the current page set active class
    if (currentPage == pageNumber) {
      activePage = "active";
    } else {
      activePage = "";
    }

    // liTag += `<li class="numb ${activePage}" onclick="pagination(totalPages, ${pageNumber})"><span>${pageNumber}</span></li>`;

    liTag += `<li class="numb ${activePage}" onclick="pageAction(${pageNumber})"><span>${pageNumber}</span></li>`;
  }

  // Add dots for second to last page and show last page
  if (currentPage < totalPages - 1) {
    if (currentPage < totalPages - 2) {
      liTag += `<li class="dots"><span>...</span></li>`;
    }
    // liTag += `<li class="numb" onclick="pagination(totalPages, ${totalPages})"><span>${totalPages}</span></li>`;
    liTag += `<li class="numb" onclick="pageAction(${totalPages})"><span>${totalPages}</span></li>`;
  }

  // Whenever not on last page show the next button
  //   if (currentPage < totalPages) {
  //     liTag += `<li class="btn next" onclick="pagination(totalPages, ${
  //       currentPage + 1
  //     })">
  //           <span>Next <i class="fas fa-angle-right"></i></span>
  //         </li>`;
  //   }

  if (currentPage < totalPages) {
    liTag += `<li class="btn next" onclick="nextAction()">
          <span>Next <i class="fas fa-angle-right"></i></span>
        </li>`;
  }

  // Add the respective HTML to the ul
  ulEl.innerHTML = liTag;
}

// Add event listener for click on prev, next and all pages
// for prev get current page - 1 and run pagination and getMovies
const prevAction = function () {
  currentPage -= 1;
  getMovies(API_URL + currentPage);
  document.body.scrollTop = document.documentElement.scrollTop = 0;
};

// for next get current page + 1 and run pagination and getMovies
const nextAction = function () {
  currentPage += 1;
  getMovies(API_URL + currentPage);
  document.body.scrollTop = document.documentElement.scrollTop = 0;
};

// for every page number set current page to that number and run pagination
const pageAction = function (pageNumber) {
  currentPage = pageNumber;
  getMovies(API_URL + currentPage);
  document.body.scrollTop = document.documentElement.scrollTop = 0;
};

/* 
// To Show All Pages
function setupPagination(pageCount, pageContainer) {
  pageContainer.innerHTML = "";

  const totalPageCount = pageCount;
  for (let i = 1; i < totalPageCount + 1; i++) {
    let btn = pageButton(i);
    pageContainer.appendChild(btn);
  }
}

function pageButton(page) {
  let button = document.createElement("button");
  button.innerText = page;

  console.log(currentPage);
  if (currentPage === page) button.classList.add("active");

  button.addEventListener("click", function () {
    currentPage = page;
    getMovies(API_URL + currentPage);

    let currentBtn = document.querySelector(".pageNumbers button.active");
    currentBtn.classList.remove("active");

    button.classList.add("active");
  });

  return button;
}
*/

// Search functionality
let currentSearchPage = 1;
let totalSearchPages;
let searchTerm;

async function getSearchMovies(url) {
  const result = await fetch(url);
  const data = await result.json();

  totalSearchPages = data.total_pages;

  showMovies(data.results);
  searchPagination(totalSearchPages, currentSearchPage);
}

formEl.addEventListener("submit", (e) => {
  e.preventDefault();

  searchTerm = search.value;
  if (searchTerm && searchTerm !== "") {
    getSearchMovies(
      `https://api.themoviedb.org/3/search/movie?api_key=7809480a1c9a05a0e47bf4221c7c8999&page=${currentSearchPage}&query=${searchTerm}`
    );
    search.value = "";
  } else {
    window.location.reload(); //reload current page
  }
});

function searchPagination(totalSearchPages, currentSearchPage) {
  let liTag = "";
  let activePage;
  let beforeCurrentPage = currentSearchPage - 1;
  let afterCurrentPage = currentSearchPage + 1;

  if (currentSearchPage > 1) {
    liTag += `<li class="btn prev" onclick="prevSearchAction()">
          <span><i class="fas fa-angle-left"> Prev</i></span>
        </li>`;
  }

  if (currentSearchPage > 2) {
    liTag += `<li class="numb" onclick="pageSearchAction(1)"><span>1</span></li>`;

    if (currentSearchPage > 3) {
      liTag += `<li class="dots"><span>...</span></li>`;
    }
  }
  console.log(currentSearchPage, totalSearchPages);

  if (beforeCurrentPage > 2 && currentSearchPage == totalSearchPages) {
    beforeCurrentPage = beforeCurrentPage - 2;
  } else if (
    beforeCurrentPage > 2 &&
    currentSearchPage == totalSearchPages - 1
  ) {
    beforeCurrentPage = beforeCurrentPage - 1;
  }

  if (currentSearchPage == 1) {
    afterCurrentPage = afterCurrentPage + 2;
  } else if (currentSearchPage == 2) {
    afterCurrentPage = afterCurrentPage + 1;
  }

  for (
    let pageNumber = beforeCurrentPage;
    pageNumber <= afterCurrentPage;
    pageNumber++
  ) {
    if (pageNumber > totalSearchPages) {
      continue;
    }
    if (pageNumber == 0) {
      pageNumber += 1;
    }

    if (currentSearchPage == pageNumber) {
      activePage = "active";
    } else {
      activePage = "";
    }

    liTag += `<li class="numb ${activePage}" onclick="pageSearchAction(${pageNumber})"><span>${pageNumber}</span></li>`;
  }

  if (currentSearchPage < totalSearchPages - 1) {
    if (currentSearchPage < totalSearchPages - 2) {
      liTag += `<li class="dots"><span>...</span></li>`;
    }

    liTag += `<li class="numb" onclick="pageSearchAction(${totalSearchPages})"><span>${totalSearchPages}</span></li>`;
  }

  if (currentSearchPage < totalSearchPages) {
    liTag += `<li class="btn next" onclick="nextSearchAction()">
          <span>Next <i class="fas fa-angle-right"></i></span>
        </li>`;
  }

  ulEl.innerHTML = liTag;
}

const prevSearchAction = function () {
  currentSearchPage -= 1;
  getSearchMovies(
    `https://api.themoviedb.org/3/search/movie?api_key=7809480a1c9a05a0e47bf4221c7c8999&page=${currentSearchPage}&query=${searchTerm}`
  );
  document.body.scrollTop = document.documentElement.scrollTop = 0;
};

const nextSearchAction = function () {
  currentSearchPage += 1;
  getSearchMovies(
    `https://api.themoviedb.org/3/search/movie?api_key=7809480a1c9a05a0e47bf4221c7c8999&page=${currentSearchPage}&query=${searchTerm}`
  );
  document.body.scrollTop = document.documentElement.scrollTop = 0;
};

const pageSearchAction = function (pageNumber) {
  currentSearchPage = pageNumber;
  getSearchMovies(
    `https://api.themoviedb.org/3/search/movie?api_key=7809480a1c9a05a0e47bf4221c7c8999&page=${currentSearchPage}&query=${searchTerm}`
  );
  document.body.scrollTop = document.documentElement.scrollTop = 0;
};
