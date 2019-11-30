"use strict";

const ActionCode = {
  ADD_CLASS: 1,
  TOGGLE_CLASS: 2
};

const body = document.body;
const logo = body.querySelector(".page-header__logo");
const themeToggle = body.querySelector("#theme-toggle");
const toggleMenuBtn = body.querySelector(".burger");
const mainMenu = body.querySelector(".page-header__wrapper--right");
const mainMenuItems = body.querySelectorAll(".main-nav__link");

function toggleMainMenuItemsColor(evt) {
  mainMenuItems.forEach(item => changeProps(item, "main-nav__link--clicked"));
  changeProps(evt.target, "main-nav__link--clicked", ActionCode.ADD_CLASS);
}

function changeProps(blockName, propClass, code) {
  switch(code) {
    case 2: blockName.classList.toggle(propClass);
      break;

    case 1: blockName.classList.add(propClass);
      break;

    default: blockName.classList.remove(propClass);
  }
}

function onThemeToggleChange() {
  changeProps(body, "body--dark", ActionCode.TOGGLE_CLASS);
  changeProps(logo, "logo--white", ActionCode.TOGGLE_CLASS);
}

function onToggleMenuBtnClick() {
  changeProps(toggleMenuBtn, "burger--active", ActionCode.TOGGLE_CLASS);
  changeProps(mainMenu, "page-header__wrapper--opened", ActionCode.TOGGLE_CLASS);
  changeProps(logo, "logo--white", ActionCode.TOGGLE_CLASS);
  changeProps(body, "body--immobile", ActionCode.TOGGLE_CLASS);
}

function onMainMenuItemClick(evt) {
  evt.preventDefault();
  toggleMainMenuItemsColor(evt);
}

mainMenuItems.forEach(item => item.addEventListener("click", onMainMenuItemClick));
themeToggle.addEventListener("change", onThemeToggleChange);
toggleMenuBtn.addEventListener("click", onToggleMenuBtnClick);

window.addEventListener("resize", function(evt) {
  if (window.innerWidth < 768) {
    changeProps(body, "body--immobile");
    changeProps(body, "body--dark");
    themeToggle.checked = false;

    if(!toggleMenuBtn.classList.contains("burger--active")) {
      changeProps(logo, "logo--white");
    }
  } else {
    changeProps(toggleMenuBtn, "burger--active");
    changeProps(mainMenu, "page-header__wrapper--opened");

    if (!body.classList.contains("body--dark")) {
      changeProps(logo, "logo--white");
    }
  }
});
