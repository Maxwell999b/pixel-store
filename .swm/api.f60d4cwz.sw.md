---
title: API
---
<SwmSnippet path="/js/disabledSearch.js" line="1">

---

This code snippet gets the `searchButton` element by its id and then disables it by setting the `disabled` property to `true`.

```javascript
// Get the search button element
var searchButton = document.getElementById("toggleButton");

// Disable the search button
searchButton.disabled = true;

```

---

</SwmSnippet>

<SwmSnippet path="/js/search.js" line="1">

---

This code snippet adds an event listener to the element with the id `toggleButton`. When the button is clicked, it toggles the visibility of an element with the class `search-click` by adding or removing the class `visually-hidden`.

```javascript
document.getElementById("toggleButton").addEventListener("click", function () {
  var searchInput = document.querySelector(".search-click");
  searchInput.classList.toggle("visually-hidden");
});
```

---

</SwmSnippet>

<SwmSnippet path="/html/About-us.html" line="58">

---

This code snippet represents a search form with a search input field and a search button. The input field allows users to type in their search query, while the search button triggers the search functionality when clicked.

```html
        <form class="d-flex" role="search">
          <input class="form-control me-2 search-click visually-hidden" type="search"
            placeholder="Type your search here..." aria-label="Search" id="searchInput">
          <button class="btn btn-outline-dark search-btn" type="button" id="toggleButton"><i
              class="fa-solid fa-magnifying-glass"></i>Search</button>
        </form>
```

---

</SwmSnippet>

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBcGl4ZWwtc3RvcmUlM0ElM0FNYXh3ZWxsOTk5Yg==" repo-name="pixel-store"><sup>Powered by [Swimm](https://app.swimm.io/)</sup></SwmMeta>
