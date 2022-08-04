const inputSearch = document.querySelector("#input-search");
const gridProducts = document.querySelector(".grid-products");
const buttons = document.querySelectorAll(".btn");

let allProducts = [];

const filters = {
  searchItems: " ",
};

// EventListeners

document.addEventListener("DOMContentLoaded", () => {
  axios.get("http://localhost:3001/items").then((res) => {
    allProducts = res.data;

    renderProducts(allProducts, filters);
  });
});

inputSearch.addEventListener("input", (e) => {
  filters.searchItems = e.target.value;
  renderProducts(allProducts, filters);
});

function renderProducts(allProducts, filters) {
  let filteredProducts = allProducts.filter((p) =>
    p.title.toLowerCase().includes(filters.searchItems.toLowerCase())
  );

  gridProducts.innerHTML = "";

  filteredProducts.forEach((product) => {
    let productDiv = document.createElement("div");
    productDiv.className = "product";

    productDiv.innerHTML = `
            <div class="header">
                 <img src="${product.image}" alt="image of product" />
            </div>
            <div class="desc">
                <p>productTitle: ${product.title}</p>
                <p>productPrice: $ ${product.price}</p>
            </div>
            <button>More details</button>
    `;

    gridProducts.appendChild(productDiv);
  });
}

//filters by tab value

buttons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let filter = e.target.dataset.filter;
    filters.searchItems = filter;

    renderProducts(allProducts, filters);
  });
});
