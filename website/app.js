/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather';
const apiKey = '7f8767c64ac8cf17e74cfbe1b2f42945&units=imperial'; // Replace with your actual API key

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear(); // Adjusting month to be 1-based

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e) {
    const newZip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    getWeather(baseURL, newZip, apiKey)
    .then(function(data) {
        // Add data to POST request
        postData('/add', {
            temperature: data.main.temp,
            date: newDate,
            userResponse: feelings
        });
    })
    .then(function() {
        // Call updateUI to update browser content
        updateUI();
    });
}

// Async GET
const getWeather = async (baseURL, zip, key) => {
    const res = await fetch(`${baseURL}?zip=${zip}&appid=${key}`);
    try {
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("error", error);
    }
};

// Async POST
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

// Async GET to update UI
const updateUI = async () => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();
        document.getElementById('temp').innerHTML = Math.round(allData.temperature) + ' degrees';
        document.getElementById('content').innerHTML = allData.userResponse;
        document.getElementById('date').innerHTML = allData.date;
    } catch (error) {
        console.log("error", error);
    }
};
