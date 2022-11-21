function slider({container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field}){
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

if(slides.length<10){
total.textContent = `0${slides.length}`;
current.textContent = `0${index}`;
}else{
total.textContent = slides.length;
current.textContent = index;
}

innerSliderWrapper.style.width = 100 * slides.length + '%';
innerSliderWrapper.style.display = 'flex';
innerSliderWrapper.style.transition = '0.5s all';
offerSliderWrapper.style.overflow = 'hidden';

slides.forEach((item)=>{
item.style.width = width;
});

slider.style.position = 'relative';

const indicators = document.createElement('ol'),
  dots = [];

indicators.classList.add('carousel-indicators');

slider.append(indicators);

for(let i =0; i< slides.length; i++){
    const dot = document.createElement('li');
    dot.classList.add('dot');
    dot.setAttribute('data-slide-to', i+1);
    if(i==0){
    dot.style.opacity = 1;
    }
    indicators.append(dot);
    dots.push(dot);
}

const addZeroIndex = ()=>{
if(slides.length<10){
    current.textContent = `0${index}`;
    }else{
    current.textContent = index;
    }
}

const addActiveDot = ()=>{
    dots.forEach((item) => {item.style.opacity = '.5'});
    dots[index - 1].style.opacity = '1';
}

const transformInnerSliderWrapper = ()=>{
    innerSliderWrapper.style.transform = `translateX(-${offset}px)`;
}

buttonNext.addEventListener('click', ()=>{
if(offset == +width.slice(0, width.length-2) * (slides.length - 1)){
    offset = 0;
    }else{
    offset += +width.slice(0, width.length-2);
}
transformInnerSliderWrapper();

if(index == slides.length){
        index = 1;
    }else{
        index++;
}

addZeroIndex();
addActiveDot();
});

buttonPrev.addEventListener('click', ()=>{
    if(offset == 0){
        offset = +width.slice(0, width.length-2) * (slides.length - 1);
    }else{
        offset -= +width.slice(0, width.length-2);
}

transformInnerSliderWrapper();

if(index == 1){
    index = slides.length;
    }else{
    index--;
}

addZeroIndex();
addActiveDot();
});

dots.forEach((item)=>{
item.addEventListener('click',(e)=>{
const slideTo = e.target.getAttribute('data-slide-to');
index = slideTo;

offset = +width.slice(0, width.length-2) * (slideTo - 1);

transformInnerSliderWrapper();
addZeroIndex();
addActiveDot();
});
});
}
export default slider;