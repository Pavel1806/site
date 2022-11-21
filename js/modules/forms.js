import {addShow, removeShow} from './modal';
import {postData} from '../services/services';

function forms(modalSelector, intervalShowModal){
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

 addShow(modalSelector, intervalShowModal);
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
   removeShow(modalSelector);
 }, 4000)

}
}
export default forms;