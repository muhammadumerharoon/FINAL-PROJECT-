document.addEventListener('DOMContentLoaded', function () {
  var Hamburgericon = document.getElementById('Hamburgericon');
  var Closemenu = document.getElementById('Closemenu');
  var Sidebar = document.getElementById('Sidebar');
  var sidebarOverlay = document.getElementById('sidebarOverlay');


  Hamburgericon.addEventListener('click', function () {
    Sidebar.classList.remove('-translate-x-full');
    sidebarOverlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  });

  function closeSidebar() {
    Sidebar.classList.add('-translate-x-full');
    sidebarOverlay.classList.add('hidden');
  }

  Closemenu.addEventListener('click', closeSidebar);
  sidebarOverlay.addEventListener('click', closeSidebar);

});


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
                  <div class="text-yellow-500 flex justify-center">${stars}</div>
                  <p class="text-black text-lg font-bold">$${product.price}</p>
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


document.addEventListener("DOMContentLoaded", async function () {
  const API_URL = "https://jsonplaceholder.typicode.com/comments";
  const reviewsContainer = document.getElementById("reviews-container");

  try {
    let response = await fetch(API_URL);
    let reviews = await response.json();

    reviews.slice(0, 10).forEach(review => {
      let reviewSlide = document.createElement("div");
      reviewSlide.classList.add("swiper-slide");

      reviewSlide.innerHTML = `
                  <div class="bg-white  rounded-2xl p-6 text-left border">
                      <div class="text-yellow-500 mb-2 text-2xl">★★★★★</div>
                      <div class="font-bold text-lg text-black mb-2">${review.name}</div>
                      <p class="text-gray-600 text-sm">"${review.body}"</p>
                  </div>
              `;

      reviewsContainer.appendChild(reviewSlide);
    });

    new Swiper(".mySwiper", {
      slidesPerView: 1,
      spaceBetween: 20,
      navigation: {
        nextEl: ".custom-swiper-next",
        prevEl: ".custom-swiper-prev",
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      loop: true,
      breakpoints: {
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
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








