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
  fetch('../assets/data/services.csv')
    .then(response => response.text())
    .then(data => {
      const rows = parseCSV(data).slice(1); // Skip the header row
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

  // Fetch CSV and add event listeners to hardcoded service cards
  fetch('../assets/data/services.csv')
    .then(response => response.text())
    .then(data => {
      const rows = parseCSV(data).slice(1); // Skip the header row

      const serviceItems = document.querySelectorAll('.service-item');

      serviceItems.forEach(item => {
        const serviceName = item.dataset.service; // Match data-service attribute

        // Find matching service in CSV
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
          console.warn(`Service "${serviceName}" not found in CSV`);
        }
      });
    })
    .catch(error => console.error('Error loading services:', error));
});
