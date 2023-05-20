document.getElementById('login-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Send the login data to the server
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
        .then(response => response.json())
        .then(data => {
            if (data.errors && data.errors.length > 0) {
                showErrorModal(data.errors);
            } else {
                // Store the token in the browser's local storage
                localStorage.setItem('token', data.token);

                // Redirect the user to the dashboard or another protected page
                window.location.href = '../../memberPage/memberPage.html';
            }
        });
});

function go_to_registration()
{
    location.href = "../registration/registration.html";
}
