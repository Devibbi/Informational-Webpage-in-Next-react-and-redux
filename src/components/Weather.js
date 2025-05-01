import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Weather() {
  const [cityInput, setCityInput] = useState('');
  const [weather, setWeather] = useState({
    data: null,
    loading: false,
    error: ''
  });
  const [city, setCity] = useState('New York');

  useEffect(() => {
    fetchWeather();
  }, [city]);

  async function fetchWeather() {
    setWeather(prev => ({ ...prev, loading: true, error: '' }));
    try {
      const apiKey = '689e563a4664417e5bbde0e2ba455089';
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      setWeather({
        data: response.data,
        loading: false,
        error: ''
      });
    } catch (err) {
      setWeather(prev => ({
        ...prev,
        loading: false,
        error: err.message || 'Failed to fetch weather data'
      }));
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cityInput.trim()) {
      setCity(cityInput);
      setCityInput('');
    }
  };

  const getWeatherIcon = (weatherCode) => {
    if (weatherCode >= 200 && weatherCode < 300) {
      return '⛈️';
    } else if (weatherCode >= 300 && weatherCode < 400) {
      return '🌧️';
    } else if (weatherCode >= 500 && weatherCode < 600) {
      return '🌧️';
    } else if (weatherCode >= 600 && weatherCode < 700) {
      return '❄️';
    } else if (weatherCode >= 700 && weatherCode < 800) {
      return '🌫️';
    } else if (weatherCode === 800) {
      return '☀️';
    } else if (weatherCode > 800) {
      return '☁️';
    }
    return '🌡️';
  };

  return (
    <div className="relative weather-container">
      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 to-indigo-600 mb-6 text-center">Weather</h2>
      
      <form onSubmit={handleSubmit} className="mb-6">
        <div className="flex gap-2 relative">
          <input
            type="text"
            value={cityInput}
            onChange={(e) => setCityInput(e.target.value)}
            placeholder="Enter city name"
            className="flex-1 px-4 py-3 rounded-lg border border-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-sm"
            disabled={weather.loading}
          />
          <button
            type="submit"
            className="btn-primary"
            disabled={weather.loading}
          >
            {weather.loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>
      
      {weather.loading && (
        <div className="text-center py-8">
          <div className="animate-pulse-slow flex flex-col items-center">
            <div className="w-16 h-16 bg-purple-200 rounded-full mb-4"></div>
            <div className="h-6 bg-purple-200 rounded w-24 mb-2"></div>
            <div className="h-4 bg-purple-100 rounded w-32 mb-6"></div>
            <div className="grid grid-cols-2 gap-8 w-full">
              <div className="h-16 bg-purple-100 rounded"></div>
              <div className="h-16 bg-purple-100 rounded"></div>
            </div>
          </div>
        </div>
      )}
      
      {weather.error && (
        <div className="text-center py-8 bg-red-50 rounded-lg border border-red-100 px-4">
          <p className="text-red-500 mb-4">Error: {weather.error}</p>
          <button 
            onClick={fetchWeather}
            className="btn-primary"
          >
            Try Again
          </button>
        </div>
      )}
      
      {weather.data && !weather.loading && !weather.error && (
  <div className="flex flex-col items-center">
    <div className="flex items-center justify-center gap-6 mb-6 transform hover:scale-105 transition-all duration-300">
      <span className="weather-icon">
        {getWeatherIcon(weather.data.weather?.[0]?.id)}
      </span>
      <div>
        <h3 className="weather-temp">{Math.round(weather.data.main.temp)}°C</h3>
        <p className="weather-desc">{weather.data.weather?.[0]?.description}</p>
      </div>
    </div>
    <div className="w-full grid grid-cols-2 gap-6 mb-6">
  {/* Humidity Card */}
  <div className="glass-card p-4 rounded-xl text-center transform hover:scale-105 transition-all duration-300">
    <p className="text-lg font-semibold text-gray-100 mb-2 flex items-center justify-center gap-2 transition-all duration-300 hover:text-teal-300">
      <span className="text-xl">💧</span> {/* Icon for humidity */}
      <h2 className="text-4xl font-extrabold bg-clip-text text-white bg-gradient-to-r from-teal-400 via-purple-500 to-pink-600">
        Humidity
      </h2>
    </p>
    <p className="text-3xl font-semibold text-white">
      {weather.data.main.humidity}%
    </p>
  </div>

  {/* Wind Speed Card */}
  <div className="glass-card p-4 rounded-xl text-center transform hover:scale-105 transition-all duration-300">
    <p className="text-lg font-semibold text-gray-100 mb-2 flex items-center justify-center gap-2 transition-all duration-300 hover:text-teal-300">
      <span className="text-xl">🌬️</span> {/* Icon for wind */}
      <h2 className="text-4xl font-extrabold bg-clip-text text-white bg-gradient-to-r from-teal-400 via-purple-500 to-pink-600">
        Wind Speed
      </h2>
    </p>
    <p className="text-3xl font-semibold text-white">
      {weather.data.wind.speed} m/s
    </p>
  </div>
</div>


    <p className="text-center text-lg font-medium mb-4 bg-white/30 px-4 py-1 rounded-full backdrop-blur-sm">
      {weather.data.name}, {weather.data.sys.country}
    </p>
  </div>
)}
    </div>
  );
}
