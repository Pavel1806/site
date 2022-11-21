import {getDataCard} from '../services/services';

function cards(){
    
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
        getDataCard('http://localhost:3000/menu').then(data=>{
        data.forEach(({img, altimg, title, descr, price}) => {
        new ProductCard(img, altimg, title, descr, price).render();
        })})
}

export default cards;