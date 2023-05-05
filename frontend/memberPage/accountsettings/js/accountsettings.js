fetch('http://localhost:3000/user/1') // Replace '1' with the actual user ID
    .then(response => response.json())
    .then(data => {
        const userDetailsDiv = document.getElementById('user-details');
        userDetailsDiv.innerHTML = `
        <p>Username: ${data[0].username}</p>
        <p>First Name: ${data[0].firstname}</p>
        <p>Last Name: ${data[0].lastname}</p>
    `;
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