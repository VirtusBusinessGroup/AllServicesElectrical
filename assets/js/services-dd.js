document.addEventListener('DOMContentLoaded', () => {
  // Load services from CSV
  fetch('assets/data/services.csv')
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
