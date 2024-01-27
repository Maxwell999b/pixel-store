// Update the addToCart function
function addToCart(title, price, thumbnail) {
    var cartList = document.querySelector('.cart-list');
    var existingCartItem = cartList.querySelector(`.cart-item[data-title="${title}"]`);

    if (existingCartItem) {
        var quantityElement = existingCartItem.querySelector('.cart-item-quantity');
        var quantity = parseInt(quantityElement.value);

        if (quantity < 100) {
            quantityElement.value = Math.min(quantity + 1, 100);
        }
    } else {
        var productId = title.replace(/\s+/g, '-').toLowerCase() + '-' + Date.now();
        addItemToCart(cartList, title, price, thumbnail, productId);
    }

    // Trigger a custom event when quantity changes
    dispatchQuantityChangeEvent();

    updateTotalPrice();

    // Save the cart to local storage after a delay
    saveCartToLocalStorage(); // Use the updated saveCartToLocalStorageDelayed function
}



// Add this function to update quantity in local storage
function updateQuantityInLocalStorage(title, newQuantity) {
    var cart = JSON.parse(localStorage.getItem('cart'));

    if (cart) {
        var itemToUpdate = cart.find(item => item.title === title);
        if (itemToUpdate) {
            itemToUpdate.quantity = newQuantity;
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }
}

function saveCartToLocalStorage() {
    var cartList = document.querySelector('.cart-list');
    var cartItems = cartList.querySelectorAll('.cart-item');
    var cart = [];

    cartItems.forEach(function (cartItem) {
        var title = cartItem.getAttribute('data-title');
        var priceElement = cartItem.querySelector('.cart-item-price');
        var price = parseFloat(priceElement.textContent.replace(/[^\d.]/g, ''));
        var quantityInput = cartItem.querySelector('.cart-item-quantity');
        var quantity = parseInt(quantityInput.value);
        var thumbnailElement = cartItem.querySelector('.cart-item-thumbnail');
        var thumbnail = thumbnailElement.src;

        cart.push({
            title: title,
            price: price,
            quantity: quantity,
            thumbnail: thumbnail
        });
    });

    localStorage.setItem('cart', JSON.stringify(cart));

    // Check the visibility of the BUY button
    checkBuyButtonVisibility();
}

function saveCartToLocalStorageDelayed() {
    // Clear any existing timeout
    if (window.saveCartTimeout) {
        clearTimeout(window.saveCartTimeout);
    }

    // Set a new timeout for delayed saving
    window.saveCartTimeout = setTimeout(function () {
        saveCartToLocalStorage();
    }, 200); // You can adjust the delay as needed
}



// Function to load the cart from local storage on page load
function loadCartFromLocalStorage() {
    var cartList = document.querySelector('.cart-list');
    var cart = localStorage.getItem('cart');

    if (cart) {
        cart = JSON.parse(cart);

        // Clear existing cart items
        cartList.innerHTML = '';

        cart.forEach(function (item) {
            addItemToCart(cartList, item.title, item.price, item.thumbnail, ''); // Pass the required parameters
            var existingCartItem = cartList.querySelector(`.cart-item[data-title="${item.title}"]`);
            var quantityInput = existingCartItem.querySelector('.cart-item-quantity');
            quantityInput.value = item.quantity; // Update the value directly using quantityInput
        });        

        // Trigger a custom event when the cart is updated
        var event = new Event('cartUpdated');
        document.dispatchEvent(event);

        // Update the total value if #cart-total-value element is present
        var totalPriceElement = document.getElementById('cart-total-value');
        if (totalPriceElement) {
            updateTotalPrice();
        }

        // Check if the BUY button should be visible
        checkBuyButtonVisibility();

        // Update the local storage to ensure it reflects the correct quantity
        saveCartToLocalStorage();
    }
}


document.addEventListener('cartModalUpdated', function () {
    checkBuyButtonVisibility();
});


// Initial setup to load the cart from local storage on page load & cart
document.addEventListener('DOMContentLoaded', function () {
    // Initialize the cart in localStorage if it doesn't exist
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', '[]');
    }

    var buyButton = document.querySelector('.BUY-btn');
    buyButton.style.display = 'none';

    // Load the cart from local storage
    loadCartFromLocalStorage();

    // Use setTimeout to delay the visibility checks
    setTimeout(function () {
        // Add this line to hide the BUY button initially if the cart is empty
        checkBuyButtonVisibility();

        // Update the Cart Badge Count
        updateCartBadgeCount();
    }, 200); // Adjust the delay as needed
});



function addItemToCart(cartList, title, price, thumbnail, productId) {
    var cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.setAttribute('data-title', title);
    cartItem.setAttribute('data-id', productId); // Add product ID attribute

    var thumbnailElement = new Image();
    thumbnailElement.src = new URL(thumbnail, window.location.href).href; // Use absolute path
    thumbnailElement.alt = title;
    thumbnailElement.classList.add('cart-item-thumbnail');

    var cartItemDetails = document.createElement('div');
    cartItemDetails.classList.add('cart-item-details');
    cartItemDetails.innerHTML = `
        <p class="cart-item-title">${title}</p>
        <p class="cart-item-price">${price}</p>
        <div class="cart-item-actions">
            <button class="btn btn-sm btn-outline-secondary" onclick="decrementCartItem(this)">-</button>
            <input class="cart-item-quantity" type="number" value="1" min="1" max="100" oninput="validateQuantity(this)">
            <button class="btn btn-sm btn-outline-success" onclick="incrementCartItem(this)">+</button>
            <button class="btn btn-sm btn-outline-danger" onclick="deleteCartItem(this)"><i class="fa-solid fa-trash"></i></button>
        </div>
    `;

    cartItem.appendChild(thumbnailElement);
    cartItem.appendChild(cartItemDetails);

    cartList.appendChild(cartItem);

    saveCartToLocalStorage();

}



function validateQuantity(input) {
    var value = parseInt(input.value);

    // Ensure the value is a number and not empty
    if (isNaN(value) || value <= 0) {
        input.value = 1;
    } else {
        // Ensure the value does not exceed the limit (100)
        input.value = Math.min(value, 100);
    }

    // Update the total value
    updateTotalPrice();
}

// Update the total value
function updateTotalPrice() {
    var totalPriceElement = document.getElementById('cart-total-value');

    if (totalPriceElement) {
        var totalPrice = calculateTotalPrice();
        totalPriceElement.textContent = 'Total is: ' + (totalPrice !== undefined ? formatNumberWithCommas(totalPrice.toFixed(2)) : '');
    }
}

// Function to format a number with commas
function formatNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Listen for the custom event
document.addEventListener('cartUpdated', updateTotalPrice);

function removeCartItem(button) {
    var cartItem = button.closest('.cart-item');
    var quantityElement = cartItem.querySelector('.cart-item-quantity');
    var quantity = parseInt(quantityElement.textContent);

    if (quantity > 1) {
        // If quantity is more than 1, decrement it
        quantityElement.textContent = quantity - 1;
    } else {
        // If quantity is 1, remove the entire cart item
        cartItem.remove();
    }

    // Update the total value
    var totalPrice = calculateTotalPrice();
    document.getElementById('cart-total-value').textContent = totalPrice.toFixed(2);
}

function addCartItem(button) {
    var quantityElement = button.previousElementSibling;
    var quantity = parseInt(quantityElement.textContent);

    // Increment the quantity
    quantityElement.textContent = quantity + 1;

    // Update the total value
    var totalPrice = calculateTotalPrice();
    document.getElementById('cart-total-value').textContent = totalPrice.toFixed(2);
}



// Update the incrementCartItem function
function incrementCartItem(button) {
    var quantityInput = button.parentElement.querySelector('.cart-item-quantity');
    var quantity = parseInt(quantityInput.value);

    // Increment the quantity, but ensure it does not exceed the limit (10000)
    quantityInput.value = Math.min(quantity + 1, 100);

    // Dispatch custom event when quantity is changed
    dispatchQuantityChangeEvent();

    // Update the total value
    updateTotalPrice();

    // Update the Cart Badge Count
    updateCartBadgeCount();

    // Update the Local Storage
    saveCartToLocalStorage();
}

// Update the decrementCartItem function
function decrementCartItem(button) {
    var quantityInput = button.parentElement.querySelector('.cart-item-quantity');
    var quantity = parseInt(quantityInput.value);

    if (quantity > 1) {
        // If quantity is more than 1, decrement it
        quantityInput.value = quantity - 1;

        // Dispatch custom event when quantity is changed
        dispatchQuantityChangeEvent();
    }

    // Update the total value
    updateTotalPrice();
    // Update the Cart Badge Count
    updateCartBadgeCount();
    // Update the Local Storage
    saveCartToLocalStorage();
}


function deleteCartItem(button) {
    var cartItem = button.closest('.cart-item');
    cartItem.remove();

    // Update the total value
    updateTotalPrice();

    // Trigger a custom event to notify the cart is updated
    var event = new Event('cartUpdated');
    document.dispatchEvent(event);

    // Update the total value
    updateTotalPrice();
    // Update the Cart Badge Count
    updateCartBadgeCount();
    // Update the Local Storage
    saveCartToLocalStorage();
}

// Function to dispatch custom event when quantity changes
function dispatchQuantityChangeEvent() {
    var event = new Event('quantityChanged');
    document.dispatchEvent(event);
}

// Listen for the custom event and update the cart badge count
document.addEventListener('quantityChanged', updateCartBadgeCount);



var debouncedUpdateTotalPrice;

function calculateTotalPrice() {
    var cartItems = document.querySelectorAll('.cart-item');
    var total = 0;

    cartItems.forEach(function (cartItem) {
        var priceElement = cartItem.querySelector('.cart-item-price');
        var quantityInput = cartItem.querySelector('.cart-item-quantity');

        if (priceElement && quantityInput) {
            var price = parseFloat(priceElement.textContent.replace(/[^\d.]/g, '')); // Remove non-numeric characters
            var quantity = parseInt(quantityInput.value);

            if (!isNaN(price) && !isNaN(quantity)) {
                total += price * quantity;
            }
        }
    });

    return total;
}

// Initial setup to update the total price on page load
document.addEventListener('DOMContentLoaded', updateTotalPrice);


function showBuyAlert() {
    // Check if there are items in the cart
    var cartItems = document.querySelectorAll('.cart-item');
    if (cartItems.length > 0) {
        // Show the alert
        var buyAlert = document.getElementById('buyAlert');
        buyAlert.style.display = 'block';

        // Reload the page after a delay
        setTimeout(function () {
            location.reload();
        }, 2500); // 3000 milliseconds (3 seconds) delay before reload

        // Clear the cart modal
        setTimeout(function () {
            clearCartAndBuy();
        }, 500);
    }
}


// Modify the clearCartModal function to update the visibility of the BUY button
// Modify the clearCartModal function to update the visibility of the BUY button
function clearCartModal() {
    var cartList = document.querySelector('.cart-list');
    cartList.innerHTML = ''; // Clear the cart items

    // Trigger a custom event to notify the offcanvas script
    var event = new Event('cartUpdated');
    document.dispatchEvent(event);

    // Update the total value if #cart-total-value element is present
    var totalPriceElement = document.getElementById('cart-total-value');
    if (totalPriceElement) {
        updateTotalPrice();
    }

    // Check if the BUY button should be visible
    var buyButton = document.querySelector('.BUY-btn');
    buyButton.style.display = cartList.hasChildNodes() ? 'inline-block' : 'none';
}

// if i use this one it rest to 1 on Local Storage and the Cart modal 
// // Initial setup to hide the BUY button 
// document.addEventListener('DOMContentLoaded', function () {
//     var buyButton = document.querySelector('.BUY-btn');
//     buyButton.style.display = 'none';

//     // Trigger the loadCartFromLocalStorage function after a slight delay
//     setTimeout(function () {
//         loadCartFromLocalStorage();
//     }, 200); // Adjust the delay as needed
// });


// if i use this one it rest to 1 on Local Storage but on the Cart modal the right quantity
// that i was having before refreshing the page stays on the cart modal until
// i use + or - or add to cart button any other function to make the Local storage catch
// that same quantity
// Add this line to hide the BUY button initially if the cart is empty
document.addEventListener('DOMContentLoaded', function () {
    var buyButton = document.querySelector('.BUY-btn');
    buyButton.style.display = 'none';
});

// Update the visibility of the BUY button when the cart is updated
document.addEventListener('cartUpdated', function () {
    var cartList = document.querySelector('.cart-list');
    var buyButton = document.querySelector('.BUY-btn');
    buyButton.style.display = cartList.hasChildNodes() ? 'inline-block' : 'none';
});

document.addEventListener('DOMContentLoaded', function () {
    // Initial setup to update the total price on page load
    updateTotalPrice();

    // Add other necessary setup or initialization code here
});


// Update the cart badge count for each item
function updateCartBadgeCount() {
    var cartItems = document.querySelectorAll('.cart-item');
    var totalQuantity = 0;

    cartItems.forEach(function (cartItem) {
        var quantityInput = cartItem.querySelector('.cart-item-quantity');
        var quantity = parseInt(quantityInput.value);

        if (!isNaN(quantity)) {
            totalQuantity += quantity;
        }
    });

    updateCartBadge(totalQuantity);
}

// Add this function to update the cart badge
function updateCartBadge(count) {
    var badgeElement = document.getElementById('cart-badge');
    if (badgeElement) {
        badgeElement.textContent = count;
        badgeElement.style.display = count > 0 ? 'inline' : 'none';
    }
}

// Add this function to clear the cart and update the visibility of the BUY button
function clearCartAndBuy() {
    var cartList = document.querySelector('.cart-list');
    cartList.innerHTML = ''; // Clear the cart items

    // Trigger a custom event to notify the offcanvas script
    var event = new Event('cartModalUpdated');
    document.dispatchEvent(event);

    // Update the total value if #cart-total-value element is present
    var totalPriceElement = document.getElementById('cart-total-value');
    if (totalPriceElement) {
        updateTotalPrice();
    }

    // Check if the BUY button should be visible
    checkBuyButtonVisibility();

    // Clear the cart data from local storage
    localStorage.removeItem('cart');
}


// Listen for the custom event
document.addEventListener('cartUpdated', function () {
    var cartItems = document.querySelectorAll('.cart-item');
    var cartItemCount = cartItems.length;
    updateCartBadge(cartItemCount);
});

// Initial setup to update the cart badge count on page load
document.addEventListener('DOMContentLoaded', function () {
    updateCartBadgeCount();
});

// Add this line to hide the BUY button initially if the cart is empty
clearCartModal();

// function to check the visibility of the BUY button
function checkBuyButtonVisibility() {
    var cartList = document.querySelector('.cart-list');
    var buyButton = document.querySelector('.BUY-btn');
    
    // Update the visibility of the BUY button in the cart modal
    buyButton.style.display = cartList.hasChildNodes() ? 'inline-block' : 'none';

    // Update the visibility of the BUY button on the page
    var buyButtonOnPage = document.getElementById('buyButtonOnPage');
    if (buyButtonOnPage) {
        buyButtonOnPage.style.display = cartList.hasChildNodes() ? 'inline-block' : 'none';
    }
}


// Initial setup to update the cart badge count on page load
document.addEventListener('DOMContentLoaded', function () {
    var cartItems = document.querySelectorAll('.cart-item');
    var cartItemCount = cartItems.length;
    updateCartBadge(cartItemCount);
});
// Add an event listener for the input event on quantity inputs
document.addEventListener('input', function (event) {
    if (event.target.classList.contains('cart-item-quantity')) {
        // Dispatch a custom event when quantity is changed
        dispatchQuantityChangeEvent();
        // Save the cart to local storage on quantity change
        saveCartToLocalStorage();
    }
});

updateCartBadgeCount();  

// function showBuyToast() {
//     // Trigger the toast
//     var toast = new bootstrap.Toast(document.getElementById('buyToast'));
//     toast.show();

//     // Close the cart modal
//     $('#offcanvasLeftBothOptions').offcanvas('hide');
// }
