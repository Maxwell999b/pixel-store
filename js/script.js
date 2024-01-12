var divContainer = document.getElementById("containeritems")
fetch('https://mocki.io/v1/7418b292-1c64-4a7c-ab89-3a69b0191ec5', { method: 'get' } )
.then(response => response.json())
.then(json => container.innerHTML = JSON.parse(json));
function getProducts(){
    fetch('https://mocki.io/v1/7418b292-1c64-4a7c-ab89-3a69b0191ec5', { method: 'get' } )
    .then(response => response.json())
    .then(json => 
        {
            let str =''
            for (const item of json) {
                displayProd(item)
            }
        });
}

function displayProd(p) {
    let title = p.name
    let price = p.price
    let thumbnail = p.imgSrc
    var divPrd = document.createElement("div")
    divPrd.innerHTML += "<br>" + title + "<br>" + price + "<br>" + "<img class='img_item' src='" + thumbnail + "'>"
    divPrd.setAttribute("class", "item")
    divContainer.append(divPrd)
  }
getProducts();