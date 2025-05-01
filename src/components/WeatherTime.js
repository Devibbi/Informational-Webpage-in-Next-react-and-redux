import React, { useEffect, useState } from 'react';

const WEATHER_API_KEY = '689e563a4664417e5bbde0e2ba455089'; // OpenWeatherMap
const CITY = 'Islamabad'; // You can change this or make it dynamic

export default function WeatherTime() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    async function fetchWeather() {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${WEATHER_API_KEY}&units=metric`
        );
        if (!res.ok) throw new Error('Failed to fetch weather');
        const data = await res.json();
        setWeather({
          temp: Math.round(data.main.temp),
          desc: data.weather[0].description,
          icon: data.weather[0].icon,
          city: data.name,
        });
      } catch (err) {
        setError(err.message || 'Unknown error');
      } finally {
        setLoading(false);
      }
    }
    fetchWeather();
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full flex flex-col items-center justify-center py-6 mb-6">
      <div className="glass-card flex items-center gap-8 px-10 py-6 rounded-3xl shadow-2xl bg-gradient-to-r from-blue-500/70 via-purple-500/60 to-pink-400/60 backdrop-blur-xl border border-white/30 animate-fadeInUp">
        {weather && !loading && !error && (
          <>
            <img
              src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`}
              alt={weather.desc}
              className="w-20 h-20 drop-shadow-xl rounded-full bg-white/40 p-2 border-4 border-white/30"
            />
            <div className="flex flex-col items-start justify-center">
              <span className="text-4xl font-extrabold text-white drop-shadow-lg tracking-wide">{weather.city}</span>
              <span className="text-2xl text-white/90 font-semibold capitalize mt-1 flex items-center gap-2">
                <span className="inline-block align-middle">{weather.temp}°C</span>
                <span className="inline-block align-middle px-2 py-1 rounded-lg bg-white/20 text-white/90 text-sm font-medium capitalize">{weather.desc}</span>
              </span>
            </div>
          </>
        )}
        {loading && <div className="text-white/80 animate-pulse text-lg">Loading weather...</div>}
        {error && <div className="text-red-300 font-semibold">Error: {error}</div>}
        <div className="flex flex-col items-end ml-auto">
          <span className="text-lg font-medium text-white/80">{time.toLocaleTimeString()}</span>
          <span className="text-sm text-white/70 mt-1">{time.toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}
