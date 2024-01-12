var divContainer = document.getElementById("containeritems")
const searchcheck = document.querySelector('.search-click');
const searchbtnc = document.querySelector('.search-check');
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
    divPrd.innerHTML += "<br>" + title + "<br>" + price + "<br>" + "<img class='img_item' src='" + thumbnail + "' +>"
    divPrd.setAttribute("class", "item")
    divContainer.append(divPrd)
}
// getProducts()
window.onload = getProducts()

const uwu = document.querySelector('.search-click').value;

searchbtnc.onclick =function searchbarvalue(uwu)
{
    fetch('https://mocki.io/v1/7418b292-1c64-4a7c-ab89-3a69b0191ec5', { method: 'get' } )
    .then(response => response.json())
    .then(Data => 
        {
            for (const item of Data.filter(x=>x.name== uwu)) {
                // debugger;
                displayProd(x)
            }
        });
}
// searchcheck.addEventListener('submit' , searchbarvalue)
// searchcheck.addEventListener('change' , searchbarvalue)

