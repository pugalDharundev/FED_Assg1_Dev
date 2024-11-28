document.addEventListener('DOMContentLoaded', function() {
    // Retrieve the flavor data from localStorage
    const flavorName = localStorage.getItem('flavorName');
    const flavorDescription = localStorage.getItem('flavorDescription');
    const flavorPrice = localStorage.getItem('flavorPrice');
    const flavorReviews = JSON.parse(localStorage.getItem('flavorReviews'));

    // Populate the flavor details on the page
    document.getElementById('flavor-name').textContent = flavorName;
    document.getElementById('flavor-description').textContent = flavorDescription;
    document.getElementById('flavor-price').textContent = flavorPrice;

    // Populate the reviews list
    const reviewsList = document.getElementById('flavor-reviews');
    if (flavorReviews && flavorReviews.length > 0) {
        flavorReviews.forEach(review => {
            const li = document.createElement('li');
            li.textContent = review;
            reviewsList.appendChild(li);
        });
    } else {
        // If no reviews, show a message
        const li = document.createElement('li');
        li.textContent = "No reviews yet.";
        reviewsList.appendChild(li);
    }
});
