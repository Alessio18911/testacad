"use strict";

const logo = document.querySelector(".page-header__logo");
const themeToggle = document.querySelector("#theme-toggle");
const toggleMenuBtn = document.querySelector(".burger");
const mainMenu = document.querySelector(".page-header__wrapper--right");
const mainMenuItems = document.querySelectorAll(".main-nav__link");

function toggleMainMenuItemsColor() {
  mainMenuItems.forEach(item => item.classList.remove("main-nav__link--clicked"));
}

function onThemeToggleChange() {
  document.body.classList.toggle("body--dark");
  logo.classList.toggle('logo--white');
  toggleMainMenuItemsColor();
}

function onToggleMenuBtnClick() {
  toggleMenuBtn.classList.toggle("burger--active");
  mainMenu.classList.toggle("page-header__wrapper--opened");
  logo.classList.toggle('logo--white');
  document.body.classList.toggle("body--immobile");
}

function onMainMenuItemClick(evt) {
  evt.preventDefault();
  toggleMainMenuItemsColor();
  evt.target.classList.add('main-nav__link--clicked');
}

themeToggle.addEventListener("change", onThemeToggleChange);
toggleMenuBtn.addEventListener("click", onToggleMenuBtnClick);
mainMenuItems.forEach(item =>
  item.addEventListener("click", onMainMenuItemClick)
);

window.addEventListener("resize", function(evt) {
  if (window.innerWidth < 768) {
    document.body.className = "body";
    themeToggle.checked = false;

    if(!toggleMenuBtn.classList.contains("burger--active")) {
      logo.classList.remove('logo--white');
    }
  } else {
    toggleMenuBtn.classList.remove("burger--active");
    mainMenu.classList.remove('page-header__wrapper--opened');

    if (!document.body.classList.contains("body--dark")) {
      logo.classList.remove('logo--white');
    }
  }
});
