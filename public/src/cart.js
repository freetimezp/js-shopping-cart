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
                let {name, img, price} = search;
                return `
                    <div class="cart-item">
                        <img src="${img}" alt="">
                        <div class="details">
                            <div class="title-price-x">
                                <h4>
                                    <p>${name}</p>
                                    <p>$ ${price}</p>
                                </h4>
                                <i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
                            </div>
                            <div class="buttons">
                                <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                                <div id="${id}" class="quantity">
                                    ${item}
                                </div>
                                <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                            </div>    
                            <h3>$ ${item * price}</h3>
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
    localStorage.setItem("data", JSON.stringify(basket));
    generateCartItems();
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

    localStorage.setItem("data", JSON.stringify(basket));
    generateCartItems();
}

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    totalAmount();
}

let removeItem = (id) => {
    //console.log(id);
    let selectedItem = id;
    basket = basket.filter((x) => x.id !== selectedItem.id);
    localStorage.setItem("data", JSON.stringify(basket));
    totalAmount();
    calculation();
    generateCartItems();
}

let clearCart = () => {
    basket = [];
    generateCartItems();
    localStorage.setItem("data", JSON.stringify(basket));
    calculation();
}

let totalAmount = () => {
    if(basket.length !== 0) {
        let amount = basket.map((x) => {
            let {id, item} = x;
            let search = shopItemsData.find((y) => y.id === id);
            return item * search.price;
        }).reduce((x, y) => x + y, 0);

        label.innerHTML = `
            <div>
                <h2>Total amount: $ ${amount}</h2>
                <div>
                    <button class="checkout">Checkout</button>
                    <button onclick="clearCart()" class="removeAll">Clear cart</button>
                </div>
            </div>
        `;
    }else{
        return;
    }
}

totalAmount();