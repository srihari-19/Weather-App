// Event listener for enter purpose
document.getElementById("location-input").addEventListener('change', async () => {
    //   get the user input location 
    const location = document.getElementById("location-input").value;


    // fetch the weather data and handle potential error
    try {
        const weatherData = await getWeatherData(location);

        // Display the weather data on the page if sucessful
        displayWeatherData(weatherData);
    } catch (error) {
        alert(error.message);// show alert message
    }
});

const getWeatherData = async (location) => {
    if (!location) {
        return {};
    }
    // Api key
    const apikey = "";

    try {

        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apikey}`);
        // check if the response is not ok
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("City not found. Please check the spelling and try again.")
            } else {
                throw new Error(`Error fetching weather data: ${response.statusText}`);
            }
        }
    
    const data = await response.json();
    return data;

    }catch(error){
        console.error("Error fetching weather data:", error);
        // Re-throw the error so it can be caught by the caller
        throw new Error(`Failed to fetch weather data(Please check the spelling of the city). Please try again later.`);
    }
};
    
    

// change the background colour based on Tem
function getBackgroundColour(temperature) {
    if (temperature < 0) {
        return 'lightblue';
    } else if (temperature < 10) {
        return 'lightgreen';
    } else if (temperature < 20) {
        return 'lightyellow';
    } else if (temperature < 30) {
        return 'lightsalmon';
    } else {
        return 'lightcoral';
    }
}

const displayWeatherData = (data) => {
    const weatherDataElement = document.getElementById('WeatherData');

    if (Object.keys(data).length === 0) {
        weatherDataElement.innerHTML = "Please enter a location to see the weather"
    } else {
        const backgroundColour = getBackgroundColour(Math.floor(data.main.temp - 273.15));
        weatherDataElement.style.backgroundColor = backgroundColour;

        weatherDataElement.innerHTML = `
        <h3>${data.name}</h3>
        <p>Temperature:${Math.floor(data.main.temp - 273.15)}°C</p>
        <p>Humidity:${data.main.humidity}%</p>
        <p>Wind Speed:${(data.wind.speed)} m/s</p>
        `;
    }
}

// window.onload = async () => {
//     const weatherData = await getWeatherData();
//     displayWeatherData(weatherData);
// }