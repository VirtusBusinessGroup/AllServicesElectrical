function openPopup() {
  document.getElementById("schedulePopup").style.display = "block";
}

function closePopup() {
  document.getElementById("schedulePopup").style.display = "none";
}

// Function to populate service dropdowns
function loadServices() {
  // Select both dropdowns
  const popupServiceDropdown = document.getElementById("service");
  const staticServiceDropdown = document.getElementById("static-service");

  fetch("../data/services.csv")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch services.csv");
      }
      return response.text();
    })
    .then((data) => {
      const rows = data.split("\n").slice(1); // Skip the header row
      rows.forEach((row) => {
        const service = row.trim();
        if (service) {
          // Create an option element for each service
          const popupOption = document.createElement("option");
          popupOption.value = service;
          popupOption.textContent = service;
          popupServiceDropdown.appendChild(popupOption);

          const staticOption = document.createElement("option");
          staticOption.value = service;
          staticOption.textContent = service;
          staticServiceDropdown.appendChild(staticOption);
        }
      });
    })
    .catch((error) => {
      console.error("Error loading services:", error);
    });
}

// Call `loadServices` when the page loads
document.addEventListener("DOMContentLoaded", loadServices);


// Call `loadServices` when the page loads
document.addEventListener("DOMContentLoaded", loadServices);
