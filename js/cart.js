document.addEventListener("DOMContentLoaded", () => {
    const isLoggedIn = localStorage.getItem("shopeasy_logged_in") === "true";

    // Handle Adding Products to Cart from Store or Detail Page
    const buyButtons = document.querySelectorAll(".add-to-cart-btn");
    buyButtons.forEach(button => {
        button.addEventListener("click", (e) => {
            e.stopPropagation();

            if (!isLoggedIn) {
                alert("Access Denied! You must log in to buy products or add items to your cart.");
                window.location.href = "login.html";
                return;
            }

            let title, price, img;
            const detailTitle = document.getElementById("detailTitle");
            
            if (detailTitle && button.id === "detailAddToCartBtn") {
                title = detailTitle.textContent;
                price = document.getElementById("detailPrice").textContent;
                img = document.getElementById("detailImg").src;
            } else {
                const card = button.closest(".product-card");
                if (card) {
                    title = card.getAttribute("data-title");
                    price = card.querySelector(".product-price").textContent;
                    img = card.querySelector(".product-img").src;
                }
            }

            if (title && price) {
                let userCart = JSON.parse(localStorage.getItem("shopeasy_user_cart")) || [];
                
                // Check if product already exists in cart to increase quantity
                const existingIndex = userCart.findIndex(item => item.title === title);
                if (existingIndex > -1) {
                    userCart[existingIndex].quantity = (userCart[existingIndex].quantity || 1) + 1;
                } else {
                    userCart.push({ title, price, img: img || "", quantity: 1 });
                }

                localStorage.setItem("shopeasy_user_cart", JSON.stringify(userCart));
                alert("Product added to cart successfully!");
            }
        });
    });

    // Render Cart Items & Handle Quantity / Removal Controls
    const cartContainer = document.getElementById("cartItemsContainer");
    if (cartContainer) {
        renderCart();
    }

    function renderCart() {
        if (!isLoggedIn) {
            cartContainer.innerHTML = `<p style="color: #ef4444; font-weight: 500;">Please log in to view your cart items and complete checkout.</p>`;
            return;
        }

        let userCart = JSON.parse(localStorage.getItem("shopeasy_user_cart")) || [];
        
        if (userCart.length === 0) {
            cartContainer.innerHTML = `<p style="color: #64748b; font-weight: 500;">Your cart is currently empty. Explore products and add items to your cart!</p>`;
            return;
        }

        let cartHtml = "";
        let grandTotal = 0;

        userCart.forEach((item, index) => {
            let numericPrice = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
            let itemTotal = numericPrice * (item.quantity || 1);
            grandTotal += itemTotal;

            cartHtml += `
                <div style="display:flex; justify-content:space-between; align-items:center; background:white; padding:15px; border-radius:8px; border:1px solid #e2e8f0; margin-bottom: 12px; flex-wrap: wrap; gap: 15px;">
                    <div style="display: flex; align-items: center; gap: 15px;">
                        <img src="${item.img || 'https://via.placeholder.com/60'}" alt="${item.title}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 6px; border: 1px solid #e2e8f0;">
                        <div>
                            <h4 style="margin: 0; color: #0f172a; font-size: 1rem;">${item.title}</h4>
                            <p style="color:#64748b; font-size:0.9rem; margin: 4px 0 0 0;">Unit Price: ${item.price}</p>
                        </div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 12px;">
                        <div style="display: flex; align-items: center; border: 1px solid #cbd5e1; border-radius: 6px; overflow: hidden;">
                            <button onclick="updateQuantity(${index}, -1)" style="background: #f1f5f9; border: none; padding: 6px 12px; cursor: pointer; font-weight: bold;">-</button>
                            <span style="padding: 0 12px; font-weight: 600;">${item.quantity || 1}</span>
                            <button onclick="updateQuantity(${index}, 1)" style="background: #f1f5f9; border: none; padding: 6px 12px; cursor: pointer; font-weight: bold;">+</button>
                        </div>
                        <button onclick="removeItem(${index})" style="background: #fee2e2; color: #ef4444; border: none; padding: 8px 12px; border-radius: 6px; cursor: pointer;" title="Remove Item">
                            <i class="fa-solid fa-trash"></i>
                        </button>
                    </div>
                </div>
            `;
        });

        cartHtml += `
            <div style="background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; text-align: right; margin-top: 15px;">
                <h3 style="margin: 0; color: #0f172a;">Grand Total: $${grandTotal.toFixed(2)}</h3>
            </div>
        `;

        cartContainer.innerHTML = cartHtml;
    }

    // Process payment and validate delivery information on checkout
    const checkoutBtn = document.getElementById("checkoutBtn");
    if (checkoutBtn) {
        checkoutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            if (!isLoggedIn) {
                alert("You must be logged in to process a payment!");
                window.location.href = "login.html";
                return;
            }

            let userCart = JSON.parse(localStorage.getItem("shopeasy_user_cart")) || [];
            if (userCart.length === 0) {
                alert("Your cart is empty! Add items before checking out.");
                return;
            }

            // Gather shipping form values
            const name = document.getElementById("shippingName").value.trim();
            const phone = document.getElementById("shippingPhone").value.trim();
            const address = document.getElementById("shippingAddress").value.trim();
            const city = document.getElementById("shippingCity").value.trim();
            const pin = document.getElementById("shippingPin").value.trim();
            const paymentMethod = document.getElementById("paymentMethodSelect").value;

            // Validate that all shipping fields are filled out
            if (!name || !phone || !address || !city || !pin) {
                alert("Please fill in all shipping and contact details (Name, Phone, Address, City, and PIN code).");
                return;
            }

            if (!paymentMethod) {
                alert("Please select a payment method before proceeding.");
                return;
            }

            // Validate dynamic payment fields based on selection
            if (paymentMethod === "credit-card" || paymentMethod === "paypal") {
                const cardNum = document.getElementById("cardNumber")?.value.trim();
                const cardExp = document.getElementById("cardExpiry")?.value.trim();
                const cardCvv = document.getElementById("cardCvv")?.value.trim();
                if (!cardNum || !cardExp || !cardCvv) {
                    alert("Please fill in all required card details.");
                    return;
                }
            } else if (paymentMethod === "upi") {
                const upiId = document.getElementById("upiId")?.value.trim();
                const netBank = document.getElementById("netBankingBank")?.value;
                if (!upiId && !netBank) {
                    alert("Please provide a UPI ID or select a Net Banking bank.");
                    return;
                }
            }

            // Clear cart on successful order
            localStorage.removeItem("shopeasy_user_cart");

            alert(`Thank you, ${name}! Your order has been placed successfully and will be shipped to ${address}, ${city} - ${pin}. Payment Mode: ${paymentMethod.toUpperCase()}`);
            window.location.href = "index.html";
        });
    }
});

// Dynamic payment fields toggle implementation
function togglePaymentFields() {
    const paymentMethod = document.getElementById("paymentMethodSelect").value;
    const container = document.getElementById("dynamicPaymentDetails");
    
    if (!container) return;
    
    if (paymentMethod === "credit-card" || paymentMethod === "paypal") {
        container.innerHTML = `
            <div style="background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; margin-top: 10px;">
                <h4 style="font-size: 0.9rem; margin-bottom: 10px; color: #334155;">Enter Card Details</h4>
                <div style="margin-bottom: 10px;">
                    <input type="text" id="cardNumber" placeholder="Card Number (16 digits)" maxlength="16" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px;" required>
                </div>
                <div style="display: flex; gap: 10px;">
                    <input type="text" id="cardExpiry" placeholder="MM/YY" maxlength="5" style="flex: 1; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px;" required>
                    <input type="password" id="cardCvv" placeholder="CVV" maxlength="3" style="flex: 1; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px;" required>
                </div>
            </div>
        `;
    } else if (paymentMethod === "upi") {
        container.innerHTML = `
            <div style="background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; margin-top: 10px;">
                <h4 style="font-size: 0.9rem; margin-bottom: 10px; color: #334155;">UPI / Net Banking Details</h4>
                <div style="margin-bottom: 10px;">
                    <input type="text" id="upiId" placeholder="Enter UPI ID (e.g. username@okhdfcbank)" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px;">
                </div>
                <div>
                    <select id="netBankingBank" style="width: 100%; padding: 10px; border: 1px solid #cbd5e1; border-radius: 6px;">
                        <option value="" disabled selected>Or Select Net Banking Bank</option>
                        <option value="sbi">State Bank of India</option>
                        <option value="hdfc">HDFC Bank</option>
                        <option value="icici">ICICI Bank</option>
                        <option value="axis">Axis Bank</option>
                    </select>
                </div>
            </div>
        `;
    } else {
        container.innerHTML = "";
    }
}

function updateQuantity(index, change) {
    let userCart = JSON.parse(localStorage.getItem("shopeasy_user_cart")) || [];
    if (userCart[index]) {
        userCart[index].quantity = (userCart[index].quantity || 1) + change;
        if (userCart[index].quantity <= 0) {
            userCart.splice(index, 1);
        }
        localStorage.setItem("shopeasy_user_cart", JSON.stringify(userCart));
        location.reload();
    }
}

function removeItem(index) {
    let userCart = JSON.parse(localStorage.getItem("shopeasy_user_cart")) || [];
    if (userCart[index]) {
        userCart.splice(index, 1);
        localStorage.setItem("shopeasy_user_cart", JSON.stringify(userCart));
        location.reload();
    }
}