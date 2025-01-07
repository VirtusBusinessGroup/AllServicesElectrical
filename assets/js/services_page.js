document.addEventListener('DOMContentLoaded', () => {
    // Function to parse TSV (Tab-Separated Values)
    const parseTSV = (tsvText) => {
        const rows = [];
        const lines = tsvText.split('\n');
        for (const line of lines) {
            const row = line.split('\t').map(cell => cell.trim()); // Split by tab and trim each cell
            if (row.length > 0) {
                rows.push(row);
            }
        }
        return rows;
    };

    // Load services from TSV
    fetch('../assets/data/services.csv') // Adjust TSV file path if necessary
        .then(response => response.text())
        .then(data => {
            const rows = parseTSV(data).slice(1); // Skip the header row
            const dropdown = document.getElementById('services-dropdown');

            rows.forEach(row => {
                const serviceName = row[0]; // Assuming service name is in the first column
                if (serviceName) {
                    const li = document.createElement('li');
                    const link = document.createElement('a');

                    // Create a link to the service details page with a query parameter
                    link.href = `../service/index.html?service=${encodeURIComponent(serviceName)}`;
                    link.textContent = serviceName;

                    li.appendChild(link);
                    dropdown.appendChild(li);
                }
            });
        })
        .catch(error => console.error('Error loading services:', error));

    // Handle "SERVICES" link behavior for mobile/tablet
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
