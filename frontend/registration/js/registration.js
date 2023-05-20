document.getElementById('registration-form').addEventListener('submit', (event) => {
    event.preventDefault();

    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const username = document.getElementById('username').value;
    const password1 = document.getElementById('password1').value;
    const password2 = document.getElementById('password2').value;

    // Validate the input
    const validationErrors = validateInput(firstname, lastname, username, password1, password2);

    if (validationErrors.length > 0) {
        showErrorModal(validationErrors);
    } else {
        // Send the data to the server
        fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({firstname, lastname, username, password1, password2})
        })
            .then(response => response.json())
            .then(data => {
                if (data.errors && data.errors.length > 0) {
                    showErrorModal(data.errors);
                } else {
                    // Redirect the user to the login page
                    window.location.href = '../login/login.html';
                }
            });
    }
});

function validateInput(firstname, lastname, username, password1, password2) {
    const errors = [];

    // Check if both passwords are equal
    if (password1 !== password2) {
        errors.push('Passwords do not match');
    }

    // Check if the first name contains numbers
    if (/\d/.test(firstname)) {
        errors.push('First name should not contain numbers');
    }

    // Check if the last name contains numbers
    if (/\d/.test(lastname)) {
        errors.push('Last name should not contain numbers');
    }

    // Validate the form data
    if (firstname === "" || lastname === "" || username === "" || password1 === "") {
        errors.push('Please fill in all the data fields.');
    }

    return errors;
}

function showErrorModal(errors) {
    const errorList = document.createElement('ul');
    errors.forEach((error) => {
        const li = document.createElement('li');
        li.textContent = error;
        errorList.appendChild(li);
    });
    const modal = document.getElementById('error-modal');
    const modalBody = modal.querySelector('.modal-body');
    modalBody.innerHTML = '';
    modalBody.appendChild(errorList);
    const modalTrigger = new bootstrap.Modal(modal);
    modalTrigger.show();
}
