const debounceSearch = debounce(searchProducts, 200);
var divContainer = document.getElementById("containeritems");
var searchForm = document.getElementById("searchForm");
var searchInput = document.getElementById("searchInput");
function loadApi() {
    fetch('https://mocki.io/v1/7418b292-1c64-4a7c-ab89-3a69b0191ec5')
        .then(response => response.json())
        .then(data => displayProducts(data));
}

function displayProducts(data) {
    divContainer.innerHTML = ''; // Clear the container before adding new items

    if (data.length === 0) {
        // No matching products found
        divContainer.innerHTML = 'No products found.';
        return;
    }

    data.forEach(item => {
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
        <img class='img_item' src='${thumbnail}' loading='lazy'>
        <button class="add-to-cart-button" onclick="addToCart('${title}', '${price}', '${thumbnail}')">Add to Cart</button>
    `;
    return divPrd;
}

function searchProducts(query) {
    fetch('https://mocki.io/v1/7418b292-1c64-4a7c-ab89-3a69b0191ec5', { method: 'get' })
        .then(response => response.json())
        .then(Data => {
            divContainer.innerHTML = '';

            const filteredData = Data.filter(x => 
                x.name.toLowerCase().includes(query.toLowerCase()) ||
                x.price.toString().includes(query)
            );

            if (filteredData.length === 0) {
                // No matching products found
                divContainer.innerHTML = 'No products found.';
                return;
            }

            filteredData.forEach(item => {
                const { name, price, imgSrc } = item;
                const productElement = createProductElement(name, price, imgSrc);
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
    // Load default products on page load
    loadApi();

    // Add submit event listener to the search form
    searchForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission behavior
        var searchTerm = searchInput.value;
        searchProducts(searchTerm);
    });

    // Add input event listener to the search input
    searchInput.addEventListener('input', function () {
        var searchTerm = searchInput.value;
        debounceSearch(searchTerm);
    });    
};


function getProductsHoodie() {
    fetch('https://mocki.io/v1/7418b292-1c64-4a7c-ab89-3a69b0191ec5', { method: 'get' } )
        .then(response => response.json())
        .then(data => {
            displayProducts(data, 'Hoodie');
        });
}