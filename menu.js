document.addEventListener('DOMContentLoaded', () => {
    const shoppingCartIcon = document.querySelector('.shopping-cart');
    const cartOverlay = document.createElement('div');
    const cartCountElement = document.getElementById('cart-count');

    // Create cart overlay once and append it to the body
    cartOverlay.classList.add('cart-overlay');
    cartOverlay.innerHTML = `
        <div class="cart-container">
            <div class="cart-header">
                <h2>Your Cart</h2>
                <button class="close-cart">&times;</button>
            </div>
            <div class="cart-items"></div>
            <div class="cart-total">Total: $0.00</div>
            <button class="checkout-btn">Checkout</button>
        </div>
    `;
    document.body.appendChild(cartOverlay);

    const cartItemsContainer = cartOverlay.querySelector('.cart-items');
    const cartTotalElement = cartOverlay.querySelector('.cart-total');
    const closeCartBtn = cartOverlay.querySelector('.close-cart');
    const checkoutBtn = cartOverlay.querySelector('.checkout-btn');

    // Event listener to toggle the cart overlay


    // Close cart overlay
    closeCartBtn.addEventListener('click', () => {
        cartOverlay.style.display = 'none';
    });


    function renderCartItems() {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItemsContainer.innerHTML = '';

        let total = 0;

        cartItems.forEach((item, index) => {
            const price = parseFloat(item.price.replace('$', ''));
            const itemTotal = price * item.quantity;
            total += itemTotal;

            const cartItemElement = document.createElement('div');
            cartItemElement.classList.add('cart-item');
            cartItemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>$${price.toFixed(2)}</p>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn decrease-qty" data-index="${index}">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn increase-qty" data-index="${index}">+</button>
                </div>
                <p>$${itemTotal.toFixed(2)}</p>
            `;
            cartItemsContainer.appendChild(cartItemElement);
        });

        cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;
        addQuantityListeners();
    }

    function addQuantityListeners() {
        const decreaseButtons = cartOverlay.querySelectorAll('.decrease-qty');
        const increaseButtons = cartOverlay.querySelectorAll('.increase-qty');

        decreaseButtons.forEach(button => {
            button.addEventListener('click', () => {
                const index = button.dataset.index;
                updateQuantity(index, -1);
            });
        });

        increaseButtons.forEach(button => {
            button.addEventListener('click', () => {
                const index = button.dataset.index;
                updateQuantity(index, 1);
            });
        });
    }

    function updateQuantity(index, change) {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems[index].quantity += change;

        if (cartItems[index].quantity <= 0) {
            cartItems.splice(index, 1);
        }

        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateCartCount();
        renderCartItems();
    }

    function updateCartCount() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        if (cartCountElement) {
            const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
            cartCountElement.textContent = totalQuantity;
        }
    }

    updateCartCount();
});
