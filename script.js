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
    
    // Weather widget functionality
    const weatherWidget = document.getElementById('weather-widget');
    if (weatherWidget) {
        fetchWeatherData();
    }
});

// Function to fetch weather data from OpenWeatherMap API
function fetchWeatherData() {
    const apiKey = '90099e5009cc18dc83be73cf909963b3'; // Using the same API key from the original widget
    const cityId = '5380626'; // Palm Desert, CA
    const units = 'imperial'; // Fahrenheit
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=${apiKey}&units=${units}`;
    
    const weatherLoading = document.getElementById('weather-loading');
    const weatherContent = document.getElementById('weather-content');
    const weatherError = document.getElementById('weather-error');
    
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Weather data not available');
            }
            return response.json();
        })
        .then(data => {
            // Update weather widget with data
            document.getElementById('weather-temp').textContent = `${Math.round(data.main.temp)}°F`;
            document.getElementById('weather-description').textContent = data.weather[0].description;
            document.getElementById('weather-humidity').textContent = `${data.main.humidity}%`;
            document.getElementById('weather-wind').textContent = `${Math.round(data.wind.speed)} mph`;
            
            // Set weather icon
            const iconCode = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            document.getElementById('weather-icon').innerHTML = `<img src="${iconUrl}" alt="${data.weather[0].description}">`;
            
            // Show content, hide loading and error
            weatherLoading.style.display = 'none';
            weatherContent.style.display = 'block';
            weatherError.style.display = 'none';
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            // Show error, hide loading and content
            weatherLoading.style.display = 'none';
            weatherContent.style.display = 'none';
            weatherError.style.display = 'block';
        });
}
