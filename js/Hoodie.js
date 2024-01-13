var divContainer = document.getElementById("containeritems");
var searchForm = document.getElementById("searchForm");
var searchInput = document.getElementById("searchInput");

function Loadapi(){
    fetch('https://mocki.io/v1/7418b292-1c64-4a7c-ab89-3a69b0191ec5', { method: 'get' } )
    .then(response => response.json())
    .then(json => container.innerHTML = JSON.parse(json));
}
function getProducts(){
    fetch('https://mocki.io/v1/7418b292-1c64-4a7c-ab89-3a69b0191ec5', { method: 'get' } )
    .then(response => response.json())
    .then(Data => 
        {
            let str =''
            for (const item of Data) {
                displayProd(item)
            }
        });
}
function displayProd(pa) {
    let title = pa.name
    let price = pa.price
    let thumbnail = pa.imgSrc
    var divPrd = document.createElement("div")
    divPrd.innerHTML += "<br>" + title + "<br>" + price + "<br>" + "<img class='img_item' src='" + thumbnail + "'>"
    divPrd.setAttribute("class", "item")
    divContainer.append(divPrd)
}

function getProductsHoodie(category){
    fetch('https://mocki.io/v1/7418b292-1c64-4a7c-ab89-3a69b0191ec5', { method: 'get' } )
    .then(response => response.json())
    .then(Data => 
        {
            let str =''
            for (const item of Data.filter(x=>x.category==category)) {
                displayProd(item)
            }
        });
}

function searchProducts(query) {
    fetch('https://mocki.io/v1/7418b292-1c64-4a7c-ab89-3a69b0191ec5', { method: 'get' })
        .then(response => response.json())
        .then(Data => {
            divContainer.innerHTML = ''; // Clear the existing content

            for (const item of Data.filter(x => 
                x.name.toLowerCase().includes(query.toLowerCase()) ||
                x.price.toString().includes(query)
            )) {
                displayProd(item);
            }
        });
}

window.onload = function () {
    // Load default products on page load
    getProductsHoodie('Hoodie');

    // Add submit event listener to the search form
    searchForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission behavior
        var searchTerm = searchInput.value;
        searchProducts(searchTerm);
    });

    // Add input event listener to the search input
    searchInput.addEventListener('input', function () {
        var searchTerm = searchInput.value;
        searchProducts(searchTerm);
    });
};
