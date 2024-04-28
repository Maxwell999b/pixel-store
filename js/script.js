var divContainer = document.getElementById("containeritems");

function fetchProducts() {
  return fetch("https://raw.githubusercontent.com/Maxwell999b/pixel-store/main/json/product.json", {
    method: "get",
  }).then((response) => response.json());
}

function getProducts() {
  fetchProducts().then((json) => {
    let fragment = document.createDocumentFragment();

    for (const item of json) {
      displayProd(item, fragment);
    }

    divContainer.appendChild(fragment);
  });
}

function displayProd(p, container) {
  let title = p.name;
  let price = p.price;
  let thumbnail = p.imgSrc;
  var divPrd = document.createElement("div");
  divPrd.innerHTML = "<br>" + title + "<br>" + price + "<br>" + "<img class='img_item' src='" + thumbnail + "'>";
  divPrd.classList.add("item");
  container.appendChild(divPrd);
}

getProducts();

var textarea = document.querySelector(".form-control");
var textareaContent = document.querySelector(".textarea-content");

textarea.addEventListener("input", function () {
  textareaContent.textContent = textarea.value;
});
