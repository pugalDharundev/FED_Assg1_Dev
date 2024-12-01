document.addEventListener('DOMContentLoaded', () => {
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
            <div class="cart-empty-message" style="display: none;">No items in the cart</div>
            <button class="checkout-btn" disabled>Checkout</button>
        </div>
        
    `;
    document.body.appendChild(cartOverlay);

    const cartItemsContainer = cartOverlay.querySelector('.cart-items');
    const cartTotalElement = cartOverlay.querySelector('.cart-total');
    const closeCartBtn = cartOverlay.querySelector('.close-cart');
    const checkoutBtn = cartOverlay.querySelector('.checkout-btn');
    const emptyCartMessage = cartOverlay.querySelector('.cart-empty-message');

    shoppingCartIcon.addEventListener('click', () => {
        renderCartItems();
        cartOverlay.style.display = 'flex';
    });

    closeCartBtn.addEventListener('click', () => {
        cartOverlay.style.display = 'none';
    });

    cartOverlay.addEventListener('click', (e) => {
        if (e.target === cartOverlay) {
            cartOverlay.style.display = 'none';
        }
    });

    function renderCartItems() {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItemsContainer.innerHTML = '';
        let total = 0;

        if (cartItems.length === 0) {
            emptyCartMessage.style.display = 'block';
            cartTotalElement.style.display = 'none';
            checkoutBtn.disabled = true;
        } else {
            emptyCartMessage.style.display = 'none';
            cartTotalElement.style.display = 'block';
            checkoutBtn.disabled = false;

            cartItems.forEach((item, index) => {
                const price = parseFloat(item.price.replace('$', ''));
                const itemTotal = price * item.quantity;
                total += itemTotal;

                const cartItemElement = document.createElement('div');
                cartItemElement.classList.add('cart-item');
                cartItemElement.innerHTML = `
                    <img src="${item.image}" alt="${item.name}" style="width:100px; height: auto;">
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
        }

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

    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const flavorItem = e.target.closest('.flavor-item-1');
            const itemName = flavorItem.querySelector('.flavor-title-1').textContent;
            const itemPrice = flavorItem.querySelector('.price-1').textContent;
            const itemImage = flavorItem.querySelector('.flavor-image-1').src;

            let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
            const existingItemIndex = cartItems.findIndex(item => item.name === itemName);

            if (existingItemIndex > -1) {
                cartItems[existingItemIndex].quantity += 1;
            } else {
                cartItems.push({
                    name: itemName,
                    price: itemPrice,
                    image: itemImage,
                    quantity: 1
                });
            }

            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            updateCartCount();
            alert(`${itemName} added to cart!`);
        });
    });

    checkoutBtn.addEventListener('click', () => {
        if (!checkoutBtn.disabled) {
            window.location.href = 'checkout.html';
        }
    });

    updateCartCount();
});
