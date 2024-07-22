let iconCart = document.querySelector('.iconCart');
let close = document.querySelector('.close');
let cart = document.querySelector('.cart');
let container = document.querySelector('.container');
let items = document.querySelector('.item');
let btnSubs = document.querySelector('.btnSub');

iconCart.addEventListener('click', () => {
  if(cart.style.right == "-100%"){
    cart.style.right = "0";
    container.style.transform = "translateX(-400px)";
  } else{
    cart.style.right = "-100%";
    container.style.transform = "translateX(0)";
  }
});

close.addEventListener('click', () => {
  cart.style.right = "-100%";
  container.style.transform = "translateX(0)";
});

let product = null;
fetch('data.json')
.then(response => response.json())
.then(data => {product= data; addProduct()});

function addProduct(){
    let listProducts = document.querySelector(".listProduct");
    listProducts.innerHTML = "";	
    listProducts.innerHTML =
    product.map((e)=>{
        return(
            `
            <div class="item">
                <img src="${e.image}" alt="">
                <h2>${e.name} / Black / Automatic</h2>
                <div class="price">${e.price}</div>
                <button>Add To Cart</button>
            </div>
            `
        )
    })
}


