const apiURL = "https://fakestoreapi.com/products";
let allProducts = [];

async function fetchProducts() {
    try {
        const response = await fetch(apiURL);
        allProducts = await response.json();
        showDefaultProducts();
    } catch (error) {
        console.error(error);
    }
}




function showDefaultProducts() {
    const clothing = allProducts.filter(p => p.category.includes("clothing")).slice(0, 4);
    const jewelry = allProducts.filter(p => p.category.includes("jewelery")).slice(0, 4);

    displayProducts(clothing, "products-container");
    displayProducts(jewelry, "top-selling-container");
}




function displayProducts(products, containerId) {
      document.getElementById(containerId).innerHTML = products.map(product => {
          const Title = product.title.length > 30 ? product.title.substring(0, 27) + "..." : product.title;
          const stars = getStarRating(product.rating.rate);
  
          return `
          <a href="Productdetailpage.html?id=${product.id}" class="block">
              <div class="bg-white p-4 rounded-lg text-center">
                  <img src="${product.image}" class="w-full h-40 object-contain mb-2" />
                  <h3 class="text-lg font-semibold">${Title}</h3>
                  <div class="text-yellow-500 flex justify-center">${stars} <span class="text-gray-600 text-sm ml-2">(${product.rating.rate} ⭐)</span></div>
                  <p class="text-gray-600 text-lg font-bold">$${product.price}</p>
              </div>
          </a>`;
      }).join("");
  }
  




function getStarRating(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0 ? "☆" : "";
    return "★".repeat(fullStars) + halfStar;
}

fetchProducts();


document.addEventListener("DOMContentLoaded", async function() {
      const API_URL = "https://jsonplaceholder.typicode.com/comments";
      const reviewsContainer = document.getElementById("reviews-container");
  
      try {
          let response = await fetch(API_URL);
          let reviews = await response.json();
  
          reviews.slice(0, 10).forEach(review => {
              let reviewSlide = document.createElement("div");
              reviewSlide.classList.add("swiper-slide");
  
              reviewSlide.innerHTML = `
                  <div class="bg-white shadow-lg rounded-2xl p-6 text-left border">
                      <div class="text-yellow-500 text-lg mb-2">★★★★★</div>
                      <div class="font-bold text-lg text-gray-800 mb-2">${review.name}</div>
                      <p class="text-gray-600 text-sm">"${review.body}"</p>
                  </div>
              `;
  
              reviewsContainer.appendChild(reviewSlide);
          });
  
          new Swiper(".mySwiper", {
              slidesPerView: 1,
              spaceBetween: 20,
              navigation: {
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
              },
              pagination: {
                  el: ".swiper-pagination",
                  clickable: true,
              },
              loop: true
          });
  
      } catch (error) {
          console.error("Error fetching reviews:", error);
      }
  });


  document.addEventListener("DOMContentLoaded", async function () {
    const API_URL = "https://jsonplaceholder.typicode.com/comments";
    const reviewsContainer = document.getElementById("reviews-container");

    try {
      let response = await fetch(API_URL);
      let reviews = await response.json();

      reviews.slice(0, 12).forEach((review) => {
        let reviewSlide = document.createElement("div");
        reviewSlide.classList.add("swiper-slide");

        reviewSlide.innerHTML = `
          <div class="bg-white shadow-lg rounded-2xl p-6 text-left border">
            <div class="text-yellow-500 text-lg mb-2">★★★★★</div>
            <div class="font-bold text-lg text-gray-800 mb-2">${review.name}</div>
            <p class="text-gray-600 text-sm">"${review.body}"</p>
          </div>
        `;

        reviewsContainer.appendChild(reviewSlide);
      });

      new Swiper(".mySwiper", {
        slidesPerView: 3,
        spaceBetween: 20,
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        loop: true,
        breakpoints: {
          640: { slidesPerView: 1 },
          1024: { slidesPerView: 2 },
          1280: { slidesPerView: 3 },
        },
      });
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  });

  function redirectToCategory(category) {
    window.location.href = `Categorypage.html?category=${category}`;
}

function redirectToCategory(category) {
    window.location.href = `Categorypage.html?category=${category}`;
}