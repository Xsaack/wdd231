const API_KEY = 'b2dd1d85e531228d017d5fb1c4bab495';
const CITY = 'Mazatlan';
const COUNTRY = 'MX';

// Función principal para obtener y mostrar el clima
async function showWeather() {
    try {
        // Obtener clima actual
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CITY},${COUNTRY}&units=metric&appid=${API_KEY}`);
        const data = await response.json();
        
        // Mostrar datos básicos
        document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        document.getElementById('current-temp').textContent = `${Math.round(data.main.temp)}°C`;
        document.getElementById('weather-desc').textContent = data.weather[0].description;
        
        // Obtener y mostrar pronóstico simple (solo los próximos 3 días)
        showSimpleForecast();
        
    } catch (error) {
        console.log('Error al cargar el clima:', error);
        document.getElementById('current-weather').innerHTML = '<p>No se pudo cargar el clima</p>';
    }
}

// Función simplificada para el pronóstico
async function showSimpleForecast() {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${CITY},${COUNTRY}&units=metric&appid=${API_KEY}`);
    const data = await response.json();
    
    const forecastContainer = document.querySelector('.forecast-container');
    forecastContainer.innerHTML = '';
    
    // Tomamos solo 3 puntos de pronóstico (1 por día)
    for (let i = 0; i < 3; i++) {
        const day = data.list[i*8]; // Tomamos un dato por día (cada 8 elementos son ~24hrs)
        const date = new Date(day.dt * 1000);
        
        forecastContainer.innerHTML += `
            <div class="forecast-day">
                <h4>${date.toLocaleDateString('es-MX', { weekday: 'short' })}</h4>
                <img src="https://openweathermap.org/img/wn/${day.weather[0].icon}.png">
                <p>${Math.round(day.main.temp_max)}°C</p>
            </div>
        `;
    }
}

// Cargar el clima cuando la página esté lista
document.addEventListener('DOMContentLoaded', showWeather);