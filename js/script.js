const promotionSections = document.querySelectorAll('.promotion__list');
const allPromotions = document.querySelector('.promotion--all');
const forNewCustomers = document.querySelector('.promotion--new');
const switchBtns = document.querySelectorAll('.tab');

document.addEventListener("DOMContentLoaded", render);

switchBtns.forEach(item => {
    item.addEventListener('click', changeContent);
});

function render() {

    fetch('http://www.mocky.io/v2/5bc3b9cc30000012007586b7')
        .then( res => res.json())
        .then(data => {
             
            for (let i =0; i < data.length; i++) {

                let promotion = document.createElement('li');
                promotion.classList.add('promotion');

                promotion.innerHTML = `
                <h2> ${data[i].name} </h2>
                <p> ${data[i].description} </p>
                <div class="btn-area"> 
                    <button class="btn btn--term"> ${data[i].termsAndConditionsButtonText} </button>
                    <button class="btn btn--join"> ${data[i].joinNowButtonText} </button>
                </div>`;
                
                allPromotions.prepend(promotion);

                if (data[i].onlyNewCustomers) {
                    forNewCustomers.prepend(promotion);
                }
            }
        });
}

function changeContent(e) {
    for (let section of promotionSections) {
        if (this.dataset['section'] !=  section.dataset['section']) {
            section.style.display = "none";
        } else {
            section.style.display = "block";
        }
    }

    for (let btn of switchBtns) {
        btn.classList.remove('tab--active');
    }
    e.target.classList.add('tab--active');
}