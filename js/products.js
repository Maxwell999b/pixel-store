const debounceSearch = debounce(searchProducts, 200);
var divContainer = document.getElementById("containeritems");
var searchForm = document.getElementById("searchForm");
var searchInput = document.getElementById("searchInput");
const pageCategory = getPageCategory();
function loadApi() {
  fetch("https://mocki.io/v1/d2da016c-2ebf-4e5e-9907-3dfeaf86bf82")
    .then((response) => response.json())
    .then((data) => {
      if (pageCategory === "Hoodie") {
        displayProducts(data.filter((item) => item.category === "Hoodie"));
      } else if (pageCategory === "Pants") {
        displayProducts(data.filter((item) => item.category === "Pants"));
      } else if (pageCategory === "Backpack") {
        displayProducts(data.filter((item) => item.category === "Backpack"));
      } else if (pageCategory === "Belts") {
        displayProducts(data.filter((item) => item.category === "Belts"));
      } else if (pageCategory === "Shoes") {
        displayProducts(data.filter((item) => item.category === "Shoes"));
      } else if (pageCategory === "Socks") {
        displayProducts(data.filter((item) => item.category === "Socks"));
      } else {
        displayProducts(data);
      }
    });
}

function getProductsHoodie() {
  fetch("https://mocki.io/v1/d2da016c-2ebf-4e5e-9907-3dfeaf86bf82", { method: "get" })
    .then((response) => response.json())
    .then((data) => {
      // Display only Hoodie products
      displayProducts(data.filter((item) => item.category === "Hoodie"));
    });
}

function getProductsPants() {
  fetch("https://mocki.io/v1/d2da016c-2ebf-4e5e-9907-3dfeaf86bf82", { method: "get" })
    .then((response) => response.json())
    .then((data) => {
      // Display only Pants products
      displayProducts(data.filter((item) => item.category === "Pants"));
    });
}

function getProductsBackpack() {
  fetch("https://mocki.io/v1/d2da016c-2ebf-4e5e-9907-3dfeaf86bf82", { method: "get" })
    .then((response) => response.json())
    .then((data) => {
      // Display only Backpack Backpack
      displayProducts(data.filter((item) => item.category === "Backpack"));
    });
}

function getProductsBelts() {
  fetch("https://mocki.io/v1/d2da016c-2ebf-4e5e-9907-3dfeaf86bf82", { method: "get" })
    .then((response) => response.json())
    .then((data) => {
      // Display only Belts products
      displayProducts(data.filter((item) => item.category === "Belts"));
    });
}

function getProductsShoes() {
  fetch("https://mocki.io/v1/d2da016c-2ebf-4e5e-9907-3dfeaf86bf82", { method: "get" })
    .then((response) => response.json())
    .then((data) => {
      // Display only Shoes products
      displayProducts(data.filter((item) => item.category === "Shoes"));
    });
}

function getProductsSocks() {
  fetch("https://mocki.io/v1/d2da016c-2ebf-4e5e-9907-3dfeaf86bf82", { method: "get" })
    .then((response) => response.json())
    .then((data) => {
      // Display only Socks products
      displayProducts(data.filter((item) => item.category === "Socks"));
    });
}

function displayProducts(data) {
  divContainer.innerHTML = ""; // Clear the container before adding new items
  if (data.length === 0) {
    // No matching products found
    divContainer.innerHTML = "No products found.";
    return;
  }

  data.forEach((item) => {
    const { name, price, imgSrc, category } = item;
    const productElement = createProductElement(name, price, imgSrc, category);
    divContainer.appendChild(productElement);
  });
}

function createProductElement(title, price, thumbnail, productName) {
  const divPrd = document.createElement("div");
  divPrd.classList.add("item");

  divPrd.innerHTML = `
    <div class="product-info">
      <div class="product-title">${title}</div>
      <div class="product-price">${price}</div>
        <div class="rating" data-productname='${productName}'>
        <span class="star" data-value="1">&#9733;</span>
        <span class="star" data-value="2">&#9733;</span>
        <span class="star" data-value="3">&#9733;</span>
        <span class="star" data-value="4">&#9733;</span>
        <span class="star" data-value="5">&#9733;</span>
      </div>
    </div>
    <div class="product-image">
      <img class='img_item' src='${thumbnail}' loading='lazy' data-productname='${productName}'>
      <button class="add-to-cart-button" onclick="addToCart('${title}', '${price}', '${thumbnail}')">Add to Cart</button>
    </div>
  `;

  const ratingDiv = divPrd.querySelector(".rating");

  // Attach mouseover and mouseout event listeners to the product container
  divPrd.addEventListener("mouseover", function () {
    ratingDiv.style.display = "block";
  });

  divPrd.addEventListener("mouseout", function () {
    ratingDiv.style.display = "block";
  });

  // Attach event listeners to each star span
  const stars = ratingDiv.querySelectorAll(".star");
  stars.forEach((star) => {
    star.addEventListener("click", function () {
      const value = parseInt(this.getAttribute("data-value"));
      clearStars(divPrd);
      fillStars(divPrd, value);
    });
  });

  return divPrd;
}

function searchProducts(query) {
  fetch("https://mocki.io/v1/d2da016c-2ebf-4e5e-9907-3dfeaf86bf82", { method: "get" })
    .then((response) => response.json())
    .then((Data) => {
      divContainer.innerHTML = "";

      const isProductsPage = window.location.pathname.includes("Products.html");
      const isHoodiePage = window.location.pathname.includes("Hoodie.html");
      const isPantsPage = window.location.pathname.includes("Pants.html");
      const isBackpackPage = window.location.pathname.includes("Backpack.html");
      const isBeltsPage = window.location.pathname.includes("Belts.html");
      const isShoesPage = window.location.pathname.includes("Shoes.html");
      const isSocksPage = window.location.pathname.includes("Socks.html");

      const filteredData = Data.filter(
        (item) =>
          (isProductsPage || item.category === pageCategory) &&
          (item.name.toLowerCase().includes(query.toLowerCase()) || item.price.toString().includes(query))
      );

      if (filteredData.length === 0) {
        // No matching products found
        if (
          isProductsPage ||
          isHoodiePage ||
          isPantsPage ||
          isBackpackPage ||
          isBeltsPage ||
          isShoesPage ||
          isSocksPage
        ) {
          // If it's the Products Page, display "No products found."
          divContainer.innerHTML =
            "<div style='color:white; font-weight: bold; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); font-size: 50px;'>404<div style='font-size: 25px;'>No products found.</div></div>";
          return;
        }
      }

      // If there are matching products, proceed to display them
      filteredData.forEach((item) => {
        const { name, price, imgSrc, category } = item;
        const productElement = createProductElement(name, price, imgSrc, category);
        divContainer.appendChild(productElement);
      });
    });
}

function debounce(func, delay) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), delay);
  };
}

window.onload = function () {
  if (pageCategory === "Hoodie") {
    getProductsHoodie();
  } else if (pageCategory === "Pants") {
    getProductsPants();
  } else if (pageCategory === "Backpack") {
    getProductsBackpack();
  } else if (pageCategory === "Belts") {
    getProductsBelts();
  } else if (pageCategory === "Shoes") {
    getProductsShoes();
  } else if (pageCategory === "Socks") {
    getProductsSocks();
  } else {
    loadApi();
  }

  // Add submit event listener to the search form
  searchForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission behavior
    var searchTerm = searchInput.value;
    searchProducts(searchTerm);
  });

  // Add input event listener to the search input
  searchInput.addEventListener("input", function () {
    var searchTerm = searchInput.value;
    debounceSearch(searchTerm);
  });
};

function getPageCategory() {
  // Get the current page URL
  const currentPageUrl = window.location.pathname;

  // Extract the category from the URL (assuming URLs like "Products.html" and "Hoodie.html")
  const categoryMatch = currentPageUrl.match(/\/(\w+)\.html/);

  // Return the category or a default value (e.g., 'All' or 'Products')
  return categoryMatch ? categoryMatch[1] : "/Products.html";
}

// 5 star rating
const stars = document.querySelectorAll(".star");

stars.forEach((star) => {
  star.addEventListener("click", () => {
    const value = parseInt(star.getAttribute("data-value"));
    clearStars();
    fillStars(value);
  });
});

function clearStars(productElement) {
  const ratingDiv = productElement.querySelector(".rating");
  const stars = ratingDiv.querySelectorAll(".star");
  stars.forEach((star) => {
    star.classList.remove("active");
  });
}

function fillStars(productElement, value) {
  const ratingDiv = productElement.querySelector(".rating");
  const stars = ratingDiv.querySelectorAll(".star");
  for (let i = 0; i < value; i++) {
    stars[i].classList.add("active");
  }
}
