document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('newsletterForm');
    const messageDiv = document.getElementById('message');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;

        // Replace this URL with your actual Azure Logic App HTTP trigger endpoint
        const azureLogicAppEndpoint = 'YOUR_AZURE_LOGIC_APP_ENDPOINT_HERE';

        fetch(azureLogicAppEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email: email }),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            messageDiv.textContent = 'Successfully subscribed to the newsletter!';
            messageDiv.style.color = 'green';
            form.reset();
        })
        .catch(error => {
            messageDiv.textContent = 'Failed to subscribe. Please try again later.';
            messageDiv.style.color = 'red';
            console.error('Error:', error);
        });
    });
});

