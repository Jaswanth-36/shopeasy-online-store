\# ShopEasy Online Store — Project Structure



This document describes the structure and purpose of the source files included in the \*\*ShopEasy Online Store\*\* project.



\## 📁 Project Structure



```text

shopeasy-online-store/

│

├── README.md

├── index.html

├── login.html

├── signup.html

├── forgot-password.html

├── cart.html

├── product-detail.html

├── profile.html

│

├── css/

│   ├── index.css

│   ├── login.css

│   ├── signup.css

│   └── forgot-password.css

│

├── js/

│   ├── auth.js

│   └── cart.js

│

├── outputs/

│   ├── start.png

│   ├── products.png

│   ├── Signup.png

│   ├── loginprofile.png

│   ├── withoutlogin cart.png

│   ├── profile.png

│   ├── order.png

│   ├── ordersproduct.png

│   ├── forgot details update.png

│   └── without login home page.png

│

└── docs/

&#x20;   └── PROJECT-STRUCTURE.md

```



\## 🌐 Main Pages



| File                   | Responsibility                                          |

| ---------------------- | ------------------------------------------------------- |

| `index.html`           | Main ShopEasy storefront and product browsing interface |

| `product-detail.html`  | Product detail view                                     |

| `cart.html`            | Shopping cart interface                                 |

| `login.html`           | User login interface                                    |

| `signup.html`          | User registration interface                             |

| `forgot-password.html` | Password recovery/reset interface                       |

| `profile.html`         | User profile interface                                  |



\## 🎨 CSS Directory



The `css/` directory contains page-specific stylesheets.



| File                  | Responsibility                     |

| --------------------- | ---------------------------------- |

| `index.css`           | Main storefront layout and styling |

| `login.css`           | Login page styling                 |

| `signup.css`          | Registration page styling          |

| `forgot-password.css` | Password recovery page styling     |



\## ⚙️ JavaScript Directory



The `js/` directory contains the main client-side functionality.



| File      | Responsibility                                                     |

| --------- | ------------------------------------------------------------------ |

| `auth.js` | Authentication, user account and browser-side authentication logic |

| `cart.js` | Shopping-cart functionality and cart interactions                  |



\## 🖼️ Outputs Directory



The `outputs/` directory contains screenshots used for project documentation and the GitHub README.



The screenshots demonstrate the home page, products, sign-up, login, cart, profile, orders, password recovery and other application views.



\## 📚 Documentation Directory



The `docs/` directory contains supporting technical documentation.



\### `PROJECT-STRUCTURE.md`



This document explains the organization and purpose of the project's source files and directories.



The root-level `README.md` remains the main project documentation and contains the project overview, features, screenshots, live demo and setup instructions.



\## 🔄 Application Flow



```text

&#x20;                   ShopEasy

&#x20;                      │

&#x20;               ┌──────┴──────┐

&#x20;               │             │

&#x20;            Products      Account

&#x20;               │             │

&#x20;       Product Details   Login / Signup

&#x20;               │             │

&#x20;               └──────┬──────┘

&#x20;                      │

&#x20;                 Add to Cart

&#x20;                      │

&#x20;                      ▼

&#x20;                   Cart

&#x20;                      │

&#x20;             Update / Remove

&#x20;                      │

&#x20;                      ▼

&#x20;                User Profile

```



\## 💾 Data Persistence



The project uses browser-side storage for demonstration functionality.



JavaScript and browser `localStorage` are used for relevant user/account and shopping-cart state.



This is suitable for a front-end portfolio/demo application but should not be considered production-grade data storage or authentication.



\## 🔐 Authentication



ShopEasy includes a front-end authentication flow consisting of:



1\. User registration

2\. Login

3\. Authentication state

4\. Profile access

5\. Logout

6\. Forgot-password/reset interface



\### Security Limitation



This project is intended as a \*\*front-end portfolio/demo application\*\*.



A production e-commerce application should use secure server-side authentication, password hashing, protected APIs, database storage, secure sessions/tokens, HTTPS and proper authorization controls.



\## 🛒 Shopping Cart



The cart functionality allows users to:



\* Add products

\* View selected products

\* Update quantities

\* Remove products

\* Maintain cart state through browser storage



Main files:



```text

js/cart.js

cart.html

```



\## 🚀 Deployment



\*\*Live Website:\*\*

https://shopeasy-onlinestore.netlify.app/



\*\*GitHub Repository:\*\*

https://github.com/Jaswanth-36/shopeasy-online-store



\## 💻 Running the Project Locally



\### Option 1 — Browser



Open `index.html` directly in a modern web browser.



\### Option 2 — Visual Studio Code



1\. Open the project in Visual Studio Code.

2\. Install the \*\*Live Server\*\* extension.

3\. Open `index.html`.

4\. Select \*\*Open with Live Server\*\*.



\## 📝 Project Notes



\* This is a front-end e-commerce portfolio project.

\* The application is publicly deployed through Netlify.

\* Browser `localStorage` is used for client-side persistence.

\* The project does not currently represent a production backend or database.

\* The `outputs/` directory contains screenshots used in the GitHub README.

\* The root `README.md` provides the primary project documentation.

\* This `docs/PROJECT-STRUCTURE.md` file provides additional technical documentation about the project organization.



\## 🎯 Project Purpose



ShopEasy demonstrates practical skills in HTML5, CSS3, JavaScript, DOM manipulation, LocalStorage, front-end authentication flows, shopping-cart functionality, responsive web design, Git/GitHub, Netlify deployment and technical documentation.



