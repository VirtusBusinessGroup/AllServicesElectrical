function clearForm(event) {
        // Prevent default form submission behavior
        event.preventDefault();

        // Submit the form manually
        event.target.submit();

        // Clear the form fields after submission
        setTimeout(() => {
            document.getElementById("static-name").value = "";
            document.getElementById("static-email").value = "";
            document.getElementById("static-phone").value = "";
            document.getElementById("static-address").value = "";
            document.getElementById("static-service").value = "";
            alert("Your message has been sent!");
        }, 500); // Delay to ensure form submission completes
    }