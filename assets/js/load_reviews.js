async function loadReviews() {
    const response = await fetch('../data/home_advisor_reviews.csv'); // Adjust the path to your file
    const csvText = await response.text();

    // Parse CSV manually (handles quotes, commas, and spaces correctly)
    const rows = csvText.split('\n').slice(1); // Skip the header row
    const reviews = rows.map(row => {
        // Use regex to split CSV rows into fields while respecting quotes
        const fields = row.match(/(".*?"|[^",]+)(?=\s*,|\s*$)/g);

        if (fields) {
            const [rating, name, location, date, service, review] = fields.map(field =>
                field.replace(/^"|"$/g, '').trim() // Remove surrounding quotes and whitespace
            );
            return {
                rating: parseFloat(rating),
                name,
                location,
                date,
                service,
                review
            };
        }
        return null; // Skip invalid rows
    }).filter(item => item !== null); // Remove invalid rows

    renderReviews(reviews);
}

// Function to render reviews
function renderReviews(reviews) {
    const container = document.getElementById('reviewsContainer');

    reviews.forEach(({ rating, name, location, date, service, review }) => {
        // Create a review card
        const reviewCard = document.createElement('div');
        reviewCard.className = 'review-card';

        // Populate the card with review data
        reviewCard.innerHTML = `
            <h3>${name} <span class="review-location">(${location})</span></h3>
            <p class="review-service"><strong>Service:</strong> ${service}</p>
            <p class="review-text">"${review}"</p>
            <p class="review-rating"><strong>Rating:</strong> ${'⭐'.repeat(Math.round(rating))} (${rating}/5)</p>
            <p class="review-date"><strong>Date:</strong> ${new Date(date).toLocaleDateString()}</p>
        `;

        // Append the card to the container
        container.appendChild(reviewCard);
    });
}

// Load reviews on page load
document.addEventListener('DOMContentLoaded', loadReviews);