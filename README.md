# ShopEasy — Online Store

**ShopEasy** is a responsive front-end e-commerce website built to demonstrate the main shopping journey: browsing products, searching and filtering the catalog, viewing product information, creating an account, signing in, managing a profile, and using a shopping cart.

- **Live demo:** https://shopeasy-onlinestore.netlify.app
- **GitHub repository:** https://github.com/Jaswanth-36/shopeasy-online-store
- **Developer:** Jaswanth Neerukattu

> **Project scope:** This is a learning/demo storefront. Product names and displayed prices are sample catalog data; they are not a live inventory or price feed. No real payment processing is claimed.

## Project screenshots and outputs

The project output archive contains 10 screenshots showing the UI flow. Once the PNG files are committed under `outputs/`, these embeds will display in the README:

| Screen | Screenshot |
|---|---|
| Store landing page | [start.png](outputs/start.png) |
| Signed-out home page | [without login home page.png](outputs/without%20login%20home%20page.png) |
| Product catalog | [products.png](outputs/products.png) |
| Signup | [Signup.png](outputs/Signup.png) |
| Login/profile view | [loginprofile.png](outputs/loginprofile.png) |
| Profile | [profile.png](outputs/profile.png) |
| Password recovery | [forgot details update.png](outputs/forgot%20details%20update.png) |
| Cart while signed out | [withoutlogin cart.png](outputs/withoutlogin%20cart.png) |
| Order view | [order.png](outputs/order.png) |
| Product/order view | [ordersproduct.png](outputs/ordersproduct.png) |

> **Screenshot upload status:** The screenshot ZIP was inspected and the filenames above were confirmed. The image binaries are not yet present in the repository, so these links will become active after the PNG files are uploaded to `outputs/`.

## Overview

ShopEasy presents a typical online-store interface. Visitors can explore the catalog without signing in. Account-related pages provide signup, login, forgot-password, and profile experiences. Product detail and cart pages support the purchase flow demonstration.

The project focuses on the client-side experience and page navigation. The README does not assume a server-side database, payment gateway, or live product API unless one is added and configured separately.

## Features
- Store landing page with product cards and category navigation.
- Product search and category filtering.
- Product details page.
- Add-to-cart interaction and cart page.
- Signup and login interfaces.
- Forgot-password page/interface.
- Profile page.
- Cart count display in the store navigation.
- Product image assets.
- Responsive web layout for common screen sizes.
- Deployed demo on Netlify.

## Technology
- **HTML5** — page structure and semantic content.
- **CSS3** — layout, styling, and responsive presentation.
- **JavaScript** — catalog filtering, search, cart interactions, and client-side page behavior.
- **Browser storage** — client-side persistence where implemented.
- **Netlify** — published demo hosting.
- **Git/GitHub** — source control and project documentation.

## Project structure
```text
shopeasy-online-store/
├── index.html
├── index.css
├── auth.js
├── cart.html
├── cart.js
├── product-detail.html
├── profile.html
├── login.html
├── login.css
├── signup.html
├── signup.css
├── forgot-password.html
├── forgot-password.css
├── pichtml/
├── outputs/                   # UI screenshots listed above
├── docs/
│   └── PROJECT_STRUCTURE.md
└── README.md
```

## How the application works

### Storefront and product browsing
The landing page displays product cards and navigation. Search and category controls help users locate items. Selecting a product opens its detail page when that route is wired in the project.

### Authentication and account pages
The account UI includes signup, login, forgot-password, and profile pages. Client-side checks improve the form experience, but **front-end-only authentication is not secure production authentication**. A real store should verify credentials on a backend, hash passwords server-side, manage sessions securely, and implement verified password reset.

### Cart flow
The cart interaction records selected products and updates the cart count. The cart page presents selected items for review. A production cart should validate product IDs, prices, quantities, and stock on a server.

## Run locally
1. Download or clone this repository.
2. Open the project folder in VS Code.
3. Open `index.html` in a browser, or use the VS Code Live Server extension.
4. Test catalog search, category filters, product pages, signup/login forms, profile, and cart.
5. Keep related CSS, JavaScript, and image paths unchanged unless you also update the references in the HTML.

No package installation is required for a plain static HTML/CSS/JavaScript version.

## Deployment
The public demo is available at [ShopEasy Online Store](https://shopeasy-onlinestore.netlify.app).

## Limitations and future improvements
- Connect authentication to a secure backend or authentication provider.
- Use a database for users, products, and orders.
- Integrate a live product/stock/price API if real-time catalog data is required.
- Add server-validated checkout and a payment provider before accepting payments.
- Add form validation, accessibility checks, and automated browser tests.

## Author
**Jaswanth Neerukattu**  
GitHub: [Jaswanth-36](https://github.com/Jaswanth-36)  
Live project: [ShopEasy Online Store](https://shopeasy-onlinestore.netlify.app)
