var divContainer = document.getElementById("containeritems");
var searchForm = document.getElementById("searchForm");
var searchInput = document.getElementById("searchInput");

function loadApi() {
    fetch('https://mocki.io/v1/7418b292-1c64-4a7c-ab89-3a69b0191ec5')
        .then(response => response.json())
        .then(data => displayProducts(data, 'Hoodie'));
}

function displayProducts(data, category) {
    divContainer.innerHTML = ''; // Clear the container before adding new items

    data.filter(item => item.category === category).forEach(item => {
        const { name, price, imgSrc } = item;
        const productElement = createProductElement(name, price, imgSrc);
        divContainer.appendChild(productElement);
    });
}

function createProductElement(title, price, thumbnail) {
    const divPrd = document.createElement("div");
    divPrd.classList.add("item");
    divPrd.innerHTML = `
        <div class="product-title">${title}</div>
        <div class="product-price">${price}</div>
        <img class='img_item' src='${thumbnail}'>
        <button class="add-to-cart-button" onclick="addToCart('${title}', '${price}', '${thumbnail}')">Add to Cart</button>
    `;
    return divPrd;
}


function searchProducts(query, category) {
    fetch('https://mocki.io/v1/7418b292-1c64-4a7c-ab89-3a69b0191ec5', { method: 'get' })
        .then(response => response.json())
        .then(data => {
            divContainer.innerHTML = ''; // Clear the existing content

            data.filter(x =>
                x.category === category && // Check if the product belongs to the 'Hoodie' category
                (x.name.toLowerCase().includes(query.toLowerCase()) ||
                x.price.toString().includes(query))
            ).forEach(item => {
                displayProd(item);
            });
        });
}

function getProductsHoodie() {
    fetch('https://mocki.io/v1/7418b292-1c64-4a7c-ab89-3a69b0191ec5', { method: 'get' } )
        .then(response => response.json())
        .then(data => {
            displayProducts(data, 'Hoodie');
        });
}

function displayProd(pa) {
    let title = pa.name;
    let price = pa.price;
    let thumbnail = pa.imgSrc;
    var divPrd = document.createElement("div");
    divPrd.classList.add("item");
    divPrd.innerHTML = `
        <div class="product-title">${title}</div>
        <div class="product-price">${price}</div>
        <img class='img_item' src='${thumbnail}'>
        <button class="add-to-cart-button" onclick="addToCart('${title}', '${price}', '${thumbnail}')">Add to Cart</button>
    `;
    divContainer.append(divPrd);
}

window.onload = function () {
    // Load default products on the Hoodie page
    getProductsHoodie();

    // Add submit event listener to the search form
    searchForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission behavior
        var searchTerm = searchInput.value;
        searchProducts(searchTerm, 'Hoodie');
    });

    // Add input event listener to the search input
    searchInput.addEventListener('input', function () {
        var searchTerm = searchInput.value;
        searchProducts(searchTerm, 'Hoodie');
    });
};