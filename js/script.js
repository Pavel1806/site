// import calc from './modules/calc';
// import cards from './modules/cards';
// import forms from './modules/forms';
// import modal from './modules/modal';
// import slider from './modules/slider';
// import tabs from './modules/tabs';
// import timer from './modules/timer';

import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import calc from './modules/calc';
import forms from './modules/forms';
import slider from './modules/slider';
import {addShow} from './modules/modal';

document.addEventListener('DOMContentLoaded', ()=>{
  const intervalShowModal = setInterval(()=>{addShow(modalSelector, intervalShowModal)}, 3000),
        modalSelector = '.modal';

  tabs();
  modal(modalSelector, intervalShowModal);
  timer('.timer', '2022-12-22');
  cards();
  calc();
  forms(modalSelector, intervalShowModal);
  slider({
    container: '.offer__slider', 
    slide: '.offer__slide', 
    nextArrow: '.offer__slider-next', 
    prevArrow: '.offer__slider-prev', 
    totalCounter: '#total', 
    currentCounter: '#current', 
    wrapper: '.offer__slider-wrapper', 
    field: '.inner__slider-wrapper'
  });

});