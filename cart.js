document.addEventListener('DOMContentLoaded', () => {
    // Add to Cart functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function () {
            const product = this.getAttribute('data-product');
            const price = parseFloat(this.getAttribute('data-price'));

            // Add product to cart
            addToCart(product, price);

            // Change button text and disable it
            this.textContent = 'Added';
            this.disabled = true;
        });

        // Check if the item is already in the cart, and disable the button
        const product = button.getAttribute('data-product');
        if (isInCart(product)) {
            button.textContent = 'Added';
            button.disabled = true;
        }
    });

    // Load cart on the cart page
    if (window.location.href.includes('cart.html')) {
        loadCart();
    }

    // Load order page data if on the order.html page
    if (window.location.href.includes('order.html')) {
        // You can add additional code here for placing orders
    }
});

// Add product to cart (using local storage)
function addToCart(product, price) {
    let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

    // Add product to the cart array if not already present
    if (!cart.find(item => item.product === product)) {
        cart.push({ product, price, size: '', color: '', quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}

// Check if product is already in the cart
function isInCart(product) {
    let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    return cart.some(item => item.product === product);
}

// Load cart on cart.html page
function loadCart() {
    const cartItemsElement = document.getElementById('cartItems');
    const cartTotalElement = document.getElementById('cartTotal');
    let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

    let total = 0;
    cartItemsElement.innerHTML = '';

    // List cart items
    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${item.product} - $${item.price}
            <br>
            Size: <select data-product="${item.product}" onchange="updateSize(this)">
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
            </select>
            Color: <select data-product="${item.product}" onchange="updateColor(this)">
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="black">Black</option>
            </select>
            Quantity: <input type="number" data-product="${item.product}" value="${item.quantity}" min="1" onchange="updateQuantity(this)">
        `;
        cartItemsElement.appendChild(li);
        total += item.price * item.quantity;
    });

    cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
}

// Update item size
function updateSize(selectElement) {
    const product = selectElement.getAttribute('data-product');
    let cart = JSON.parse(localStorage.getItem('cart'));
    const item = cart.find(item => item.product === product);
    item.size = selectElement.value;
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update item color
function updateColor(selectElement) {
    const product = selectElement.getAttribute('data-product');
    let cart = JSON.parse(localStorage.getItem('cart'));
    const item = cart.find(item => item.product === product);
    item.color = selectElement.value;
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update item quantity
function updateQuantity(inputElement) {
    const product = inputElement.getAttribute('data-product');
    let cart = JSON.parse(localStorage.getItem('cart'));
    const item = cart.find(item => item.product === product);
    item.quantity = parseInt(inputElement.value);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();  // Reload cart to update total
}

// Proceed to checkout button
function proceedToCheckout() {
    window.location.href = 'order.html';
}
