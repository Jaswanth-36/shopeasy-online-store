# ShopEasy Online Store — Project Structure

This document describes the source files included in the uploaded `E-Commerce.zip`.

## Source files

```text
E-Commerce/
├── index.html
├── index.css
├── auth.js
├── login.html
├── login.css
├── signup.html
├── signup.css
├── forgot-password.html
├── forgot-password.css
├── cart.html
├── cart.js
├── product-detail.html
└── profile.html
```

## Main pages and responsibilities

- **index.html** — Main storefront and product browsing interface.
- **index.css** — Main storefront layout and styling.
- **auth.js** — Shared authentication-related JavaScript logic.
- **login.html / login.css** — Login page and its styles.
- **signup.html / signup.css** — Account registration page and styles.
- **forgot-password.html / forgot-password.css** — Password recovery interface.
- **cart.html / cart.js** — Shopping cart page and cart interactions.
- **product-detail.html** — Product detail view.
- **profile.html** — User profile page.

## How the pages fit together

The storefront provides the entry point for browsing products. Users can open product details and add products to the cart. Login and signup pages provide account access, while the profile page is intended for account-related information. The password recovery page provides the reset flow interface.

## Run locally

1. Extract the project archive.
2. Open the extracted `E-Commerce` folder.
3. Open `index.html` in a browser, or use the VS Code Live Server extension.
4. Test the storefront, product detail, cart, and account pages.

## Notes and limitations

- This document reflects the file list in the supplied archive; it does not claim that the project uses a backend server or database.
- The archive contains the listed HTML, CSS, and JavaScript files. Product image assets and screenshots are not included in this source archive.
- Authentication behavior and data persistence should be reviewed in `auth.js` and the related page scripts before describing security guarantees.
- Product prices and availability should not be described as live inventory unless the implementation connects to a live product service.

