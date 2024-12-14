document.addEventListener('DOMContentLoaded', () => {
  // Function to parse CSV
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
          current += '"';
          i++;
        } else if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          row.push(current.trim());
          current = '';
        } else {
          current += char;
        }
      }

      if (current) row.push(current.trim());
      if (row.length > 0) rows.push(row);
    }
    return rows;
  };

  // Function to get query parameter
  const getQueryParameter = (name) => {
    const params = new URLSearchParams(window.location.search);
    return params.get(name);
  };

  // Fetch and display service details
  const loadServiceDetails = () => {
    const serviceName = getQueryParameter('service');

    if (!serviceName) {
      console.error('No service name provided in the URL.');
      return;
    }

    fetch('../data/services.csv')
      .then(response => response.text())
      .then(data => {
        const rows = parseCSV(data);
        const header = rows[0]; // CSV header row
        const serviceData = rows.find(row => row[0] === serviceName); // Match by service name

        if (serviceData) {
          document.getElementById('service-title').textContent = serviceData[0]; // Service name
          document.getElementById('short-description').textContent = serviceData[1]; // Short description
          document.getElementById('long-description').textContent = serviceData[2]; // Long description
        } else {
          console.error('Service not found in CSV.');
        }
      })
      .catch(error => console.error('Error loading service details:', error));
  };

  loadServiceDetails();
});
