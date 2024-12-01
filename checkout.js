document.addEventListener('DOMContentLoaded', () => {
    const checkoutItemsContainer = document.querySelector('.checkout-items');
    const checkoutTotalElement = document.getElementById('checkout-total');
    const placeOrderBtn = document.getElementById('place-order-btn');
    const discountButton = document.getElementById('submit-btn');
    const closeCheckoutButton = document.getElementById('close-checkout');

    // Load cart items from localStorage
    function loadCartItems() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        checkoutItemsContainer.innerHTML = '';
        let total = 0;

        // Populate checkout page with items
        cartItems.forEach((item) => {
            const price = parseFloat(item.price.replace('$', ''));
            const itemTotal = price * item.quantity;
            total += itemTotal;

            const itemElement = document.createElement('div');
            itemElement.classList.add('checkout-item');
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" style="width: 170px; height: auto;">
                <div class="checkout-item-details">
                    <h3>${item.name}</h3>
                    <p>Price: $${price.toFixed(2)}</p>
                    <p>Quantity: ${item.quantity}</p>
                    <p>Total: $${itemTotal.toFixed(2)}</p>
                </div>
            `;
            checkoutItemsContainer.appendChild(itemElement);
        });

        // Update total
        checkoutTotalElement.textContent = `Total: $${total.toFixed(2)}`;
    }

    // Discount code functionality
    function applyDiscount() {
        const discountList = [
            ["CaffineBoost", 4.5],
            ["Save20", 5],
            ["Welcome10", 4],
            ["SpringSale", 2],
            ["CaramelLove", 1.5],
            ["BerryBlast", 3.5],
            ["BlackFriday", 2.50],
            ["Buy456C", 1],
            ["X87890C", 1]
        ];

        const input = document.getElementById("input-discount").value.trim();
        const currentPrice = parseFloat(checkoutTotalElement.textContent.substring(7).replace("$", ''));
        let selected = null;

        discountList.forEach((x) => {
            if (x[0] === input) {
                selected = x;
            }
        });

        if (!selected) {
            alert("Discount does not exist");
        } else {
            const newTotal = currentPrice - selected[1];
            checkoutTotalElement.textContent = `Total: $${Math.max(0, newTotal).toFixed(2)}`;
            alert(`Discount applied: $${selected[1]}`);
        }
    }

    discountButton.addEventListener("click", applyDiscount);

    // Credit card validation
    function validateCreditCard() {
        const cardNumber = document.getElementById('card-number').value.trim().replace(/\s+/g, '');
        const expiryDate = document.getElementById('expiry-date').value.trim();
        const cvv = document.getElementById('cvv').value.trim();
    
        // Validate card number using Luhn's algorithm
        function isValidCardNumber(number) {
            // Remove any non-digit characters
            number = number.replace(/\D/g, '');
            
            // Check if number contains only digits and is of valid length
            if (!/^\d{13,19}$/.test(number)) {
                return false;
            }
    
            // Luhn algorithm
            let sum = 0;
            let isEvenIndex = false;
    
            for (let i = number.length - 1; i >= 0; i--) {
                let digit = parseInt(number.charAt(i), 10);
    
                if (isEvenIndex) {
                    digit *= 2;
                    if (digit > 9) {
                        digit -= 9;
                    }
                }
    
                sum += digit;
                isEvenIndex = !isEvenIndex;
            }
    
            return sum % 10 === 0;
        }
    
        // Validate expiry date (MM/YY format)
        function isValidExpiryDate(date) {
            const [month, year] = date.split('/').map((val) => parseInt(val, 10));
            if (isNaN(month) || isNaN(year) || month < 1 || month > 12) {
                return false;
            }
    
            const currentDate = new Date();
            const currentMonth = currentDate.getMonth() + 1; // 0-indexed
            const currentYear = currentDate.getFullYear() % 100; // Last 2 digits
    
            return year > currentYear || (year === currentYear && month >= currentMonth);
        }
    
        // Validate CVV (3 digits)
        function isValidCVV(cvv) {
            return /^\d{3}$/.test(cvv);
        }
    
        // Perform all validations
        if (!cardNumber) {
            alert("Please enter a card number.");
            return false;
        }
    
        if (!isValidCardNumber(cardNumber)) {
            alert("Invalid card number. Please check again.");
            return false;
        }
    
        if (!expiryDate) {
            alert("Please enter an expiry date.");
            return false;
        }
    
        if (!isValidExpiryDate(expiryDate)) {
            alert("Invalid expiry date. Please use MM/YY format.");
            return false;
        }
    
        if (!cvv) {
            alert("Please enter CVV.");
            return false;
        }
    
        if (!isValidCVV(cvv)) {
            alert("Invalid CVV. Please enter a 3-digit number.");
            return false;
        }
    
        return true;
    }

    // Place order event listener
    placeOrderBtn.addEventListener('click', (e) => {
        e.preventDefault();

        // Validate credit card details
        if (!validateCreditCard()) {
            return;
        }

        // Simulate successful order placement
        alert('Thank you for your order!');
        localStorage.removeItem('cartItems'); // Clear cart
        window.location.href = 'index.html'; // Redirect to homepage or confirmation page
    });

    closeCheckoutButton.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    // Load cart items on page load
    loadCartItems();
});
