document.getElementById("userForm").addEventListener("submit", function (event) {
    event.preventDefault();  // Prevent form submission from reloading the page

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;

    // Send data to the server using Fetch API
    fetch('/submit', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('message').textContent = data.message;
        document.getElementById('userForm').reset();
    })
    .catch(error => {
        document.getElementById('message').textContent = 'Error: ' + error.message;
    });
});
