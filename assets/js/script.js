'use strict';

/**
 * navbar toggle
 */

const overlay = document.querySelector("[data-overlay]");
const navOpenBtn = document.querySelector("[data-nav-open-btn]");
const navbar = document.querySelector("[data-navbar]");
const navCloseBtn = document.querySelector("[data-nav-close-btn]");
const navLinks = document.querySelectorAll("[data-nav-link]");

const navElemArr = [navOpenBtn, navCloseBtn, overlay];

const navToggleEvent = function (elem) {
  for (let i = 0; i < elem.length; i++) {
    elem[i].addEventListener("click", function () {
      navbar.classList.toggle("active");
      overlay.classList.toggle("active");
    });
  }
}

navToggleEvent(navElemArr);
navToggleEvent(navLinks);



/**
 * header sticky & go to top
 */

const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {

  if (window.scrollY >= 200) {
    header.classList.add("active");
    goTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    goTopBtn.classList.remove("active");
  }

});

// JavaScript for the search button functionality

// Select the search button and the container for the search bar
const searchButton = document.querySelector('.search-btn');
const headerBtnGroup = document.querySelector('.header-btn-group');

// Create a search bar element
const searchBar = document.createElement('input');
searchBar.type = 'text';
searchBar.placeholder = 'Search...';
searchBar.className = 'search-bar';

// Add styles for the search bar
searchBar.style.display = 'none'; // Initially hidden
searchBar.style.marginLeft = '10px';
searchBar.style.padding = '5px';
searchBar.style.fontSize = '16px';
searchBar.style.color = 'white';

// Append the search bar to the button group
headerBtnGroup.appendChild(searchBar);

// Toggle the search bar visibility on button click
searchButton.addEventListener('click', () => {
  if (searchBar.style.display === 'none') {
    searchBar.style.display = 'block';
    searchBar.focus(); // Focus on the search bar
  } else {
    searchBar.style.display = 'none';
    searchBar.value = ''; // Clear the search bar
  }
});


function redirectToLogin() {
  window.location.href = "login.html";
}

function call() {
  window.location.href = "https://itum.mrt.ac.lk/";
}


function btn_primary(){
  window.location.href ="login.html";
}