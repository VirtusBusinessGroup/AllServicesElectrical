async function loadServices() {
    try {
        const response = await fetch('../data/services.csv');
        const data = await response.text();
        const rows = data.split('\n').slice(1); // Skip the header row

        const servicesList = document.getElementById('services-list');
        rows.forEach(row => {
            const columns = row.split(',');
            const service = columns[0].trim(); // Assuming the service name is in the first column
            if (service) {
                const listItem = document.createElement('li');
                listItem.textContent = service;
                servicesList.appendChild(listItem);
            }
        });
    } catch (error) {
        console.error('Error loading services:', error);
    }
}
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
});

// Call the function to load services
loadServices();
