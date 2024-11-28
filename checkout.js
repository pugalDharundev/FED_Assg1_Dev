document.addEventListener('DOMContentLoaded', () => {
    const checkoutItemsContainer = document.querySelector('.checkout-items');
    const checkoutTotalElement = document.getElementById('checkout-total');
    const placeOrderBtn = document.getElementById('place-order-btn');
    const discountButton = document.getElementById('submit-btn');
    
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
    
    // Simulate order placement
    placeOrderBtn.addEventListener('click', () => {
        alert('Thank you for your order!');
        
        // Clear cart and redirect to the homepage or confirmation page
        localStorage.removeItem('cartItems');
        window.location.href = 'index.html';
    });
    
    // Load cart items on page load
    loadCartItems();
    function discountShower(){
        discountList = [["CaffineBoost",4.5],
        ["Save20",5],["Welcome10",4],["SpringSale",2],["CaramelLove",1.5],["BerryBlast",3.5],["BlackFriday",2.50],["Buy456C",1],];
        const input = document.getElementById("input-discount").value;
        const currentPrice = document.getElementById("checkout-total");
        const amount = currentPrice.textContent.substring(7).replace("$", '');        ;
        let selected = "null";
        discountList.forEach(function(x){
            if(x[0] == input){
                selected = x;
            }
        })
        if(selected == "null"){
            alert("Discount does not exist")
        }else{
            let left = amount-selected[1];
            console.log(amount);
            currentPrice.textContent = "Total: $"+left.toFixed(2);
        }
        
    }
    discountButton.addEventListener("click", function(){
        discountShower();
    })
});
