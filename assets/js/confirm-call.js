function confirmCall() {
    const userConfirmed = confirm("Do you want to call 888-646-7066?");
    if (userConfirmed) {
        window.location.href = "tel:8886467066"; // Initiates the call
    }
}
