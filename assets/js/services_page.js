document.addEventListener('DOMContentLoaded', () => {
    // Function to parse CSV with support for quoted fields
    const parseCSV = (csvText) => {
        const rows = [];
        const lines = csvText.split('\n');
        for (const line of lines) {
            const row = [];
            let current = '';
            let inQuotes = false;

            for (let i = 0; i < line.length; i++) {
                const char = line[i];

                if (char === '"' && line[i + 1] === '"') {
                    // Handle escaped double quotes
                    current += '"';
                    i++;
                } else if (char === '"') {
                    // Toggle quoted state
                    inQuotes = !inQuotes;
                } else if (char === ',' && !inQuotes) {
                    // End of field
                    row.push(current.trim());
                    current = '';
                } else {
                    current += char;
                }
            }

            // Add the last field
            if (current) {
                row.push(current.trim());
            }

            if (row.length > 0) {
                rows.push(row);
            }
        }
        return rows;
    };

    // Load services from CSV
    fetch('../assets/data/services.csv') // Adjust CSV file path if necessary
        .then(response => response.text())
        .then(data => {
            const rows = parseCSV(data).slice(1); // Skip the header row
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
