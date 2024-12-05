document.addEventListener('DOMContentLoaded', () => {
    // Load services from CSV
    fetch('../data/services.csv')
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n').slice(1); // Skip the header row
            const dropdown = document.getElementById('services-dropdown');

            rows.forEach(row => {
                if (row.trim()) {
                    const li = document.createElement('li');
                    li.textContent = row.trim();
                    dropdown.appendChild(li);
                }
            });
        })
        .catch(error => console.error('Error loading services:', error));

    // Handle "SERVICES" link behavior
    const servicesLink = document.querySelector('.dropdown > a');
    const dropdownMenu = document.querySelector('.dropdown-menu');
    let clickedOnce = false;

    servicesLink.addEventListener('click', (event) => {
        const isMobileOrTablet = window.innerWidth <= 768; // Adjust breakpoint if needed

        if (isMobileOrTablet) {
            if (!clickedOnce) {
                // Prevent navigation and show dropdown on first click
                event.preventDefault();
                dropdownMenu.classList.toggle('show'); // Toggle the 'show' class
                clickedOnce = true;

                // Reset `clickedOnce` after a timeout
                setTimeout(() => {
                    clickedOnce = false;
                }, 3000); // Adjust timeout duration as needed
            } else {
                // Navigate to the services page on second click
                window.location.href = servicesLink.href;
            }
        }
    });
});
