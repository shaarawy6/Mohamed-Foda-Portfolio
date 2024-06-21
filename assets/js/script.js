'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;
    testimonialsModalFunc();
  });
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);

// custom select variables
const selects = document.querySelectorAll("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValues = document.querySelectorAll("[data-selecct-value]");
const filterBtns = document.querySelectorAll("[data-filter-btn]");

selects.forEach(select => {
  select.addEventListener("click", function () { elementToggleFunc(this); });
});

// add event in all select items
selectItems.forEach(item => {
  item.addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValues.forEach(value => value.innerText = this.innerText);
    elementToggleFunc(select);
    filterFunc(selectedValue);
  });
});

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  filterItems.forEach(item => {
    if (selectedValue === "all") {
      item.classList.add("active");
    } else if (selectedValue === item.dataset.category) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });
}

// add event in all filter button items for large screen
let lastClickedBtns = {};

filterBtns.forEach(btn => {
  btn.addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValues.forEach(value => value.innerText = this.innerText);
    filterFunc(selectedValue);
    let page = this.closest('[data-page]').dataset.page;
    if (lastClickedBtns[page]) {
      lastClickedBtns[page].classList.remove("active");
    }
    this.classList.add("active");
    lastClickedBtns[page] = this;
  });
});

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
formInputs.forEach(input => {
  input.addEventListener("input", function () {
    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
});

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
navigationLinks.forEach(link => {
  link.addEventListener("click", function () {
    pages.forEach(page => {
      if (this.innerHTML.toLowerCase() === page.dataset.page) {
        page.classList.add("active");
        navigationLinks.forEach(navLink => navLink.classList.remove("active"));
        this.classList.add("active");
        window.scrollTo(0, 0);
      } else {
        page.classList.remove("active");
      }
    });
  });
});

// smooth scrolling to section
const serviceLinks = document.querySelectorAll('a[href^="#"]');
serviceLinks.forEach(link => {
  link.addEventListener('click', function (event) {
    event.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    let parentPage;

    // Determine parent page
    if (targetElement) {
      if (targetId.includes("2d-explainer") || targetId.includes("motion-graphic") || targetId.includes("logo-animation")) {
        parentPage = document.querySelector('[data-page="motion graphic"]');
      } else if (targetId.includes("reel") || targetId.includes("car")) {
        parentPage = document.querySelector('[data-page="video editing"]');
      }
      
      // Activate parent page
      if (parentPage) {
        pages.forEach(page => {
          page.classList.remove("active");
        });
        parentPage.classList.add('active');
      }

      // Update navbar active state
      navigationLinks.forEach(navLink => {
        navLink.classList.remove('active');
        if (parentPage.dataset.page === navLink.textContent.trim().toLowerCase()) {
          navLink.classList.add('active');
        }
      });

      // Scroll to target element
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth'
      });
    }
  });
});
