function openPopup() {
  document.getElementById("schedulePopup").style.display = "block";
}

function closePopup() {
  document.getElementById("schedulePopup").style.display = "none";
}

// Function to fetch services from a CSV file and populate the dropdown
function loadServices() {
  const serviceDropdown = document.getElementById("service");

  // Fetch the CSV file
  fetch("../assets/data/services.csv")
    .then(response => {
      if (!response.ok) {
        throw new Error("Failed to fetch services.csv");
      }
      return response.text();
    })
    .then(data => {
      // Parse the CSV file
      const rows = data.split("\n").slice(1); // Skip the header row

      rows.forEach(row => {
        const service = row.trim();
        if (service) {
          // Create an option element for each service
          const option = document.createElement("option");
          option.value = service;
          option.textContent = service;
          serviceDropdown.appendChild(option);
        }
      });
    })
    .catch(error => {
      console.error("Error loading services:", error);
    });
}

// Call `loadServices` when the page loads
document.addEventListener("DOMContentLoaded", loadServices);
