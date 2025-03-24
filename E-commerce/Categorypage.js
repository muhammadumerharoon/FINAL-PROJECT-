async function fetchProducts() {
      try {
          
          const urlParams = new URLSearchParams(window.location.search);
          const category = urlParams.get('category');
  
          let response = await fetch('https://fakestoreapi.com/products');
          let products = await response.json();
          let container = document.getElementById('products-container');
          container.innerHTML = '';
  
          
          let filteredProducts = [];
          if (category === 'clothing') {
              
              filteredProducts = products.filter(p => p.category === "men's clothing" || p.category === "women's clothing");
          } else if (category === 'jewelery') {
              filteredProducts = products.filter(p => p.category === category);
          } else {
             
              filteredProducts = products;
          }
  
          filteredProducts.slice(0, 10).forEach(product => {
              let productCard = `
                  <div class="bg-white p-4 shadow-md rounded-lg">
                      <img src="${product.image}" alt="${product.title}" class="w-full h-48 object-contain mb-4">
                      <h2 class="text-lg font-semibold">${product.title}</h2>
                      <p class="text-gray-500 text-sm">${product.category}</p>
                      <p class="text-xl font-bold mt-2">$${product.price}</p>
                  </div>
              `;
              container.innerHTML += productCard;
          });
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  }
  
  fetchProducts();