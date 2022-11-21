function tabs(){
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
}

export default tabs;