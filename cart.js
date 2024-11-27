document.addEventListener('DOMContentLoaded', () => {
    // Select key elements
    const shoppingCartIcon = document.querySelector('.shopping-cart');
    const cartOverlay = document.createElement('div');
    const cartCountElement = document.getElementById('cart-count');

    // Create cart overlay
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

    // Select cart elements
    const cartItemsContainer = cartOverlay.querySelector('.cart-items');
    const cartTotalElement = cartOverlay.querySelector('.cart-total');
    const closeCartBtn = cartOverlay.querySelector('.close-cart');
    const checkoutBtn = cartOverlay.querySelector('.checkout-btn');

    // Toggle cart overlay
    shoppingCartIcon.addEventListener('click', () => {
        renderCartItems();
        cartOverlay.style.display = 'flex';
    });

    // Close cart overlay
    closeCartBtn.addEventListener('click', () => {
        cartOverlay.style.display = 'none';
    });

    // Close cart when clicking outside
    cartOverlay.addEventListener('click', (e) => {
        if (e.target === cartOverlay) {
            cartOverlay.style.display = 'none';
        }
    });

    // Function to render cart items
    function renderCartItems() {
        // Retrieve cart items from local storage
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        
        // Clear existing cart items
        cartItemsContainer.innerHTML = '';
        
        // Calculate total
        let total = 0;

        // Render each cart item
        cartItems.forEach((item, index) => {
            // Remove '$' and convert to number
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

        // Update total
        cartTotalElement.textContent = `Total: $${total.toFixed(2)}`;

        // Add quantity change event listeners
        addQuantityListeners();
    }

    // Function to add quantity change listeners
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

    // Function to update item quantity
    function updateQuantity(index, change) {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        
        // Update quantity
        cartItems[index].quantity += change;

        // Remove item if quantity becomes 0
        if (cartItems[index].quantity <= 0) {
            cartItems.splice(index, 1);
        }

        // Save updated cart
        localStorage.setItem('cartItems', JSON.stringify(cartItems));

        // Update cart count and re-render
        updateCartCount();
        renderCartItems();
    }

    // Function to update cart count in navigation
    function updateCartCount() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        
        if (cartCountElement) {
            const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);
            cartCountElement.textContent = totalQuantity;
        }
    }

    // Select all "Add to Cart" buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Find the parent flavor item container
            const flavorItem = e.target.closest('.flavor-item-1');
            
            // Extract item details
            const itemName = flavorItem.querySelector('.flavor-title-1').textContent;
            const itemPrice = flavorItem.querySelector('.price-1').textContent;
            const itemImage = flavorItem.querySelector('.flavor-image-1').src;

            // Retrieve existing cart items from local storage
            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

            // Check if item already exists in cart
            const existingItemIndex = cartItems.findIndex(item => item.name === itemName);

            if (existingItemIndex > -1) {
                // If item exists, increase quantity
                cartItems[existingItemIndex].quantity += 1;
            } else {
                // If new item, add to cart
                cartItems.push({
                    name: itemName,
                    price: itemPrice,
                    image: itemImage,
                    quantity: 1
                });
            }

            // Save updated cart to local storage
            localStorage.setItem('cartItems', JSON.stringify(cartItems));

            // Update cart count in navigation
            updateCartCount();

            // Optional: Show a confirmation
            alert(`${itemName} added to cart!`);
        });
    });

    // Checkout button functionality (placeholder)
    checkoutBtn.addEventListener('click', () => {
        window.location.href = 'checkout.html';
    });

    // Call this on page load to sync cart count
    updateCartCount();
});


