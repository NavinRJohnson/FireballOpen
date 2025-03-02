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
    
    // Fetch weather data for the banner
    fetchWeatherData();
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
            document.getElementById('weather-temp').textContent = `${Math.round(data.main.temp)}°F`;
            document.getElementById('weather-desc').textContent = data.weather[0].description;
            document.getElementById('weather-humidity').textContent = `${data.main.humidity}%`;
            document.getElementById('weather-wind').textContent = `${Math.round(data.wind.speed)} mph`;
            
            // Set weather icon
            const iconCode = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            document.getElementById('weather-icon').innerHTML = `<img src="${iconUrl}" alt="${data.weather[0].description}">`;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('weather-temp').textContent = 'Weather data unavailable';
        });
}
