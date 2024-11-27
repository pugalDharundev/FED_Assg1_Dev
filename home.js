// Get the quantity controls buttons and input
const minusButton = document.querySelector('.cart-item .quantity-controls .minus');
const plusButton = document.querySelector('.cart-item .quantity-controls .plus');
const quantityInput = document.querySelector('.cart-item .quantity-controls input');

 // Add event listeners to the quantity controls
minusButton.addEventListener('click', () => {
if (quantityInput.value > 1) {
quantityInput.value--;
}
});

plusButton.addEventListener('click', () => {
quantityInput.value++;
});
function navigateMenu(){
    window.location.href = "menu.html";
}

