document.addEventListener("DOMContentLoaded", function () {
      loadCartForCheckout();
  });

  function loadCartForCheckout() {
      let cart = JSON.parse(localStorage.getItem("cart"));
      const checkoutContainer = document.getElementById("checkout-items");
      checkoutContainer.innerHTML = "";
      let subtotal = 0;

      cart.forEach(item => {
          item.quantity = item.quantity;
          subtotal += item.price * item.quantity;

          let itemElement = document.createElement("div");
          itemElement.classList.add("flex", "items-center", "justify-between", "p-4", "border-b");
          itemElement.innerHTML = `
              <img src="${item.image}" class="w-20 h-20 object-contain"/>
              <div>
                  <h3 class="font-semibold ml-8">${item.title}</h3>
                  <p class="text-black ml-8">Price: $${item.price.toFixed(2)}</p>
                  <p class="text-black ml-8 font-semibold">Quantity: ${item.quantity}</p>
              </div>
          `;
          checkoutContainer.appendChild(itemElement);
      });

      const discount = subtotal * 0.2;
      const total = subtotal - discount + 15;

      document.getElementById("subtotal").innerText = `$${subtotal.toFixed(2)}`;
      document.getElementById("discount").innerText = `-$${discount.toFixed(2)}`;
      document.getElementById("total").innerText = `$${total.toFixed(2)}`;
  }

  document.getElementById("payNowButton").addEventListener("click", function () {
      const userInfo = {
          email: document.getElementById("email").value,
          firstName: document.getElementById("firstName").value,
          lastName: document.getElementById("lastName").value,
          address: document.getElementById("address").value,
          apartment: document.getElementById("apartment").value,
          city: document.getElementById("city").value,
          postalCode: document.getElementById("postalCode").value,
          cardNumber: document.getElementById("cardNumber").value,
          expiryDate: document.getElementById("expiryDate").value,
          securityCode: document.getElementById("securityCode").value,
          cardHolderName: document.getElementById("cardHolderName").value
      };

      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      window.location.href = "Thankyoupage.html";
  });
  