function switchTab(tabIndex) {
    // Get all sections
    const iceCreamSections = document.querySelectorAll('.ice-cream-flavour-1');
    const dairyFreeSections = document.querySelectorAll('.dairy-free-flavour-1');
    const allTabs = document.querySelectorAll('.menu-tab');

    // Get headers
    const dairyFreeHeader = document.querySelector('.dairy-free-header');
    const topFlavorsHeader = document.querySelector('.top-flavours-header');

    // Hide all sections initially
    function hideAllSections() {
        iceCreamSections.forEach(section => section.style.display = 'none');
        dairyFreeSections.forEach(section => section.style.display = 'none');
    }

    // Hide all headers initially
    function hideAllHeaders() {
        if (dairyFreeHeader) dairyFreeHeader.style.display = 'none';
    }

    hideAllSections();
    hideAllHeaders();

    // Show sections and headers based on the selected tab
    if (tabIndex === 0) { 
        // Ice Cream Flavours tab (includes Dairy-Free)
        iceCreamSections.forEach(section => section.style.display = 'block');
        dairyFreeSections.forEach(section => section.style.display = 'block');
        if (dairyFreeHeader) dairyFreeHeader.style.display = 'block';
    } else if (tabIndex === 1) { 
        // Dairy-Free Flavours tab
        dairyFreeSections.forEach(section => section.style.display = 'block');
        if (dairyFreeHeader) dairyFreeHeader.style.display = 'block';
    }

    // Update active tab styles
    allTabs.forEach(tab => tab.classList.remove('active'));
    allTabs[tabIndex].classList.add('active');
}

// Ensure that "Ice Cream Flavours" does not show Top Flavours
document.addEventListener("DOMContentLoaded", () => {
    switchTab(0); // Show Ice Cream Flavours by default
});
