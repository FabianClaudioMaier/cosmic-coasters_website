const token = localStorage.getItem('token');
fetch('http://localhost:3000/user/', {
    method: 'GET',
    headers: {
        'Authorization': `${token}` // Include the JWT token in the request header
    }
})
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            // Handle error case
            console.error(data.error);
            return;
        }

        const user = data.user;

        // Populate the form fields with user information
        document.getElementById('username').value = user.username;
        document.getElementById('email').value = user.email;
        document.getElementById('firstname').value = user.first_name;
        document.getElementById('lastname').value = user.last_name;
    })
    .catch(error => {
        // Handle fetch error
        console.error(error);
    });

// document.getElementById('update-user-form').addEventListener('submit', function(event) {
//   // Prevent the form from submitting normally
//   event.preventDefault();
//
//   // Get form values
//   const username = document.getElementById('username').value;
//   const firstname = document.getElementById('firstname').value;
//   const lastname = document.getElementById('lastname').value;
//
//   // Send a PATCH request to the backend API
//   fetch('http://localhost:3000/user/1', { // Replace '1' with the actual user ID
//     method: 'PATCH',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({
//       username: username,
//       firstname: firstname,
//       lastname: lastname
//     })
//   })
//   .then(response => response.json())
//   .then(data => console.log(data));
// });