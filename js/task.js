import products_data from './data.js';
//console.log(products_data);
const set_products = (item) => {
    localStorage.setItem("products", JSON.stringify(item));
    return item;
};
let products = localStorage.getItem("products") !== null ? JSON.parse(localStorage.getItem("products"))
    : set_products(products_data);
//console.log(products);

/////////////////////////////////////////////////////////////////////////////////////////
let item_append = document.getElementById("products"), cart_indicator = document.getElementById("no_of_product")
    , cart_products = document.getElementById("cart_products");
const render_cards = (items) => {
    products = localStorage.getItem("products") !== null ? JSON.parse(localStorage.getItem("products"))
        : set_products(products_data);
    //console.log(items);
    let render_product = "", cart_count = 0, cart_product = "";
    for (let it of items) {
        render_product += `<div class="col-12 col-sm-12 col-md-6 col-lg-4 ">
                <div class="card">
                <h1>${it.product_name}</h1>
                <img src="images/${it.product_image}" alt="${it.product_name}" style="width:100%">
                <button class="btn1" onClick="show_details(${it.id})">quick_view </button>
                <h2>
                    ${it.product_price} $ 
                </h2>
                <button class="${it.added_to_cart ? 'btn3' : 'btn2'}" onClick="toggele_item_to_cart(${it.id})">
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
    item_append.innerHTML = render_product;
    cart_indicator.innerText = cart_count;
    cart_products.innerHTML = cart_product;
}

///////////////////////////////////////////////////////////////////////////

render_cards(products);
/////////////////////////////////////////////
window.toggele_item_to_cart = (item_id) => {
    // console.log(item_id);
    let new_products = products.map((it) => {
        if (it.id === item_id) {
            return { ...it, added_to_cart: (!it.added_to_cart) }
        } else {
            return it;
        }
    });
    //console.log(new_products);
    set_products(new_products);
    render_cards(new_products);

}
///////////////////////////////////////////////////////////////////////////
window.show_details = (item_id) => {
    document.getElementById("modal").style.display = "block";
    //console.log(item_id);
    let one_product = products.filter((it) => {
        return (it.id === item_id);

    })
    // console.log(one_product);
    let product = `
    <h1> ${one_product[0].product_name}</h1>
    <img src="images/${one_product[0].product_image}" alt="gold-coin" style="width:100%">
    <h2>
    ${one_product[0].product_price} $
    </h2>
                <div  >
                ${one_product[0].product_name} is 
                ${one_product[0].added_to_cart ? ' Added To Cart' : 'Not Added To Cart '}
                 </div>   
    `;
    document.getElementById("modal_item").innerHTML = product;

}