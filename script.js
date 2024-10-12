// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartIcon = document.querySelector('.cart-icon');
const cartCount = document.querySelector('.cart-count');
const modal = document.getElementById('cart-modal');
const closeBtn = document.querySelector('.close');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');

// Update cart count
function updateCartCount() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
}

// Update cart modal
function updateCartModal() {
    if (cartItems && cartTotal) {
        cartItems.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('cart-item');
            itemElement.innerHTML = `
                <span>${item.name} x${item.quantity}</span>
                <span>UGX ${(item.price * item.quantity).toLocaleString()}</span>
                <button class="remove-item" data-id="${item.id}">Remove</button>
            `;
            cartItems.appendChild(itemElement);
            total += item.price * item.quantity;
        });

        cartTotal.textContent = `Total: UGX ${total.toLocaleString()}`;
    }
}

// Add item to cart
function addToCart(id, name, price) {
    const existingItem = cart.find(item => item.id === id);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ id, name, price, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    updateCartModal();
}

// Remove item from cart
function removeFromCart(id) {
    const index = cart.findIndex(item => item.id === id);
    if (index !== -1) {
        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
        } else {
            cart.splice(index, 1);
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        updateCartModal();
    }
}

// Add to cart button click event
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('add-to-cart')) {
        const id = e.target.dataset.id;
        const name = e.target.dataset.name;
        const price = parseInt(e.target.dataset.price);
        addToCart(id, name, price);
    }
});

// Remove from cart button click event
if (cartItems) {
    cartItems.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-item')) {
            const id = e.target.dataset.id;
            removeFromCart(id);
        }
    });
}

// Open cart modal
if (cartIcon) {
    cartIcon.addEventListener('click', () => {
        modal.style.display = 'block';
        updateCartModal();
    });
}

// Close cart modal
if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Checkout button click event
if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty. Add some items before checking out.');
        } else {
            window.location.href = 'checkout.html';
        }
    });
}

// Initialize cart count
updateCartCount();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Newsletter form submission
const newsletterForm = document.getElementById('newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        alert(`Thank you for subscribing with email: ${email}`);
        this.reset();
    });
}

// Contact form submission
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = this.querySelector('#name').value;
        const email = this.querySelector('#email').value;
        const message = this.querySelector('#message').value;
        alert(`Thank you for your message, ${name}! We will get back to you at ${email} as soon as possible.`);
        this.reset();
    });
}

// Product details page
const addToCartBtn = document.getElementById('add-to-cart-btn');
if (addToCartBtn) {
    addToCartBtn.addEventListener('click', function() {
        const id = this.dataset.id;
        const name = this.dataset.name;
        const price = parseInt(this.dataset.price);
        const size = document.getElementById('size').value;
        addToCart(id, `${name} (${size.toUpperCase()})`, price);
    });
}

// Checkout page functionality
const checkoutItems = document.getElementById('checkout-items');
const checkoutTotal = document.getElementById('checkout-total');
const checkoutForm = document.getElementById('checkout-form');

function updateCheckoutSummary() {
    if (checkoutItems && checkoutTotal) {
        checkoutItems.innerHTML = '';
        let total = 0;

        cart.forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.classList.add('checkout-item');
            itemElement.innerHTML = `
                <span>${item.name} x${item.quantity}</span>
                <span>UGX ${(item.price * item.quantity).toLocaleString()}</span>
            `;
            checkoutItems.appendChild(itemElement);
            total += item.price * item.quantity;
        });

        checkoutTotal.textContent = `Total: UGX ${total.toLocaleString()}`;
    }
}

if (checkoutForm) {
    checkoutForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Here you would typically send the order data to a server
        // For this example, we'll just show an alert and clear the cart
        alert('Thank you for your order! Your payment has been processed.');
        cart = [];
        localStorage.removeItem('cart');
        updateCartCount();
        updateCheckoutSummary();
        this.reset();
    });

    // Initialize checkout summary
    updateCheckoutSummary();
}

// Initialize cart count and checkout summary if on the checkout page
updateCartCount();
if (window.location.pathname.includes('checkout.html')) {
    updateCheckoutSummary();
}
// Existing code...

// User authentication
const signupForm = document.getElementById('signup-form');
const loginForm = document.getElementById('login-form');
const userMenu = document.querySelector('.user-menu');

function createAccount(username, email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const userExists = users.find(user => user.email === email);
    if (userExists) {
        alert('An account with this email already exists.');
        return false;
    }
    users.push({ username, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    return true;
}

function login(email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        return true;
    }
    return false;
}

function logout() {
    localStorage.removeItem('currentUser');
    updateUserMenu();
    window.location.href = 'index.html';
}

function updateUserMenu() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (userMenu) {
        if (currentUser) {
            userMenu.innerHTML = `
                <span>${currentUser.username}</span>
                <div class="user-menu-content">
                    <a href="#" id="logout-btn">Logout</a>
                </div>
            `;
            const logoutBtn = document.getElementById('logout-btn');
            if (logoutBtn) {
                logoutBtn.addEventListener('click', (e) => {
                    e.preventDefault();
                    logout();
                });
            }
        } else {
            userMenu.innerHTML = `
                <a href="login.html">Login</a> / <a href="signup.html">Sign Up</a>
            `;
        }
    }
}

if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        if (createAccount(username, email, password)) {
            alert('Account created successfully. Please log in.');
            window.location.href = 'login.html';
        }
    });
}

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (login(email, password)) {
            alert('Logged in successfully.');
            window.location.href = 'index.html';
        } else {
            alert('Invalid email or password.');
        }
    });
}

// Update user menu on page load
updateUserMenu();

// Existing code...