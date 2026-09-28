document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
    
    const isLoggedIn = localStorage.getItem("shopeasy_logged_in") === "true";
    const userName = localStorage.getItem("shopeasy_user_name") || "Guest";

    // Update Navbar elements dynamically
    const navbarUserName = document.getElementById("navbarUserName");
    if (navbarUserName) {
        navbarUserName.textContent = isLoggedIn ? `Hi, ${userName}` : "Hi, Guest";
    }

    // Update Avatar Initial Text Safely
    const userAvatarText = document.getElementById("userAvatarText");
    if (userAvatarText) {
        userAvatarText.textContent = isLoggedIn ? userName.charAt(0).toUpperCase() : "G";
    }

    const authDropdownLink = document.getElementById("authDropdownLink");
    if (authDropdownLink) {
        if (isLoggedIn) {
            authDropdownLink.innerHTML = `<i class="fa-solid fa-right-from-bracket"></i> Logout`;
            authDropdownLink.href = "#";
            authDropdownLink.onclick = (e) => {
                e.preventDefault();
                logoutUser();
            };
        } else {
            authDropdownLink.innerHTML = `<i class="fa-solid fa-right-to-bracket"></i> Login`;
            authDropdownLink.href = "login.html";
        }
    }
    // Handle Dedicated Forgot Password Form Submission
    const forgotForm = document.getElementById("forgotForm");
    if (forgotForm) {
        forgotForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const email = document.getElementById("resetEmail").value.trim().toLowerCase();
            const newPassword = document.getElementById("newPassword").value;

            let users = JSON.parse(localStorage.getItem("shopeasy_users_db")) || [];
            const userIndex = users.findIndex(u => u.email === email);

            if (userIndex === -1) {
                // Fallback check for single legacy user
                const regEmail = localStorage.getItem("shopeasy_registered_email");
                if (regEmail && regEmail.toLowerCase() === email) {
                    localStorage.setItem("shopeasy_registered_password", newPassword);
                    alert("Password updated successfully! Please log in with your new password.");
                    window.location.href = "login.html";
                    return;
                }

                alert("No account found with this email address. Please check and try again.");
                return;
            }

            // Update user password in array database
            users[userIndex].password = newPassword;
            localStorage.setItem("shopeasy_users_db", JSON.stringify(users));

            // Also update legacy key if it matches
            if (localStorage.getItem("shopeasy_registered_email") === email) {
                localStorage.setItem("shopeasy_registered_password", newPassword);
            }

            alert("Password updated successfully! Please log in with your new password.");
            window.location.href = "login.html";
        });
    }

    // Handle Signup Submit (Supports multiple accounts safely using an array)
    if (signupForm) {
        signupForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const name = document.getElementById("signupName").value.trim();
            const email = document.getElementById("signupEmail").value.trim().toLowerCase();
            const password = document.getElementById("signupPassword").value;
            
            let users = JSON.parse(localStorage.getItem("shopeasy_users_db")) || [];

            // Check if email already exists
            const existingUser = users.find(u => u.email === email);
            if (existingUser) {
                alert("An account with this email already exists! Please log in.");
                window.location.href = "login.html";
                return;
            }

            // Push new user to array
            users.push({ name, email, password });
            localStorage.setItem("shopeasy_users_db", JSON.stringify(users));

            // Also maintain single keys for backwards compatibility
            localStorage.setItem("shopeasy_registered_name", name);
            localStorage.setItem("shopeasy_registered_email", email);
            localStorage.setItem("shopeasy_registered_password", password);

            alert("Account created successfully! Please log in with your credentials.");
            window.location.href = "login.html";
        });
    }

    // Handle Login Submit (Checks database array or fallback single keys)
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const email = document.getElementById("loginEmail").value.trim().toLowerCase();
            const password = document.getElementById("loginPassword").value;

            let users = JSON.parse(localStorage.getItem("shopeasy_users_db")) || [];
            
            // Find user in database array
            let validUser = users.find(u => u.email === email && u.password === password);

            // Fallback check for single account keys if array lookup misses
            if (!validUser) {
                const regEmail = localStorage.getItem("shopeasy_registered_email");
                const regPass = localStorage.getItem("shopeasy_registered_password");
                if (regEmail && regEmail.toLowerCase() === email && regPass === password) {
                    validUser = {
                        name: localStorage.getItem("shopeasy_registered_name") || email.split('@')[0],
                        email: regEmail
                    };
                }
            }

            if (!validUser) {
                alert("Access Denied! Incorrect email or password, or no account found. Please sign up first.");
                window.location.href = "signup.html";
                return;
            }

            // Proceed with login if credentials match
            localStorage.setItem("shopeasy_logged_in", "true");
            localStorage.setItem("shopeasy_user_name", validUser.name);
            localStorage.setItem("shopeasy_user_email", validUser.email);

            alert("Logged in successfully! You can now make purchases.");
            window.location.href = "index.html";
        });
    }

    // Handle Forgot Password functionality
    const forgotPasswordLink = document.getElementById("forgotPasswordLink");
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener("click", (e) => {
            e.preventDefault();
            const recoveryEmail = prompt("Enter your registered email address:");
            if (!recoveryEmail) return;

            let users = JSON.parse(localStorage.getItem("shopeasy_users_db")) || [];
            const userIndex = users.findIndex(u => u.email === recoveryEmail.trim().toLowerCase());

            if (userIndex === -1) {
                // Fallback check for single legacy user
                const regEmail = localStorage.getItem("shopeasy_registered_email");
                if (regEmail && regEmail.toLowerCase() === recoveryEmail.trim().toLowerCase()) {
                    const newPassword = prompt("Email verified! Enter your new password:");
                    if (newPassword) {
                        localStorage.setItem("shopeasy_registered_password", newPassword);
                        alert("Password updated successfully! You can now log in with your new password.");
                    }
                    return;
                }

                alert("No account found with this email address.");
                return;
            }

            // Prompt for new password if found in array
            const newPassword = prompt("Account found! Enter your new password:");
            if (newPassword) {
                users[userIndex].password = newPassword;
                localStorage.setItem("shopeasy_users_db", JSON.stringify(users));

                // Also update legacy key if it matches
                if (localStorage.getItem("shopeasy_registered_email") === recoveryEmail.trim().toLowerCase()) {
                    localStorage.setItem("shopeasy_registered_password", newPassword);
                }

                alert("Password updated successfully! You can now log in with your new password.");
            }
        });
    }
});

// Global Logout Function (Only clears session state, keeps registered accounts safe)
function logoutUser() {
    localStorage.removeItem("shopeasy_logged_in");
    localStorage.removeItem("shopeasy_user_name");
    localStorage.removeItem("shopeasy_user_email");
    alert("You have been logged out.");
    window.location.href = "login.html";
}