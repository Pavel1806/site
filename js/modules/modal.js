function removeShow(modalSelector){
    const modal = document.querySelector(modalSelector);

    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function addShow(modalSelector, intervalShowModal){
    const modal = document.querySelector(modalSelector);

    modal.classList.add('show');
    document.body.style.overflow = 'hidden';

    console.log(intervalShowModal);
    if(intervalShowModal)
    {
        clearInterval(intervalShowModal);
    }
    
}

function modal(modalSelector, intervalShowModal){
//modal

    const modal = document.querySelector(modalSelector),
          btn = document.querySelectorAll('[data-modal]'),
          close = modal.querySelector('.modal__close');
          

    btn.forEach((item)=>{
    item.addEventListener('click', ()=>{addShow(modalSelector, intervalShowModal)});
    });

    close.addEventListener('click', ()=>{removeShow(modalSelector)});

    document.addEventListener('keydown', (e)=>{
    if(e.code === 'Escape' && modal.classList.contains('show')){
    removeShow(modalSelector);
    }
    });

    modal.addEventListener('click', (e)=>{
    if(e.target === modal || e.target.getAttribute('data-close')==''){
    removeShow(modalSelector);
    }
    });

    function scrollOpenModal(){
    if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1){
    addShow(modalSelector, intervalShowModal);
    window.removeEventListener('scroll', scrollOpenModal);
    }}

    window.addEventListener('scroll', scrollOpenModal); 
}
export default modal;
export {addShow};
export {removeShow};