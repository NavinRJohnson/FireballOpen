document.addEventListener('DOMContentLoaded', function() {
    // Handle navigation active state
    const navLinks = document.querySelectorAll('.main-nav a');
    const currentPage = window.location.pathname.split('/').pop();
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });
    
    // Check if weather elements exist before fetching weather data
    if (document.getElementById('weather-temp')) {
        fetchWeatherData();
    }
});

// Function to fetch weather data from OpenWeatherMap API
function fetchWeatherData() {
    const apiKey = '455e3681e35975afadd45c33fac0c4ca'; // Using the API key provided by the user
    const cityId = '5380626'; // Palm Desert, CA
    const units = 'imperial'; // Fahrenheit
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apiKey}&units=${units}`;
    
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Weather data not available');
            }
            return response.json();
        })
        .then(data => {
            // Update weather banner with data
            const tempElement = document.getElementById('weather-temp');
            const descElement = document.getElementById('weather-desc');
            const humidityElement = document.getElementById('weather-humidity');
            const windElement = document.getElementById('weather-wind');
            const iconElement = document.getElementById('weather-icon');
            
            if (tempElement) tempElement.textContent = `${Math.round(data.main.temp)}°F`;
            if (descElement) descElement.textContent = data.weather[0].description;
            if (humidityElement) humidityElement.textContent = `${data.main.humidity}%`;
            if (windElement) windElement.textContent = `${Math.round(data.wind.speed)} mph`;
            
            // Set weather icon
            if (iconElement) {
                const iconCode = data.weather[0].icon;
                const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
                iconElement.innerHTML = `<img src="${iconUrl}" alt="${data.weather[0].description}">`;
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            const tempElement = document.getElementById('weather-temp');
            if (tempElement) tempElement.textContent = 'Weather data unavailable';
        });
}
