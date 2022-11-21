function calc(){
      //calc

  
let sexItems = document.querySelector('#gender').querySelectorAll('.calculating__choose-item'),
    activityItems = document.querySelector('.calculating__choose_big').querySelectorAll('.calculating__choose-item'),
    result = document.querySelector('.calculating__result span').innerText;

let sex , height, weight, age, activity, answer;

function localStorageSetSex(item){
sexItems.forEach((item1)=>{
item1.classList.remove('calculating__choose-item_active');

if(item1.id == item){
  item1.classList.add('calculating__choose-item_active');
}
});
}

function localStorageSetActivity(item){
activityItems.forEach((item1)=>{
item1.classList.remove('calculating__choose-item_active');

if(item1.getAttribute('data-activity') == item){
  item1.classList.add('calculating__choose-item_active');
}
});
}

if(localStorage.getItem('sex')){
sex = localStorage.getItem('sex');
localStorageSetSex(sex);
}else{
sex = 'female';
}

if(localStorage.getItem('activity')){
activity = localStorage.getItem('activity');
localStorageSetActivity(activity);
}else{
activity = 1.375;
}

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
      localStorage.setItem('sex', item.id);
    }else if(item.id === 'female'){
      sex = item.id;
      localStorage.setItem('sex', item.id);
    }else{
      activity = +item.getAttribute('data-activity');
      localStorage.setItem('activity', activity);
    }
  }else{
    activity = +item.getAttribute('data-activity');
  }
  item.classList.add('calculating__choose-item_active');
  summ();
});
});
}

const dataSize = (selector)=>{
const input = document.querySelector(selector);
input.addEventListener('input',(e)=>{

if(input.value.match(/\D/g)){
  input.style.border = '2px solid red';
}else{
  input.style.border = 'none';
}

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
}
export default calc;