let currentPage = 1;
const productsPerPage = 6; 
let products = [];

async function fetchProducts() {
  try {
    let response = await fetch('https://fakestoreapi.com/products');
    products = await response.json();
    renderProducts();
    updatePagination();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function renderProducts() {
  let container = document.getElementById('products-container');
  container.innerHTML = '';

  
  let startIdx = (currentPage - 1) * productsPerPage;
  let endIdx = startIdx + productsPerPage;
  let paginatedProducts = products.slice(startIdx, endIdx);

  paginatedProducts.forEach(product => {
    let productCard = `
      <div class="bg-white p-4 rounded-lg">
        <img src="${product.image}" alt="${product.title}" class="w-full h-48 object-contain mb-4">
        <h2 class="text-lg font-semibold">${product.title}</h2>
        <p class="text-gray-500 text-sm">${product.category}</p>
        <p class="text-xl font-bold mt-2">$${product.price}</p>
      </div>`;
    container.innerHTML += productCard;
  });
}

function updatePagination() {
  let paginationContainer = document.getElementById('pagination');
  paginationContainer.innerHTML = '';

 
  let totalPages = Math.ceil(products.length / productsPerPage);

  
  let prevButton = document.createElement('button');
  prevButton.textContent = '←';
  prevButton.className = `px-4 py-2 rounded-md ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-300 hover:bg-gray-400'}`;
  prevButton.onclick = () => {
    if (currentPage > 1) {
      currentPage--;
      renderProducts();
      updatePagination();
    }
  };
  paginationContainer.appendChild(prevButton);


  for (let i = 1; i <= totalPages; i++) {
    let pageButton = document.createElement('button');
    pageButton.textContent = i;
    pageButton.className = `px-4 py-2 mx-1 rounded-md ${i === currentPage ? 'bg-black text-white' : 'bg-gray-300 hover:bg-gray-400'}`;
    pageButton.onclick = () => {
      currentPage = i;
      renderProducts();
      updatePagination();
    };
    paginationContainer.appendChild(pageButton);
  }

  
  let nextButton = document.createElement('button');
  nextButton.textContent = '→';
  nextButton.className = `px-4 py-2 rounded-md ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-gray-300 hover:bg-gray-400'}`;
  nextButton.onclick = () => {
    if (currentPage < totalPages) {
      currentPage++;
      renderProducts();
      updatePagination();
    }
  };
  paginationContainer.appendChild(nextButton);
}

fetchProducts();
