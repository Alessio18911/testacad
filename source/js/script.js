"use strict";

const logoSvg = document.querySelector(".logo__svg");
const logoLetter = document.querySelector(".logo__letter");
const themeToggle = document.querySelector("#theme-toggle");
const toggleMenuBtn = document.querySelector(".burger");
const mainMenu = document.querySelector(".page-header__wrapper--right");
const mainMenuItems = document.querySelectorAll(".main-nav__link");

function toggleLogoColor() {
  logoSvg.classList.toggle("logo__svg--white");
  logoLetter.classList.toggle("logo__letter--black");
}

function toggleMainMenuItemsColor() {
  mainMenuItems.forEach(item => item.classList.remove("main-nav__link--clicked"));
}

function onThemeToggleChange() {
  document.body.classList.toggle("body--dark");
  toggleLogoColor();
  toggleMainMenuItemsColor();
}

function onToggleMenuBtnClick() {
  toggleMenuBtn.classList.toggle("burger--active");
  mainMenu.classList.toggle("page-header__wrapper--opened");
  toggleLogoColor();
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
  } else {
    mainMenu.classList.remove('page-header__wrapper--opened');
    logoSvg.classList.remove("logo__svg--white");
    logoLetter.classList.remove("logo__letter--black");
    toggleMenuBtn.classList.remove("burger--active");
  }
});
