let listCart = [];

function checkCart() {
  var cookieValue = document.cookie.split('; ').find(row => row.startsWith('listCart='));
  
  if (cookieValue) {
    listCart = JSON.parse(cookieValue.split('=')[1]);
  } else {
    listCart = [];
  }
}

function addCartToHTML() {
  let listCartHTML = document.querySelector('.returnCart .list');
  let totalHTML = document.querySelector('.totalQuantity');
  let totalPriceHTML = document.querySelector('.totalPrice');
  listCartHTML.innerHTML = "";
  let totalQuantity = 0;
  let totalPrice = 0;
  
  listCart.forEach(product => {
    if (product) {
      let newCart = document.createElement('div');
      newCart.classList.add('item');
      newCart.innerHTML = `
        <img src="${product.image}">
        <div class="info">
          <div class="name">${product.name}</div>
          <div class="price">${product.price}/1 product</div>
        </div>
        <div class="quantity">${product.quantity}</div>
        <div class="returnPrice">$${(product.quantity * product.price).toFixed(2)}</div>`;
      
      listCartHTML.appendChild(newCart);
      totalQuantity += product.quantity;
      totalPrice += (product.quantity * product.price);
    }
  });

  totalHTML.innerText = totalQuantity;
  totalPriceHTML.innerText = "$" + totalPrice.toFixed(2);
}

checkCart();
addCartToHTML();
