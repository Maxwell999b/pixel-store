---
title: JS
---
# JS File structure :

1. <SwmPath>[js/](/js/)</SwmPath>
   1. <SwmPath>[js/search.js](/js/search.js)</SwmPath>
   2. <SwmPath>[js/disabledSearch.js](/js/disabledSearch.js)</SwmPath>
   3. <SwmPath>[js/contact.js](/js/contact.js)</SwmPath>
   4. <SwmPath>[js/toast.js](/js/toast.js)</SwmPath>
   5. <SwmPath>[js/script.js](/js/script.js)</SwmPath>
   6. <SwmPath>[js/products.js](/js/products.js)</SwmPath>
   7. <SwmPath>[js/cart.js](/js/cart.js)</SwmPath>

---

### <SwmPath>[js/products.js](/js/products.js)</SwmPath>

This JavaScript file is primarily responsible for fetching product data from an API, displaying products based on the current page category, and implementing a search functionality for products. It also includes functions for creating product elements and handling product ratings.

#### Key Functions:

1. <SwmToken path="/js/products.js" pos="6:2:4" line-data="function loadApi() {">`loadApi()`</SwmToken>: Fetches product data and displays products based on the current page category.

   - Uses the <SwmToken path="/js/products.js" pos="7:1:1" line-data="  fetch(&quot;https://mocki.io/v1/d2da016c-2ebf-4e5e-9907-3dfeaf86bf82&quot;)">`fetch`</SwmToken> API to make a GET request to a mock API endpoint.

   - Filters the fetched data based on the current page category and displays the filtered products using `displayProducts()`.

2. `getProducts[Category]()`: Fetches product data and displays products of a specific category.

   - Each function is similar to <SwmToken path="/js/products.js" pos="6:2:4" line-data="function loadApi() {">`loadApi()`</SwmToken> but filters the data for a specific category (e.g., Hoodie, Pants, etc.).

3. <SwmToken path="/js/products.js" pos="82:2:5" line-data="function displayProducts(data) {">`displayProducts(data)`</SwmToken>: Displays a list of products on the page.

   - Clears the product container and iterates over the provided data to create and append product elements using `createProductElement()`.

4. <SwmToken path="/js/products.js" pos="97:2:14" line-data="function createProductElement(title, price, thumbnail, productName) {">`createProductElement(title, price, thumbnail, productName)`</SwmToken>: Creates an HTML element for a single product.

   - Creates a `div` element for the product, setting its inner HTML to include the product's name, price, image, and a rating system.

   - Adds event listeners for mouseover and mouseout to show and hide the rating system.

   - Adds event listeners to each star in the rating system to handle user interactions.

5. <SwmToken path="/js/products.js" pos="143:2:5" line-data="function searchProducts(query) {">`searchProducts(query)`</SwmToken>: Filters and displays products based on a search query.

   - Fetches product data and filters it based on the search query and the current page category.

   - Displays the filtered products using `displayProducts()`.

6. <SwmToken path="/js/products.js" pos="190:2:8" line-data="function debounce(func, delay) {">`debounce(func, delay)`</SwmToken>: Creates a debounced version of a function.

   - Returns a new function that delays invoking the provided function until after `delay` milliseconds have elapsed since the last time the debounced function was invoked.

7. <SwmToken path="/js/products.js" pos="231:2:4" line-data="function getPageCategory() {">`getPageCategory()`</SwmToken>: Determines the current page category based on the URL.

   - Uses a regular expression to extract the category from the URL.

### Event Listeners:

- **Window Load Event**: Initializes the product display based on the current page category.

- **Search Form Submit Event**: Prevents the default form submission and calls `searchProducts()` with the search term.

- **Search Input Event**: Calls `debounceSearch()` with the search term to <SwmToken path="/js/products.js" pos="1:6:6" line-data="const debounceSearch = debounce(searchProducts, 200);">`debounce`</SwmToken> the search input.

### General Notes:

- The file uses modern JavaScript features like `fetch` for network requests, `let` and `const` for variable declarations, and arrow functions.

- The `debounce` function is used to improve the performance of the search functionality by limiting the rate at which the search is performed.

- The <SwmToken path="/js/products.js" pos="231:2:4" line-data="function getPageCategory() {">`getPageCategory()`</SwmToken> function dynamically determines the current page category, allowing for a more flexible and dynamic product display based on the URL.

This file plays a crucial role in the functionality of your online store, handling the display and search of products, and providing a user-friendly interface for browsing and searching through the product catalog.

---

### <SwmPath>[js/cart.js](/js/cart.js)</SwmPath>

This JavaScript file manages the shopping cart functionality of your online store, including adding items to the cart, updating quantities, and persisting the cart data in local storage. It also handles the display and updating of the cart's total price, as well as the visibility of the "BUY" button based on the cart's contents.

#### Key Functions:

 1. <SwmToken path="/js/cart.js" pos="2:2:14" line-data="function addToCart(title, price, thumbnail, size) {">`addToCart(title, price, thumbnail, size)`</SwmToken>: Adds a product to the cart.

    - Checks if the product already exists in the cart. If so, increments its quantity; otherwise, adds a new cart item.

    - Updates the total price and saves the cart to local storage.

 2. <SwmToken path="/js/cart.js" pos="39:2:4" line-data="function saveCartToLocalStorage() {">`saveCartToLocalStorage()`</SwmToken>: Saves the current state of the cart to local storage.

    - Serializes the cart data to JSON and stores it in local storage.

 3. <SwmToken path="/js/cart.js" pos="90:2:4" line-data="function loadCartFromLocalStorage() {">`loadCartFromLocalStorage()`</SwmToken>: Loads the cart data from local storage when the page loads.

    - Deserializes the cart data from JSON and updates the cart UI accordingly.

 4. <SwmToken path="/js/cart.js" pos="239:2:4" line-data="function updateTotalPrice() {">`updateTotalPrice()`</SwmToken>: Updates the displayed total price of the cart.

    - Calculates the total price based on the current cart items and their quantities.

 5. <SwmToken path="/js/cart.js" pos="287:2:5" line-data="function incrementCartItem(button) {">`incrementCartItem(button)`</SwmToken> and <SwmToken path="/js/cart.js" pos="308:2:5" line-data="function decrementCartItem(button) {">`decrementCartItem(button)`</SwmToken>: Increments or decrements the quantity of a cart item.

    - Updates the total price and saves the cart to local storage after changing the quantity.

 6. <SwmToken path="/js/cart.js" pos="327:2:5" line-data="function deleteCartItem(button) {">`deleteCartItem(button)`</SwmToken>: Removes a cart item from the cart.

    - Removes the cart item element from the DOM and updates the total price and local storage.

 7. <SwmToken path="/js/cart.js" pos="536:2:4" line-data="function checkBuyButtonVisibility() {">`checkBuyButtonVisibility()`</SwmToken>: Updates the visibility of the "BUY" button based on whether the cart is empty.

 8. <SwmToken path="/js/cart.js" pos="27:2:8" line-data="function updateQuantityInLocalStorage(title, newQuantity) {">`updateQuantityInLocalStorage(title, newQuantity)`</SwmToken>: Updates the quantity of a specific item in the cart stored in local storage.

    - Finds the item in the cart stored in local storage and updates its quantity.

 9. <SwmToken path="/js/cart.js" pos="77:2:4" line-data="function saveCartToLocalStorageDelayed() {">`saveCartToLocalStorageDelayed()`</SwmToken>: Saves the cart to local storage after a delay.

    - Clears any existing timeout and sets a new timeout for delayed saving.

10. <SwmToken path="/js/cart.js" pos="345:2:4" line-data="function dispatchQuantityChangeEvent() {">`dispatchQuantityChangeEvent()`</SwmToken>: Dispatches a custom event when the quantity of a cart item changes.

    - Used to notify other parts of the application about changes in the cart's quantity.

11. <SwmToken path="/js/cart.js" pos="478:2:4" line-data="function updateCartBadgeCount() {">`updateCartBadgeCount()`</SwmToken>: Updates the cart badge count to reflect the total number of items in the cart.

    - Iterates over all cart items to calculate the total quantity and updates the cart badge accordingly.

### Event Listeners:

- <SwmToken path="/js/cart.js" pos="138:5:5" line-data="document.addEventListener(&quot;DOMContentLoaded&quot;, function () {">`DOMContentLoaded`</SwmToken> **Event**: Initializes the cart by loading it from local storage and setting up event listeners.

- **Cart Updated Event**: Updates the total price and cart badge count when the cart is updated.

- **Quantity Changed Event**: Saves the cart to local storage when the quantity of a cart item changes.

- **Cart Modal Updated Event**: Checks the visibility of the "BUY" button when the cart modal is updated.

### General Notes:

- The file uses modern JavaScript features like `localStorage` for persisting cart data across sessions, `let` and `const` for variable declarations, and arrow functions.

- The use of local storage allows the cart data to persist across page reloads and sessions, providing a seamless shopping experience for users.

- The <SwmToken path="/js/cart.js" pos="345:2:4" line-data="function dispatchQuantityChangeEvent() {">`dispatchQuantityChangeEvent()`</SwmToken> function is used to notify other parts of the application about changes in the cart's quantity, allowing for dynamic updates to the UI and other functionalities.

This file is a core component of your online store's functionality, handling the shopping cart's state and ensuring a smooth and efficient shopping experience for users.

---

### <SwmPath>[js/script.js](/js/script.js)</SwmPath>

This JavaScript file is responsible for fetching and displaying product data from an API, as well as handling user input in a textarea to dynamically update text content elsewhere on the page.

#### Key Functions:

1. <SwmToken path="/js/script.js" pos="3:2:4" line-data="function fetchProducts() {">`fetchProducts()`</SwmToken>: Fetches product data from a specified API endpoint.

   - Uses the <SwmToken path="/js/script.js" pos="4:3:3" line-data="  return fetch(&quot;https://mocki.io/v1/d2da016c-2ebf-4e5e-9907-3dfeaf86bf82&quot;, { method: &quot;get&quot; }).then((response) =&gt;">`fetch`</SwmToken> API to make a GET request to the provided URL.

   - Returns a promise that resolves with the JSON response from the API.

2. <SwmToken path="/js/script.js" pos="9:2:4" line-data="function getProducts() {">`getProducts()`</SwmToken>: Fetches product data and displays products on the page.

   - Calls <SwmToken path="/js/script.js" pos="3:2:4" line-data="function fetchProducts() {">`fetchProducts()`</SwmToken> to get the product data.

   - Creates a document fragment to efficiently append multiple elements to the DOM.

   - Iterates over the fetched product data, calling `displayProd()` for each product to create and append its HTML representation to the fragment.

   - Appends the fragment to a container element with the ID <SwmToken path="/js/script.js" pos="1:11:11" line-data="var divContainer = document.getElementById(&quot;containeritems&quot;);">`containeritems`</SwmToken>.

3. <SwmToken path="/js/script.js" pos="21:2:8" line-data="function displayProd(p, container) {">`displayProd(p, container)`</SwmToken>: Creates and appends an HTML element for a single product.

   - Takes a product object `p` and a container element as arguments.

   - Creates a `div` element for the product, setting its inner HTML to include the product's name, price, and an image.

   - Adds a class `item` to the `div`.

   - Appends the `div` to the provided container.

4. **Event Listener for Textarea Input**: Updates the text content of an element with the class `textarea-content` to match the value of a textarea with the class `form-control`.

### General Notes:

- The file uses modern JavaScript features like `fetch` for network requests, `let` and `const` for variable declarations, and arrow functions.

- The <SwmToken path="/js/script.js" pos="3:2:4" line-data="function fetchProducts() {">`fetchProducts()`</SwmToken> function is a generic function for fetching data from any API endpoint, making it versatile for different parts of your application.

- The `displayProd()` function is designed to dynamically create and append elements to the DOM based on the fetched data, allowing for dynamic content updates.

- The event listener for textarea input provides a flexible way to handle user interactions, making it adaptable to various input types and actions.

This file serves as a foundation for various functionalities within your application, demonstrating a modular approach to handling different aspects of your application's behavior, such as fetching and displaying dynamic content and responding to user input.

---

### <SwmPath>[js/toast.js](/js/toast.js)</SwmPath>

This JavaScript file is responsible for managing toast notifications within your application. Toast notifications are small, non-modal messages that appear on the screen to provide feedback to the user, such as confirming an action or displaying a system message.

#### Key Functions:

1. <SwmToken path="/js/toast.js" pos="3:3:3" line-data="  var notificationSound = new Audio(&quot;../sounds/notifications-sound-toast-play.mp3&quot;);">`notificationSound`</SwmToken>: An <SwmToken path="/js/toast.js" pos="3:9:9" line-data="  var notificationSound = new Audio(&quot;../sounds/notifications-sound-toast-play.mp3&quot;);">`Audio`</SwmToken> object for playing a notification sound.

   - Initializes an `Audio` object with a specified sound file path.

2. <SwmToken path="/js/toast.js" pos="6:3:3" line-data="  var myToast = new bootstrap.Toast(document.querySelector(&quot;.toast&quot;)); // Ignore error: undeclared variable &#39;bootstrap&#39;">`myToast`</SwmToken>: A <SwmToken path="/js/toast.js" pos="6:9:11" line-data="  var myToast = new bootstrap.Toast(document.querySelector(&quot;.toast&quot;)); // Ignore error: undeclared variable &#39;bootstrap&#39;">`bootstrap.Toast`</SwmToken> instance for managing the toast notification.

   - Initializes a <SwmToken path="/js/toast.js" pos="6:9:11" line-data="  var myToast = new bootstrap.Toast(document.querySelector(&quot;.toast&quot;)); // Ignore error: undeclared variable &#39;bootstrap&#39;">`bootstrap.Toast`</SwmToken> instance with a specified toast element.

3. <SwmToken path="/js/toast.js" pos="9:3:3" line-data="  var toastShown = false;">`toastShown`</SwmToken>: A boolean variable to track whether the toast has been shown.

   - Initializes a variable to keep track of the toast's visibility state.

4. <SwmToken path="/js/toast.js" pos="12:3:5" line-data="  function checkScroll() {">`checkScroll()`</SwmToken>: Checks if the user has scrolled to the footer and shows the toast if they haven't already.

   - Calculates the position of the footer and the current scroll position.

   - Shows the toast if the user has scrolled to the footer and the toast has not been shown yet.

5. <SwmToken path="/js/toast.js" pos="27:3:5" line-data="  function playNotificationSound() {">`playNotificationSound()`</SwmToken>: Plays the notification sound.

   - Calls the `play` method on the <SwmToken path="/js/toast.js" pos="3:3:3" line-data="  var notificationSound = new Audio(&quot;../sounds/notifications-sound-toast-play.mp3&quot;);">`notificationSound`</SwmToken> object to play the sound.

6. **Event Listeners**:

   - <SwmToken path="/js/toast.js" pos="32:6:10" line-data="  // Add &#39;shown.bs.toast&#39; event listener to play sound once the toast is shown">`shown.bs.toast`</SwmToken> Event Listener: Plays the notification sound once the toast is shown.

   - **Scroll Event Listener**: Calls <SwmToken path="/js/toast.js" pos="12:3:5" line-data="  function checkScroll() {">`checkScroll()`</SwmToken> to check if the user has scrolled to the footer.

### General Notes:

- The <SwmToken path="/js/toast.js" pos="3:3:3" line-data="  var notificationSound = new Audio(&quot;../sounds/notifications-sound-toast-play.mp3&quot;);">`notificationSound`</SwmToken> and <SwmToken path="/js/toast.js" pos="6:3:3" line-data="  var myToast = new bootstrap.Toast(document.querySelector(&quot;.toast&quot;)); // Ignore error: undeclared variable &#39;bootstrap&#39;">`myToast`</SwmToken> objects are initialized at the start, setting up the audio and toast functionality.

- The <SwmToken path="/js/toast.js" pos="12:3:5" line-data="  function checkScroll() {">`checkScroll()`</SwmToken> function is used to determine when to show the toast based on the user's scroll position.

- The <SwmToken path="/js/toast.js" pos="27:3:5" line-data="  function playNotificationSound() {">`playNotificationSound()`</SwmToken> function plays a sound when the toast is shown, enhancing the user experience.

- Event listeners are set up to handle the showing of the toast and the playing of the notification sound, providing a dynamic and interactive user experience.

This file plays a crucial role in providing feedback to the user in a non-intrusive manner, enhancing the user experience by informing them about the outcome of actions or important system messages.

---

### <SwmPath>[js/contact.js](/js/contact.js)</SwmPath>

This JavaScript file is responsible for handling the contact form submission in your application. It includes functionality for validating the form inputs, displaying validation errors, and providing feedback to the user based on the submission result.

#### Key Functions:

1. <SwmToken path="/js/contact.js" pos="1:2:5" line-data="function validateEmail(email) {">`validateEmail(email)`</SwmToken>: Validates the email address format.

   - Uses a regular expression to check if the email address is in a valid format.

   - Returns `true` if the email address is valid, `false` otherwise.

2. <SwmToken path="/js/contact.js" pos="7:2:5" line-data="function validateFullname(fullname) {">`validateFullname(fullname)`</SwmToken>: Validates the full name format.

   - Uses a regular expression to check if the full name contains only letters and spaces.

   - Returns `true` if the full name is valid, `false` otherwise.

3. <SwmToken path="/js/contact.js" pos="13:2:5" line-data="function validateMessage(message) {">`validateMessage(message)`</SwmToken>: Validates the message length.

   - Checks if the message has at least 15 characters.

   - Returns `true` if the message is valid, `false` otherwise.

4. <SwmToken path="/js/contact.js" pos="17:2:4" line-data="function sendMessage() {">`sendMessage()`</SwmToken>: Handles the contact form submission.

   - Retrieves the values of the full name, email, and message fields.

   - Validates the inputs using the above validation functions.

   - Displays validation errors if any inputs are invalid.

   - If all inputs are valid, it hides the validation alert, shows a success modal, and clears the input fields.

5. <SwmToken path="/js/contact.js" pos="65:2:4" line-data="function clearFields() {">`clearFields()`</SwmToken>: Clears the contact form inputs and hides the validation alert.

   - Resets the form to its initial state, clearing all input fields.

   - Hides the validation alert.

### General Notes:

- The validation functions ensure that the user has filled in all required fields in the correct format before submitting the form.

- The <SwmToken path="/js/contact.js" pos="17:2:4" line-data="function sendMessage() {">`sendMessage()`</SwmToken> function handles the actual submission of the form data, providing feedback to the user based on the validation result.

- The <SwmToken path="/js/contact.js" pos="65:2:4" line-data="function clearFields() {">`clearFields()`</SwmToken> function is used to reset the form after a successful submission, making the form submission process more interactive and user-friendly.

This file plays a crucial role in the functionality of application's contact form, ensuring that user inquiries are handled efficiently and that users receive clear feedback on their form submissions.

---

### <SwmPath>[js/search.js](/js/search.js)</SwmPath>

This JavaScript file is responsible for implementing the search functionality within your application. It includes features for searching through a list of items, such as products or users, and displaying the search results.

### General Notes:

- The <SwmPath>[js/search.js](/js/search.js)</SwmPath> file provides a fully functional search feature, including debouncing to improve performance and highlighting search terms in the results.

---

### <SwmPath>[js/disabledSearch.js](/js/disabledSearch.js)</SwmPath>

This JavaScript file appears to be a version of the search functionality that is disabled or not fully implemented. It might be a placeholder or a version of the search functionality that is intended to be replaced or extended in the future.

### General Notes:

- The <SwmPath>[js/disabledSearch.js](/js/disabledSearch.js)</SwmPath> file appears to be a placeholder or a version of the search functionality that is not currently active. It might be intended for future development or as a fallback in case the main search functionality is temporarily disabled.

> Both files demonstrate the importance of clear and modular code structure, allowing for easy replacement or extension of functionality as needed.

---

The `lazysizes.min.js` file is a minified version of the `lazysizes` library, which is used for lazy loading images and iframes on web pages. Lazy loading defers the loading of non-critical resources until they are needed, improving page load times and reducing bandwidth usage.

### Key Features:

- **Image and Iframe Lazy Loading**: Automatically loads images and iframes as they enter the viewport.

- **Responsive Images**: Supports responsive images using the `srcset` attribute.

- **Placeholders**: Displays placeholders while images are loading.

- **Customizable**: Offers various configuration options.

- **Performance Optimizations**: Includes optimizations for performance.

- **Fallback Support**: Provides a fallback for browsers without Intersection Observer support.

### How It Works:

- **Initialization**: Scans the DOM for elements with `data-src` or `data-srcset` attributes and sets them up for lazy loading.

- **Loading**: Uses the Intersection Observer API to load images and iframes when they are about to enter the viewport.

### Usage:

Include the script in your HTML document and use `data-src` or `data-srcset` attributes for your images and iframes. `lazysizes` will handle the lazy loading.

```html
<script src="path/to/lazysizes.min.js" async></script>

<img data-src="image.jpg" alt="An image">
<iframe data-src="https://www.example.com" title="An iframe"></iframe>
```

In summary, `lazysizes.min.js` improves web page performance by deferring the loading of images and iframes until they are needed.

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBcGl4ZWwtc3RvcmUlM0ElM0FNYXh3ZWxsOTk5Yg==" repo-name="pixel-store"><sup>Powered by [Swimm](https://app.swimm.io/)</sup></SwmMeta>
