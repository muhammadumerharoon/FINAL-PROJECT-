document.addEventListener("DOMContentLoaded", function () {
  updateCart();
});


function updateCart() {

  let cart = JSON.parse(localStorage.getItem("cart"));

  const cartContainer = document.getElementById("cart-items");

  cartContainer.innerHTML = "";

  let subtotal = 0;
  
  let totalItems = 0;


  if (cart.length === 0) {
    cartContainer.innerHTML = `
        <div class="text-center py-8">
          <p class="text-gray-500">Your cart is empty</p>
          <a href="Categorypage.html" class="text-blue-500 hover:underline">Continue shopping</a>
        </div>`;
  } else {

    cart.forEach((item, index) => {


      totalItems += item.quantity;
      subtotal += item.price * item.quantity;


      cartContainer.innerHTML += `
          <div class='flex items-center justify-between p-4 border-b'>
            <img src="${item.image}" class="w-20 h-20 object-contain"/>
            <div>
              <h3 class="font-semibold">${item.title}</h3>
              <p class="text-gray-500">Price: $${item.price.toFixed(2)}</p>
              <div class="flex items-center space-x-2 mt-1">

                <button onclick="decreaseQuantity(${index})" class="px-2 py-1 bg-gray-300 rounded">-</button>
                <span>${item.quantity}</span>
                <button onclick="increaseQuantity(${index})" class="px-2 py-1 bg-gray-300 rounded">+</button>
              </div>

            </div>
            <div class="flex flex-col items-end">
              <p class="text-gray-700 font-semibold">$${(item.price * item.quantity).toFixed(2)}</p>
              <button onclick="removeItem(${index})" class="text-red-500 mt-2">
                <i class="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>`;
    });
  }


  const discount = subtotal * 0.2;

  const total = subtotal - discount + 15;

  document.getElementById("subtotal").innerText = `$${subtotal.toFixed(2)}`;

  document.getElementById("discount").innerText = `-$${discount.toFixed(2)}`;

  document.getElementById("total").innerText = `$${total.toFixed(2)}`;

  document.getElementById("cart-count").textContent = totalItems;
}



function removeItem(index) {

  let cart = JSON.parse(localStorage.getItem("cart"));

  cart.splice(index, 1);

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCart();
}



function decreaseQuantity(index) {

  let cart = JSON.parse(localStorage.getItem("cart"));

  if (cart[index].quantity > 1) {

    cart[index].quantity--;

  } else {

    cart.splice(index, 1);

  }

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCart();
}




function increaseQuantity(index) {

  let cart = JSON.parse(localStorage.getItem("cart"));

  cart[index].quantity++;

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCart();
}




document.getElementById("checkout-btn").addEventListener("click", function () {

  let cart = JSON.parse(localStorage.getItem("cart"));

  if (cart.length === 0) {

    alert("Your cart is empty. Please add items before checkout.");

  } else {

    window.location.href = "Checkoutpage.html";
  }
});








