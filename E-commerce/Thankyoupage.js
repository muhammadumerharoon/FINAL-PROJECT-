document.addEventListener("DOMContentLoaded", function () {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      const cart = JSON.parse(localStorage.getItem("cart"));

      if (userInfo) {
          document.getElementById("userInfo").innerHTML = `
              <p>Email: ${userInfo.email}</p>
              <p>Name: ${userInfo.firstName} ${userInfo.lastName}</p>
              <p>Address: ${userInfo.address}, ${userInfo.apartment}, ${userInfo.city}, ${userInfo.postalCode}</p>
              <p>Card Holder: ${userInfo.cardHolderName}</p>
          `;
      }

      if (cart) {
          let orderSummaryHTML = "";
          let subtotal = 0;

          cart.forEach(item => {
              subtotal += item.price * item.quantity;
              orderSummaryHTML += `
                  <div class="flex items-center justify-between p-4 border-b">
                      <img src="${item.image}" class="w-20 h-20 object-contain"/>
                      <div>
                          <h3 class="font-semibold ml-8">${item.title}</h3>
                          <p class="text-black ml-8">Price: $${item.price.toFixed(2)}</p>
                          <p class="text-black ml-8 font-semibold">Quantity: ${item.quantity}</p>
                      </div>
                  </div>
              `;
          });

          const discount = subtotal * 0.2;
          const total = subtotal - discount + 15;

          orderSummaryHTML += `
              <p class="text-gray-600">Subtotal: <span class="float-right font-semibold">$${subtotal.toFixed(2)}</span></p>
              <p class="text-gray-600">Discount (-20%): <span class="float-right text-red-500">-$${discount.toFixed(2)}</span></p>
              <p class="text-gray-600">Shipping: <span class="float-right">FREE</span></p>
              <hr class="my-3" />
              <p class="text-lg font-bold">Total: <span class="float-right">$${total.toFixed(2)}</span></p>
          `;

          document.getElementById("orderSummary").innerHTML = orderSummaryHTML;
      }
  });

  function goBack() {
      window.location.href = "Categorypage.html"; 
  }
  
  