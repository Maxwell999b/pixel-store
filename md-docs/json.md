# Pixel Store Product Catalog Documentation

## Overview :

The [/json/product.json](/json/product.json) file is a JSON file that contains an array of product objects. Each product object represents a product available in the Pixel Store, including details such as the product's name, category, price, image source, and a unique code. This file is used to dynamically generate product listings on the website, allowing for easy updates and additions to the product catalog without needing to manually update the HTML.

## Structure of a Product Object :

Each product object in the `product.json` file has the following structure:

```json
{
  "name": "Product Name",
  "category": "Product Category",
  "price": "Product Price",
  "imgSrc": "Relative Path to Product Image",
  "Code": "Unique Product Code"
}
```

- **name**: The name of the product.

- **category**: The category to which the product belongs (e.g., "Hoodie", "Pants", "Backpack", etc.).

- **price**: The price of the product, formatted as a string with the currency (e.g., "215 EGP").

- **imgSrc**: The relative path to the image file for the product.

- **Code**: A unique code for the product, likely used for inventory management or as a reference in the backend.

## Adding More Products :

To add more products to the [/json/product.json](/json/product.json) file, follow these steps:

1. **Open the** [/json/product.json](/json/product.json) File: Locate the [/json/product.json](/json/product.json) file in your project directory.

2. **Add a New Product Object**: At the end of the array (before the closing square bracket `]`), add a new product object following the structure outlined above. Make sure to separate it from the previous object with a comma `,`.

Example of adding a new product:

```json
{
  "name": "New Product Name",
  "category": "New Product Category",
  "price": "New Product Price",
  "imgSrc": "../path/to/new/product/image.png",
  "Code": "New Unique Product Code"
}
```

3. **Save the File**: After adding the new product object, save the [/json/product.json](/json/product.json) file. The new product should now be included in the product catalog and will be dynamically generated on the website.

## Note :

- Ensure that the image source (`imgSrc`) for each product points to the correct location of the product image within your project directory.

- The unique code (`Code`) for each product should be unique to avoid conflicts.

By following these steps, you can easily add more items to the product catalog in the [/json/product.json](/json/product.json) file, ensuring that the Pixel Store website remains up-to-date with the latest products.

[← GO BACK](../README.md)
