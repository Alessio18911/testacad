"use strict";

const ActionCode = {
  ADD_CLASS: 1,
  TOGGLE_CLASS: 2
};

const BlocksMap = {
  body: {
    props: {
      color: "body--dark",
      immobility: "body--immobile"
    }
  },

  logo: {
    prop: "logo--white"
  },

  toggleMenuBtn: {
    prop: "burger--active"
  },

  mainMenu: {
    prop: "page-header__wrapper--opened"
  },

  mainMenuItem: {
    prop: "main-nav__link--clicked"
  }
};

const body = document.body;
const logo = body.querySelector(".page-header__logo");
const themeToggle = body.querySelector(".theme-toggle__input");
const toggleMenuBtn = body.querySelector(".burger");
const mainMenu = body.querySelector(".page-header__wrapper--right");
const mainMenuItems = body.querySelectorAll(".main-nav__link");

function toggleMainMenuItemsColor(evt) {
  mainMenuItems.forEach(item => changeProps(item, BlocksMap.mainMenuItem.prop));
  changeProps(evt.target, BlocksMap.mainMenuItem.prop, ActionCode.ADD_CLASS);
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
  changeProps(body, BlocksMap.body.props.color, ActionCode.TOGGLE_CLASS);
  changeProps(logo, BlocksMap.logo.prop, ActionCode.TOGGLE_CLASS);
}

function onToggleMenuBtnClick() {
  changeProps(toggleMenuBtn, BlocksMap.toggleMenuBtn.prop, ActionCode.TOGGLE_CLASS);
  changeProps(mainMenu, BlocksMap.mainMenu.prop, ActionCode.TOGGLE_CLASS);
  changeProps(logo, BlocksMap.logo.prop, ActionCode.TOGGLE_CLASS);
  changeProps(body, BlocksMap.body.props.immobility, ActionCode.TOGGLE_CLASS);
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
    changeProps(body, BlocksMap.body.props.immobility);
    changeProps(body, BlocksMap.body.props.color);
    themeToggle.checked = false;

    if(!toggleMenuBtn.classList.contains("burger--active")) {
      changeProps(logo, BlocksMap.logo.prop);
    }
  } else {
    changeProps(toggleMenuBtn, BlocksMap.toggleMenuBtn.prop);
    changeProps(mainMenu, BlocksMap.mainMenu.prop);

    if (!body.classList.contains("body--dark")) {
      changeProps(logo, BlocksMap.logo.prop);
    }
  }
});
