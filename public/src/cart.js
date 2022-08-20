let basket = JSON.parse(localStorage.getItem("data")) || [];
let label = document.getElementById("label");
let shoppingCart = document.getElementById("shopping-cart");

let calculation = () => {
    let cartIcon = document.getElementById('cartAmount');
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
}
calculation();

let generateCartItems = () => {
    if(basket.length !== 0) {
        return (
            shoppingCart.innerHTML = basket.map((x) => {
                let {id, item} = x;
                let search = shopItemsData.find((y) => y.id === id) || [];
                return `
                    <div class="cart-item">
                        <img src="${search.img}" alt="">
                        <div class="details">
                            <div class="title-price-x">
                                <h4>
                                    <p>${search.name}</p>
                                    <p>$ ${search.price}</p>
                                </h4>
                                <i class="bi bi-x-lg"></i>
                            </div>
                            <div class="buttons">
                                <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                                <div id="${id}" class="quantity">
                                    ${item}
                                </div>
                                <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                            </div>    
                            <h3>$ ${item * search.price}</h3>
                        </div>
                    </div>
                `;
            }).join("")
        );
    }else{
        shoppingCart.innerHTML = ``;
        label.innerHTML = `
            <h2>Cart is empty!</h2>
            <a href="index.html">
                <button class="homeBtn">Back to home</button>
            </a>
        `;
    }
}

generateCartItems();

let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if(search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1
        });
    } else {
        search.item += 1;
    }

    update(selectedItem.id);
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
}

let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if(search === undefined) {
        return;
    } else if(search.item === 0) {
        return;
    } else {
        search.item -= 1;
    }

    update(selectedItem.id);
    basket = basket.filter((x) => x.item !== 0);

    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
}

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
}