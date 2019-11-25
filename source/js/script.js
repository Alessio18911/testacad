'use strict';

const logoSvg = document.querySelector('.logo__svg');
const logoLetter = document.querySelector('.logo__letter');
const themeToggle = document.querySelector('#theme-toggle');
const toggleMenuBtn = document.querySelector('.burger');
const mainMenu = document.querySelector('.page-header__nav-wrapper');
const mainMenuItems = document.querySelectorAll('.main-nav__link');

function onThemeToggleChange() {
  document.body.classList.toggle('body--dark');
}

function onToggleMenuBtnClick() {
  toggleMenuBtn.classList.toggle('burger--active');
  mainMenu.classList.toggle('page-header__nav-wrapper--opened');
  logoSvg.classList.toggle('logo__svg--white');
  logoLetter.classList.toggle('logo__letter--black');
  document.body.classList.toggle('body--immobile');
}

function onMainMenuItemClick(evt) {
  evt.preventDefault();
  mainMenuItems.forEach(item => item.classList.remove('main-nav__link--active'));
  evt.target.classList.add('main-nav__link--active');
}

themeToggle.addEventListener('change', onThemeToggleChange);
toggleMenuBtn.addEventListener('click', onToggleMenuBtnClick);
mainMenuItems.forEach(item => item.addEventListener('click', onMainMenuItemClick));
