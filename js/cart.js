function addToCart(title, price, thumbnail) {
    var existingCartItem = document.querySelector(`.cart-list .cart-item[data-title="${title}"]`);

    if (existingCartItem) {
        var quantityElement = existingCartItem.querySelector('.cart-item-quantity');
        var quantity = parseInt(quantityElement.value);

        // Increment the quantity, but ensure it does not exceed the limit (10000)
        quantityElement.value = Math.min(quantity + 1, 10000);
    } else {
        var cartList = document.querySelector('.cart-list');
        // Add item to the cart
        addItemToCart(cartList, title, price, thumbnail);
    }

    // Trigger a custom event to notify the offcanvas script
    var event = new Event('cartUpdated');
    document.dispatchEvent(event);

    // Update the total value
    updateTotalPrice();
}

function addItemToCart(cartList, title, price, thumbnail) {
    var cartTotalValue = document.getElementById('cart-total-value');

    var cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.setAttribute('data-title', title);

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
            <input class="cart-item-quantity" type="number" value="1" min="1" max="10000" oninput="validateQuantity(this)">
            <button class="btn btn-sm btn-outline-success" onclick="incrementCartItem(this)">+</button>
            <button class="btn btn-sm btn-outline-danger" onclick="deleteCartItem(this)"><i class="fa-solid fa-trash"></i></button>
        </div>
    `;

    cartItem.appendChild(thumbnailElement);
    cartItem.appendChild(cartItemDetails);

    cartList.appendChild(cartItem);
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

// Listen for the custom event
document.addEventListener('cartUpdated', updateTotalPrice);

// Update the total value
function updateTotalPrice() {
    var totalPrice = calculateTotalPrice();
    document.getElementById('cart-total-value').textContent = totalPrice.toFixed(2);
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

function deleteCartItem(button) {
    var cartItem = button.closest('.cart-item');
    cartItem.remove();
    // Update the total value
    updateTotalPrice();
}

function decrementCartItem(button) {
    var quantityInput = button.parentElement.querySelector('.cart-item-quantity');
    var quantity = parseInt(quantityInput.value);

    if (quantity > 1) {
        // If quantity is more than 1, decrement it
        quantityInput.value = quantity - 1;
    }
    // Update the total value
    updateTotalPrice();
}

function incrementCartItem(button) {
    var quantityInput = button.parentElement.querySelector('.cart-item-quantity');
    var quantity = parseInt(quantityInput.value);

    // Increment the quantity, but ensure it does not exceed the limit (10000)
    quantityInput.value = Math.min(quantity + 1, 10000);

    // Update the total value
    updateTotalPrice();
}

var debouncedUpdateTotalPrice;

function calculateTotalPrice() {
    // Clear any existing debounced function
    clearTimeout(debouncedUpdateTotalPrice);

    // Create a debounced function to update the total price after 500 milliseconds of inactivity
    debouncedUpdateTotalPrice = setTimeout(function () {
        var cartItems = document.querySelectorAll('.cart-item');
        var total = 0;

        cartItems.forEach(function (cartItem) {
            var priceElement = cartItem.querySelector('.cart-item-price');
            var quantityInput = cartItem.querySelector('.cart-item-quantity');
            var price = parseFloat(priceElement.textContent.replace('$', ''));
            var quantity = parseInt(quantityInput.value);

            total += price * quantity;
        });

        // Update the total value
        var totalPriceElement = document.getElementById('cart-total-value');
        totalPriceElement.textContent = total.toFixed(2);
    }, 200);
}
