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

function changeProps(elementsAndProps) {
  elementsAndProps.forEach(item => {
    let element = item[0];
    let elementClass = item[1];
    let code = item[2];

    switch (code) {
      case 2:
        element.classList.toggle(elementClass);
        break;

      case 1:
        element.classList.add(elementClass);
        break;

      default:
        element.classList.remove(elementClass);
    }
  });
}

function toggleMainMenuItemsColor(evt) {
  mainMenuItems.forEach(item =>
    changeProps([[item, BlocksMap.mainMenuItem.prop]])
  );
  changeProps([
    [evt.target, BlocksMap.mainMenuItem.prop, ActionCode.ADD_CLASS]
  ]);
}

function onThemeToggleChange() {
  changeProps([
    [body, BlocksMap.body.props.color, ActionCode.TOGGLE_CLASS],
    [logo, BlocksMap.logo.prop, ActionCode.TOGGLE_CLASS]
  ]);
}

function onToggleMenuBtnClick() {
  changeProps([
    [toggleMenuBtn, BlocksMap.toggleMenuBtn.prop, ActionCode.TOGGLE_CLASS],
    [mainMenu, BlocksMap.mainMenu.prop, ActionCode.TOGGLE_CLASS],
    [logo, BlocksMap.logo.prop, ActionCode.TOGGLE_CLASS],
    [body, BlocksMap.body.props.immobility, ActionCode.TOGGLE_CLASS]
  ]);
}

function onMainMenuItemClick(evt) {
  evt.preventDefault();
  toggleMainMenuItemsColor(evt);
}

function onWindowResize(evt) {
  let windowWidth = window.innerWidth;

  switch(windowWidth < 768) {
    case true:
      changeProps([
        [body, BlocksMap.body.props.immobility],
        [body, BlocksMap.body.props.color]
      ]);
      themeToggle.checked = false;

      if (!toggleMenuBtn.classList.contains("burger--active")) {
        changeProps([[logo, BlocksMap.logo.prop]]);
      }
      break;

    default:
      changeProps([
        [toggleMenuBtn, BlocksMap.toggleMenuBtn.prop],
        [mainMenu, BlocksMap.mainMenu.prop]
      ]);

      if (!body.classList.contains("body--dark")) {
        changeProps([[logo, BlocksMap.logo.prop]]);
      }
  }
}

mainMenuItems.forEach(item =>
  item.addEventListener("click", onMainMenuItemClick)
);
themeToggle.addEventListener("change", onThemeToggleChange);
toggleMenuBtn.addEventListener("click", onToggleMenuBtnClick);
window.addEventListener("resize", onWindowResize);
