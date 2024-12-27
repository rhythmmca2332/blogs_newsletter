document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('newsletterForm');
    const messageDiv = document.getElementById('message');

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('email').value;

        // Replace this URL with your actual Azure Logic App HTTP trigger endpoint
        const azureLogicAppEndpoint = 'https://prod-05.northeurope.logic.azure.com:443/workflows/71afe60c6bc940ec92b2ace4f992660a/triggers/When_a_HTTP_request_is_received/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2FWhen_a_HTTP_request_is_received%2Frun&sv=1.0&sig=eo6R7Vf2lJzxW7ARn8vUqXmOi4Ps2eLqOIDsYijxB5Y';

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

