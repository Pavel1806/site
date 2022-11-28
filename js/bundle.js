/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function calc() {
  //calc

  let sexItems = document.querySelector('#gender').querySelectorAll('.calculating__choose-item'),
    activityItems = document.querySelector('.calculating__choose_big').querySelectorAll('.calculating__choose-item'),
    result = document.querySelector('.calculating__result span').innerText;
  let sex, height, weight, age, activity, answer;
  function localStorageSetSex(item) {
    sexItems.forEach(item1 => {
      item1.classList.remove('calculating__choose-item_active');
      if (item1.id == item) {
        item1.classList.add('calculating__choose-item_active');
      }
    });
  }
  function localStorageSetActivity(item) {
    activityItems.forEach(item1 => {
      item1.classList.remove('calculating__choose-item_active');
      if (item1.getAttribute('data-activity') == item) {
        item1.classList.add('calculating__choose-item_active');
      }
    });
  }
  if (localStorage.getItem('sex')) {
    sex = localStorage.getItem('sex');
    localStorageSetSex(sex);
  } else {
    sex = 'female';
  }
  if (localStorage.getItem('activity')) {
    activity = localStorage.getItem('activity');
    localStorageSetActivity(activity);
  } else {
    activity = 1.375;
  }
  const summ = () => {
    if (sex == 'male') {
      answer = Math.round((88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * activity);
    } else {
      answer = Math.round((447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * activity);
    }
    if (!sex || !height || !weight || !age || !activity) {
      result = '____';
    } else {
      result = answer;
    }
    document.querySelector('.calculating__result span').innerText = result;
  };
  summ();
  const hideShow = sexOrActivityItems => {
    sexOrActivityItems.forEach(item => {
      item.addEventListener('click', e => {
        sexOrActivityItems.forEach(item1 => {
          item1.classList.remove('calculating__choose-item_active');
        });
        if (item.id === 'male' || 'female') {
          if (item.id === 'male') {
            sex = item.id;
            localStorage.setItem('sex', item.id);
          } else if (item.id === 'female') {
            sex = item.id;
            localStorage.setItem('sex', item.id);
          } else {
            activity = +item.getAttribute('data-activity');
            localStorage.setItem('activity', activity);
          }
        } else {}
        item.classList.add('calculating__choose-item_active');
        summ();
      });
    });
  };
  const dataSize = selector => {
    const input = document.querySelector(selector);
    input.addEventListener('input', e => {
      if (input.value.match(/\D/g)) {
        input.style.border = '2px solid red';
      } else {
        input.style.border = 'none';
      }
      switch (input.getAttribute('id')) {
        case 'height':
          height = +input.value;
          break;
        case 'weight':
          weight = +input.value;
          break;
        case 'age':
          age = +input.value;
          break;
      }
      summ();
    });
  };
  hideShow(sexItems);
  hideShow(activityItems);
  dataSize('#height');
  dataSize('#weight');
  dataSize('#age');
}
/* harmony default export */ __webpack_exports__["default"] = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");

function cards() {
  class ProductCard {
    constructor(img, alt, title, text, price) {
      this.img = img;
      this.alt = alt;
      this.title = title;
      this.text = text;
      this.price = price;
    }
    render() {
      const contayner = document.querySelector('.menu__field .container');
      const div = document.createElement('div');
      div.classList.add('menu__item');
      div.innerHTML = `
                <img src=${this.img} alt=${this.alt}>
                <h3 class="menu__item-subtitle">${this.title}</h3>
                <div class="menu__item-descr">${this.text}</div>
                <div class="menu__item-divider"></div>
                <div class="menu__item-price">
                    <div class="menu__item-cost">Цена:</div>
                    <div class="menu__item-total"><span>${this.price}</span> рублей/день</div>
                </div>
            `;
      contayner.append(div);
    }
  }
  (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getDataCard)('http://localhost:3000/menu').then(data => {
    data.forEach(_ref => {
      let {
        img,
        altimg,
        title,
        descr,
        price
      } = _ref;
      new ProductCard(img, altimg, title, descr, price).render();
    });
  });
}
/* harmony default export */ __webpack_exports__["default"] = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function forms(modalSelector, intervalShowModal) {
  //отправка данных из форм на сервер

  const data = document.querySelectorAll('form');
  const message = {
    loading: 'img/pinner.svg',
    success: 'Мы скоро с вами свяжемся!',
    failure: 'Что то пошло не так'
  };
  data.forEach(item => {
    processingPostData(item);
  });
  function processingPostData(form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      let statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
         display: block;
         margin: 0 auto;
     `;
      form.insertAdjacentElement('afterend', statusMessage);
      const formData = new FormData(form);
      const jsonData = {};
      formData.forEach((value, key) => {
        jsonData[key] = value;
      });
      (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', JSON.stringify(jsonData)).then(result => {
        console.log(result);
        reverseBodyForm(message.success);
        statusMessage.remove();
      }).catch(() => {
        reverseBodyForm(message.failure);
      }).finally(() => {
        form.reset();
      });
    });
  }
  function reverseBodyForm(message) {
    const form = document.querySelector('.modal');
    const formDialog = form.querySelector('.modal__dialog');
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.addShow)(modalSelector, intervalShowModal);
    formDialog.classList.add('hide');
    const div = document.createElement('div');
    div.classList.add('modal__dialog');
    div.innerHTML = `
       <div class="modal__content">
         <div class="modal__close" data-close>&times;</div>
         <div class="modal__title">${message}</div>
       </div>
 `;
    form.append(div);
    setTimeout(() => {
      div.remove();
      formDialog.classList.remove('hide');
      (0,_modal__WEBPACK_IMPORTED_MODULE_0__.removeShow)(modalSelector);
    }, 4000);
  }
}
/* harmony default export */ __webpack_exports__["default"] = (forms);

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "addShow": function() { return /* binding */ addShow; },
/* harmony export */   "removeShow": function() { return /* binding */ removeShow; }
/* harmony export */ });
function removeShow(modalSelector) {
  const modal = document.querySelector(modalSelector);
  modal.classList.remove('show');
  document.body.style.overflow = '';
}
function addShow(modalSelector, intervalShowModal) {
  const modal = document.querySelector(modalSelector);
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
  console.log(intervalShowModal);
  if (intervalShowModal) {
    clearInterval(intervalShowModal);
  }
}
function modal(modalSelector, intervalShowModal) {
  //modal

  const modal = document.querySelector(modalSelector),
    btn = document.querySelectorAll('[data-modal]'),
    close = modal.querySelector('.modal__close');
  btn.forEach(item => {
    item.addEventListener('click', () => {
      addShow(modalSelector, intervalShowModal);
    });
  });
  close.addEventListener('click', () => {
    removeShow(modalSelector);
  });
  document.addEventListener('keydown', e => {
    if (e.code === 'Escape' && modal.classList.contains('show')) {
      removeShow(modalSelector);
    }
  });
  modal.addEventListener('click', e => {
    if (e.target === modal || e.target.getAttribute('data-close') == '') {
      removeShow(modalSelector);
    }
  });
  function scrollOpenModal() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
      addShow(modalSelector, intervalShowModal);
      window.removeEventListener('scroll', scrollOpenModal);
    }
  }
  window.addEventListener('scroll', scrollOpenModal);
}
/* harmony default export */ __webpack_exports__["default"] = (modal);



/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function slider(_ref) {
  let {
    container,
    slide,
    nextArrow,
    prevArrow,
    totalCounter,
    currentCounter,
    wrapper,
    field
  } = _ref;
  //slider

  const slides = document.querySelectorAll(slide),
    slider = document.querySelector(container),
    buttonPrev = document.querySelector(prevArrow),
    buttonNext = document.querySelector(nextArrow),
    offerSliderWrapper = document.querySelector(wrapper),
    innerSliderWrapper = document.querySelector(field),
    width = window.getComputedStyle(offerSliderWrapper).width;
  let current = document.querySelector(currentCounter);
  let total = document.querySelector(totalCounter);
  let offset = 0;
  let index = 1;
  if (slides.length < 10) {
    total.textContent = `0${slides.length}`;
    current.textContent = `0${index}`;
  } else {
    total.textContent = slides.length;
    current.textContent = index;
  }
  innerSliderWrapper.style.width = 100 * slides.length + '%';
  innerSliderWrapper.style.display = 'flex';
  innerSliderWrapper.style.transition = '0.5s all';
  offerSliderWrapper.style.overflow = 'hidden';
  slides.forEach(item => {
    item.style.width = width;
  });
  slider.style.position = 'relative';
  const indicators = document.createElement('ol'),
    dots = [];
  indicators.classList.add('carousel-indicators');
  slider.append(indicators);
  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.classList.add('dot');
    dot.setAttribute('data-slide-to', i + 1);
    if (i == 0) {
      dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
  }
  const addZeroIndex = () => {
    if (slides.length < 10) {
      current.textContent = `0${index}`;
    } else {
      current.textContent = index;
    }
  };
  const addActiveDot = () => {
    dots.forEach(item => {
      item.style.opacity = '.5';
    });
    dots[index - 1].style.opacity = '1';
  };
  const transformInnerSliderWrapper = () => {
    innerSliderWrapper.style.transform = `translateX(-${offset}px)`;
  };
  buttonNext.addEventListener('click', () => {
    if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
      offset = 0;
    } else {
      offset += +width.slice(0, width.length - 2);
    }
    transformInnerSliderWrapper();
    if (index == slides.length) {
      index = 1;
    } else {
      index++;
    }
    addZeroIndex();
    addActiveDot();
  });
  buttonPrev.addEventListener('click', () => {
    if (offset == 0) {
      offset = +width.slice(0, width.length - 2) * (slides.length - 1);
    } else {
      offset -= +width.slice(0, width.length - 2);
    }
    transformInnerSliderWrapper();
    if (index == 1) {
      index = slides.length;
    } else {
      index--;
    }
    addZeroIndex();
    addActiveDot();
  });
  dots.forEach(item => {
    item.addEventListener('click', e => {
      const slideTo = e.target.getAttribute('data-slide-to');
      index = slideTo;
      offset = +width.slice(0, width.length - 2) * (slideTo - 1);
      transformInnerSliderWrapper();
      addZeroIndex();
      addActiveDot();
    });
  });
}
/* harmony default export */ __webpack_exports__["default"] = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function tabs() {
  const tabheader__items = document.querySelectorAll('.tabheader__item'),
    tabcontent = document.querySelectorAll('.tabcontent');
  const hideBlock = () => {
    tabcontent.forEach(item => {
      item.classList.add('hide');
    });
    tabheader__items.forEach(item => {
      item.classList.remove('tabheader__item_active');
    });
  };
  const visibleTab = function () {
    let i = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
    tabheader__items[i].classList.add('tabheader__item_active');
    tabcontent[i].classList.remove('hide');
  };
  hideBlock();
  visibleTab();
  tabheader__items.forEach((item, i) => {
    item.addEventListener('click', () => {
      hideBlock();
      visibleTab(i);
    });
  });
}
/* harmony default export */ __webpack_exports__["default"] = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
function timer(timerSelector, dateBefore) {
  const timeDifference = function (date) {
    const milliseconds = Date.parse(date) - Date.parse(new Date()),
      days = Math.floor(milliseconds / (1000 * 60 * 60 * 24)),
      hours = Math.floor(milliseconds / (1000 * 60 * 60) % 24) - 3,
      minutes = Math.floor(milliseconds / (1000 * 60) % 60),
      seconds = Math.floor(milliseconds / 1000 % 60);
    return {
      'milliseconds': milliseconds,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
    };
  };
  const addZero = num => {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  };
  const settingTime = (selector, timeBefore) => {
    const timer = document.querySelector(selector),
      days = timer.querySelector('#days'),
      hours = timer.querySelector('#hours'),
      minutes = timer.querySelector('#minutes'),
      seconds = timer.querySelector('#seconds'),
      timeInterval = setInterval(func, 1000);
    func();
    function func() {
      const t = timeDifference(timeBefore);
      days.textContent = addZero(t.days);
      hours.textContent = addZero(t.hours);
      minutes.textContent = addZero(t.minutes);
      seconds.textContent = addZero(t.seconds);
      if (t.milliseconds <= 0) {
        clearInterval(timeInterval);
        days.textContent = '00';
        hours.textContent = '00';
        minutes.textContent = '00';
        seconds.textContent = '00';
      }
    }
  };
  settingTime(timerSelector, dateBefore);
}
/* harmony default export */ __webpack_exports__["default"] = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getDataCard": function() { return /* binding */ getDataCard; },
/* harmony export */   "postData": function() { return /* binding */ postData; }
/* harmony export */ });
const postData = async (url, data) => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: data
  });
  return await res.json();
};
const getDataCard = async url => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Не прошел fetch по ${url} статус ${res.status}`);
  }
  return await res.json();
};



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
// import calc from './modules/calc';
// import cards from './modules/cards';
// import forms from './modules/forms';
// import modal from './modules/modal';
// import slider from './modules/slider';
// import tabs from './modules/tabs';
// import timer from './modules/timer';









document.addEventListener('DOMContentLoaded', () => {
  const intervalShowModal = setInterval(() => {
      (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__.addShow)(modalSelector, intervalShowModal);
    }, 3000),
    modalSelector = '.modal';
  (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_modules_modal__WEBPACK_IMPORTED_MODULE_1__["default"])(modalSelector, intervalShowModal);
  (0,_modules_timer__WEBPACK_IMPORTED_MODULE_2__["default"])('.timer', '2022-12-22');
  (0,_modules_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_modules_calc__WEBPACK_IMPORTED_MODULE_4__["default"])();
  (0,_modules_forms__WEBPACK_IMPORTED_MODULE_5__["default"])(modalSelector, intervalShowModal);
  (0,_modules_slider__WEBPACK_IMPORTED_MODULE_6__["default"])({
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
}();
/******/ })()
;
//# sourceMappingURL=bundle.js.map