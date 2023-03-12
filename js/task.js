import productsData from './data.js';
//console.log(productsData);
const setProducts = (item) => {
    localStorage.setItem("products", JSON.stringify(item));
    return item;
};
let products = localStorage.getItem("products") !== null ? JSON.parse(localStorage.getItem("products"))
    : setProducts(productsData);
//console.log(products);

/////////////////////////////////////////////////////////////////////////////////////////
const itemAppend = document.getElementById("products"), cartIndicator = document.getElementById("no_of_product")
    , cartProducts = document.getElementById("cart_products");
const renderCardItems = (items) => {
    products = localStorage.getItem("products") !== null ? JSON.parse(localStorage.getItem("products"))
        : setProducts(productsData);
    //console.log(items);
    let render_product = "", cart_count = 0, cart_product = "";
    for (let it of items) {
        render_product += `<div class="col-12 col-sm-12 col-md-6 col-lg-4 ">
                <div class="card">
                <h1>${it.product_name}</h1>
                <img src="images/${it.product_image}" alt="${it.product_name}" style="width:100%">
                <button class="btn1" onClick="showModalOneItem(${it.id})">quick_view </button>
                <h2>
                    ${it.product_price} $ 
                </h2>
                <button class="${it.added_to_cart ? 'btn3' : 'btn2'}" onClick="toggeleItemToCart(${it.id})">
                ${it.added_to_cart ? 'Remove from Cart' : 'Add To Cart '}
                </button>    
                </div>

                </div>`;
        //////////////////////////////cart_count and cart_product////////////////////////////////////
        if (it.added_to_cart) {
            cart_count += 1;
            cart_product += `<h3>${it.product_name} : ${it.product_price} $</h3>`
        }
    }
    if (cart_count === 0) {
        cart_product = `<h3> No Products Added</h3>`
    }
    itemAppend.innerHTML = render_product;
    cartIndicator.innerText = cart_count;
    cartProducts.innerHTML = cart_product;
}

///////////////////////////////////////////////////////////////////////////

renderCardItems(products);
/////////////////////////////////////////////
window.toggeleItemToCart = (item_id) => {
    // console.log(item_id);
    let new_products = products.map((it) => {
        if (it.id === item_id) {
            return { ...it, added_to_cart: (!it.added_to_cart) }
        } else {
            return it;
        }
    });

    //console.log(new_products);
    setProducts(new_products);
    renderCardItems(new_products);

}
///////////////////////////////////////////////////////////////////////////
window.showModalOneItem = (item_id) => {
    document.getElementById("modal").style.display = "block";
    //console.log(item_id);
    let oneProduct = products.filter((it) => {
        return (it.id === item_id);

    })
    // console.log(oneProduct);
    let product = `
    <h1> ${oneProduct[0].product_name}</h1>
    <img src="images/${oneProduct[0].product_image}" alt="${oneProduct[0].product_name}" style="width:100%">
    <h2>
    ${oneProduct[0].product_price} $
    </h2>
                <div  >
                ${oneProduct[0].product_name} is 
                ${oneProduct[0].added_to_cart ? ' Added To Cart' : 'Not Added To Cart '}
                 </div>   
    `;
    document.getElementById("modal_item").innerHTML = product;

}