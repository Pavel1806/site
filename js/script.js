document.addEventListener('DOMContentLoaded', ()=>{


	const tabheader__items = document.querySelectorAll('.tabheader__item'),
	      tabcontent = document.querySelectorAll('.tabcontent');


	const hideBlock = ()=>{
		tabcontent.forEach(item=>{
		    	  item.classList.add('hide')
		    });
		    
			tabheader__items.forEach(item=>{
		      item.classList.remove('tabheader__item_active')
		    });
	};

	const visibleTab = (i=0)=>{
		
		tabheader__items[i].classList.add('tabheader__item_active');
		tabcontent[i].classList.remove('hide');
	};

    hideBlock();
    visibleTab();

    tabheader__items.forEach((item, i)=>{
    	item.addEventListener('click', ()=>{
    		hideBlock();
    		visibleTab(i);

     })
   });


   //timer

   const dateBefore = '2022-11-22';

   const timeDifference = function(date){
   	const milliseconds = Date.parse(date) - Date.parse(new Date()),
   	      days = Math.floor(milliseconds / (1000 * 60 * 60 * 24)),
   	      hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24)-3,
   	      minutes = Math.floor((milliseconds / (1000 * 60)) % 60),
   	      seconds = Math.floor((milliseconds / 1000) % 60);

   	return {
   		'milliseconds':milliseconds,
   		'days': days,
   		'hours': hours,
   		'minutes': minutes,
   		'seconds': seconds,

   	};

   }

    const addZero = (num)=>{
    	if(num >= 0 && num<10 )
    	{
    		return`0${num}`
    	}else{
    		return num;
    	}
    }


  const settingTime = (selector, timeBefore)=>{
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

      if(t.milliseconds <= 0 ){
      clearInterval(timeInterval);
      days.textContent = '00';
      hours.textContent = '00';
      minutes.textContent = '00';
      seconds.textContent = '00';


    }
    }
  }

  settingTime('.timer',dateBefore);



  //modal

  const modal = document.querySelector('.modal'),
        btn = document.querySelectorAll('[data-modal]'),
        close = modal.querySelector('.modal__close');
        intervalShowModal = null;//setInterval(addShow, 30000000000);


  function removeShow(){
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }

  function addShow(){
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    clearInterval(intervalShowModal);
  }

  btn.forEach((item)=>{
    item.addEventListener('click', addShow);
  });

  close.addEventListener('click', removeShow);

  document.addEventListener('keydown', (e)=>{
    if(e.code === 'Escape' && modal.classList.contains('show')){
      removeShow();
    }
  });

  modal.addEventListener('click', (e)=>{
    if(e.target === modal || e.target.getAttribute('data-close')==''){
    removeShow();
    }
  });

  function scrollOpenModal(){
    if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1){
    addShow();
    window.removeEventListener('scroll', scrollOpenModal);
    }
  }

  window.addEventListener('scroll', scrollOpenModal); 





//cardProduct

class ProductCard{
  constructor(img, alt, title, text, price){
      this.img = img;
      this.alt = alt;
      this.title = title;
      this.text = text;
      this.price = price;
  }

  render(){
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

  const getDataCard = async (url) => {
  const res = await fetch(url);
    if(!res.ok){
      throw new Error(`Не прошел fetch по ${url} статус ${res.status}`);
    }
  return (await res.json());
  }

  getDataCard('http://localhost:3000/menu').then(data=>{
  data.forEach(({img, altimg, title, descr, price}) => {
    new ProductCard(img, altimg, title, descr, price).render();
  })})


      //отправка данных из форм на сервер

      const data = document.querySelectorAll('form');
      const message={
        loading:'img/pinner.svg',
        success: 'Мы скоро с вами свяжемся!',
        failure: 'Что то пошло не так'
      }

      data.forEach(item =>{            
        processingPostData(item);
      });

  const postData = async (url, data) => {
  const res = await fetch(url, 
            {method: 'POST', 
              headers:{
                'Content-Type': 'application/json'},
              body: data
            })
    return await res.json();
  }

  function processingPostData(form){

    form.addEventListener('submit', (e)=>{
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
      formData.forEach((value, key)=>{
        jsonData[key]=value;
      });

          //console.log(JSON.stringify(jsonData));

          postData('http://localhost:3000/requests', JSON.stringify(jsonData))
    .then(result => {
                console.log(result);
                reverseBodyForm(message.success);
                statusMessage.remove();
              })
      .catch(() => {reverseBodyForm(message.failure)})
      .finally(() => {form.reset()});
        });
        
        
      }

function reverseBodyForm(message){
  const form = document.querySelector('.modal');
  const formDialog = form.querySelector('.modal__dialog');

  addShow();
  formDialog.classList.add('hide');


  const div = document.createElement('div');
  div.classList.add('modal__dialog');
  div.innerHTML=`
        <div class="modal__content">
          <div class="modal__close" data-close>&times;</div>
          <div class="modal__title">${message}</div>
        </div>
  `;
  form.append(div);

  setTimeout(()=>{
    div.remove();
    formDialog.classList.remove('hide');
    removeShow();
  }, 4000)

}



  //slider

  const slides = document.querySelectorAll('.offer__slide'),
        slider = document.querySelector('.offer__slider'),
        buttonPrev = document.querySelector('.offer__slider-prev'),
        buttonNext = document.querySelector('.offer__slider-next'),
        offerSliderWrapper = document.querySelector('.offer__slider-wrapper'),
        innerSliderWrapper = document.querySelector('.inner__slider-wrapper'),
        width = window.getComputedStyle(offerSliderWrapper).width;   
  let current = document.querySelector('#current');
  let total = document.querySelector('#total');

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



  //calc

  
  let sexItems = document.querySelector('#gender').querySelectorAll('.calculating__choose-item'),
        activityItems = document.querySelector('.calculating__choose_big').querySelectorAll('.calculating__choose-item'),
        result = document.querySelector('.calculating__result span').innerText;
  
  let sex = 'female', height, weight, age, activity = 1.375, answer;

  const summ = ()=>{
    if(sex == 'male'){
      answer = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age))*activity);
    }else{
      answer = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age))*activity);
    }

    if(!sex || !height || !weight || !age || !activity)
    {
      result='____';
      
    }else{
      result = answer;
    }
   document.querySelector('.calculating__result span').innerText = result;
  }

  summ();

  const hideShow = (sexOrActivityItems)=>{
    sexOrActivityItems.forEach((item)=>{
      item.addEventListener('click', (e)=>{
        sexOrActivityItems.forEach((item1)=>{
          item1.classList.remove('calculating__choose-item_active');
        });
        if(item.id === 'male' || 'female'){
          if(item.id === 'male'){
            sex = item.id;
            console.log(sex);
          }else if(item.id === 'female'){
            sex = item.id;
            console.log(sex);
          }else{
            activity = +item.getAttribute('data-activity');
            console.log(activity);
          }
          
        }else{
          activity = +item.data-activity;
          console.log(activity);
        }
        item.classList.add('calculating__choose-item_active');
        summ();
      });
    });
  }

  const dataSize = (selector)=>{
    const input = document.querySelector(selector);
    
    input.addEventListener('input',(e)=>{
      switch(input.getAttribute('id')){
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
  }
  
  hideShow(sexItems);
  hideShow(activityItems);

  dataSize('#height');
  dataSize('#weight');
  dataSize('#age');

});