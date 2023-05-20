const apiKey = "NI81gq81V7qAMQq4FePOu67diSaJwBBy9vH1ta3x";
const apiCall = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

fetch(apiCall)
    .then(response => response.json())
    .then(data => {
        document.getElementById("title").textContent = data.title;
        document.getElementById("pic").src = data.hdurl;
        document.getElementById("explanation").textContent = data.explanation;
    })

    .catch(error => console.error(error));
