document.addEventListener("DOMContentLoaded", () => {
    const flavorItems = document.querySelectorAll(".flavor-item");

    // Add click event to each flavor item
    flavorItems.forEach((item) => {
        item.addEventListener("click", () => {
            // Extract flavor data from the clicked item
            const flavorData = {
                image: item.querySelector("img").src,
                name: item.querySelector("h3").textContent,
                description: item.querySelector("p").textContent,
                price: item.querySelector(".price").textContent.replace("$", ""),
            };

            // Save data to localStorage
            localStorage.setItem("selectedFlavor", JSON.stringify(flavorData));

            // Redirect to flavour-details page
            window.location.href = "flavours.details.html";
        });
    });
});
