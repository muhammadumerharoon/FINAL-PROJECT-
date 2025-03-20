document.addEventListener("DOMContentLoaded", async function () {
      const urlParams = new URLSearchParams(window.location.search);
      const productId = urlParams.get("id");
  
      if (!productId) {
          console.error("Product ID not found in URL");
          return;
      }
  
      try {
          const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
          const product = await response.json();
  
          console.log("Fetched Product:", product);
  
          if (product) {
              document.getElementById("product-title").innerText = product.title;
              document.getElementById("product-image").src = product.image;
              document.getElementById("original-price").innerText = "$" + (product.price * 1.4).toFixed(2);
              document.getElementById("discounted-price").innerText = "$" + product.price.toFixed(2);
              document.getElementById("product-description").innerText = product.description;
  
              fetchSimilarProducts(product.category, product.id);
              fetchReviews(product.id);
          }
      } catch (error) {
          console.error("Error fetching product:", error);
      }
  });
  
  async function fetchSimilarProducts(category, currentProductId) {
      try {
          const response = await fetch(`https://fakestoreapi.com/products/category/${category}`);
          const products = await response.json();
          
          const filteredProducts = products.filter(p => p.id !== currentProductId);
          const productsContainer = document.getElementById("products");
          productsContainer.innerHTML = "";
  
          filteredProducts.slice(0, 4).forEach(product => {
              const productElement = document.createElement("div");
              productElement.classList.add("bg-white", "p-4", "rounded-lg", "shadow-lg");
              productElement.innerHTML = `
                  <img src="${product.image}" class="w-full h-48 object-contain" alt="${product.title}" />
                  <h3 class="text-lg font-bold mt-2">${product.title}</h3>
                  <p class="text-red-600 font-bold">$${product.price}</p>
                  <a href="product-detail.html?id=${product.id}" class="text-blue-500">View Details</a>
              `;
              productsContainer.appendChild(productElement);
          });
      } catch (error) {
          console.error("Error fetching similar products:", error);
      }
  }
  
  async function fetchReviews(productId) {
      try {
          const response = await fetch(`https://jsonplaceholder.typicode.com/comments`);
          const reviews = await response.json();
          const reviewsContainer = document.getElementById("reviewsContainer");
          reviewsContainer.innerHTML = "";
          
          reviews.slice(0, 6).forEach(review => {
              const reviewElement = document.createElement("div");
              reviewElement.classList.add("bg-gray-100", "p-4", "rounded-lg");
              reviewElement.innerHTML = `
                  <p class="font-bold">${review.name}</p>
                  <span class="text-yellow-500">★★★★★</span>
                  <p class="text-gray-700">${review.body}</p>
              `;
              reviewsContainer.appendChild(reviewElement);
          });
      } catch (error) {
          console.error("Error fetching reviews:", error);
      }
  }
  
 
  document.getElementById("increase-quantity").addEventListener("click", () => {
    let qty = document.getElementById("quantity");
    qty.value = parseInt(qty.value) + 1;
});

document.getElementById("decrease-quantity").addEventListener("click", () => {
    let qty = document.getElementById("quantity");
    if (parseInt(qty.value) > 1) { 
        qty.value = parseInt(qty.value) - 1;
    }
});

let addToCartButton = document.getElementById("add-to-cart");

addToCartButton.addEventListener("click", () => {
    addToCart();
});

function addToCart() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    let quantity = parseInt(document.getElementById("quantity").value); 

    fetch(`https://fakestoreapi.com/products/${productId}`)
        .then(res => res.json())
        .then(product => {
            let cart = JSON.parse(localStorage.getItem("cart")) || [];
            product.quantity = quantity; 

            const existingProductIndex = cart.findIndex(item => item.id === product.id);
            if (existingProductIndex !== -1) {
                cart[existingProductIndex].quantity += quantity;
            } else {
                cart.push(product);
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            window.location.href = "Addtocart.html";
        })
        .catch(error => console.error("Error adding to cart:", error));
}

  
