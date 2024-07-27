let iconCart = document.querySelector('.iconCart');
let close = document.querySelector('.close');
let cart = document.querySelector('.cart');
let container = document.querySelector('.container');
let items = document.querySelector('.item');

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
    product.map((e)=>{
    let newProduct = document.createElement("div");
    newProduct.classList.add("item");
    newProduct.innerHTML =
    `
    <div class="item">
      <img src="${e.image}" alt="">
      <h3>${e.name} Black / Automatic</h3>
      <div class="price">${e.price}$</div>
      <button onclick= 'addToCart(${e.id})' >Add To Cart</button>
    </div>
    `
    listProducts.appendChild(newProduct);
  });
}

let listCart =[]

function checkCart(){
  var cookieValue = document.cookie
  .split(';')
  .find(row => row.startsWith('listCart='));
  if (cookieValue) {
    listCart = JSON.parse(cookieValue.split('=')[1]);
  } else {
    listCart = [];
  }
}

checkCart();

function addToCart($proId){
 
  let productsCopy = JSON.parse(JSON.stringify(product));
  if(!listCart[$proId]){
    listCart[$proId] = productsCopy.filter(pro => pro.id === $proId)[0];
    listCart[$proId].quantity=1;
  } else{
    listCart[$proId].quantity++;
  }
  document.cookie = "listCart=" + JSON.stringify(listCart) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";
  addCartToHTML();
}

addCartToHTML();

function addCartToHTML(){
  let listCartHTML = document.querySelector('.listCart');
  let totalHTML = document.querySelector('.totalQuantity');
  listCartHTML.innerHTML = "";
  let totalQuantity = 0;
  listCart.forEach(product =>{
    if (product){
      let newCart = document.createElement('div');
      newCart.classList.add('item');
      newCart.innerHTML =
      `
                <img src="${product.image}">
                <div class="content">
                    <div class="name">${product.name}</div>
                    <div class="price">${product.price}</div>
                </div>
                <div class="quantity">
                    <button onclick = 'changeQuantity(${product.id, '-'})'>-</button>
                    <span class="value">${product.quantity}</span>
                    <button onclick = 'changeQuantity(${product.id}, '+')'>+</button>
                </div>`
      
      listCartHTML.appendChild(newCart);
      totalQuantity = totalQuantity + product.quantity;
    }
  })
  totalHTML.innerText = totalQuantity
}




