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
  fetch('../assets/data/services.csv')
    .then(response => response.text())
    .then(data => {
      const rows = parseTSV(data).slice(1); // Skip the header row
      const dropdown = document.getElementById('services-dropdown');

      rows.forEach(row => {
        const serviceName = row[0]; // Service name column
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
});

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

  // Fetch TSV and add event listeners to hardcoded service cards
  fetch('../assets/data/services.csv')
    .then(response => response.text())
    .then(data => {
      const rows = parseTSV(data).slice(1); // Skip the header row

      const serviceItems = document.querySelectorAll('.service-item');

      serviceItems.forEach(item => {
        const serviceName = item.dataset.service; // Match data-service attribute

        // Find matching service in TSV
        const match = rows.find(row => row[0] === serviceName);
        if (match) {
          // Build the link dynamically
          const serviceURL = `../service/index.html?service=${encodeURIComponent(serviceName)}`;

          // Add click event listener to navigate to the URL
          item.addEventListener('click', () => {
            window.location.href = serviceURL;
          });

          // Optional: Add hover effect for visual cue
          item.style.cursor = 'pointer';
        } else {
          console.warn(`Service "${serviceName}" not found in TSV`);
        }
      });
    })
    .catch(error => console.error('Error loading services:', error));
});
