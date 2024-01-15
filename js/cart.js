function addToCart(title, price, thumbnail) {
    var existingCartItem = document.querySelector(`.cart-list .cart-item[data-title="${title}"]`);

    if (existingCartItem) {
        var quantityElement = existingCartItem.querySelector('.cart-item-quantity');
        var quantity = parseInt(quantityElement.textContent);
        quantityElement.textContent = quantity + 1;
    } else {
        var cartList = document.querySelector('.cart-list');
        // Add item to the cart
        addItemToCart(cartList, title, price, thumbnail);
    }

    // Trigger a custom event to notify the offcanvas script
    var event = new Event('cartUpdated');
    document.dispatchEvent(event);
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
            <button class="btn btn-sm btn-outline-danger" onclick="removeCartItem(this)">-</button>
            <span class="cart-item-quantity">1</span>
            <button class="btn btn-sm btn-outline-success" onclick="addCartItem(this)">+</button>
        </div>
    `;

    cartItem.appendChild(thumbnailElement);
    cartItem.appendChild(cartItemDetails);

    cartList.appendChild(cartItem);
}
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

function calculateTotalPrice() {
    var cartItems = document.querySelectorAll('.cart-item');
    var total = 0;

    cartItems.forEach(function (cartItem) {
        var priceElement = cartItem.querySelector('.cart-item-price');
        var quantityElement = cartItem.querySelector('.cart-item-quantity');
        var price = parseFloat(priceElement.textContent.replace('$', ''));
        var quantity = parseInt(quantityElement.textContent);

        total += price * quantity;
    });

    return total;
}
