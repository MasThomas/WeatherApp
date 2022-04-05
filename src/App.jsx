import React, { useState } from "react"

const api = {
  key:"c823097aeb16442650a6b2271d1131ec",
  base: "https://api.openweathermap.org/data/2.5/"
}


function App() {

  const[query, setQuery] = useState('');
  const[weather, setWeather] = useState({});

  const search = e => {
    if(e.key ==="Enter") {
      sessionStorage.clear();
      fetch(`${api.base}weather?q=${query}&units=metric&lang=fr&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setQuery('')
          setWeather(result);
        })
    }
  }

  const dateBuilder = (d) => {
    return `${d.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}`
  }

  return (
    <div className={
      (typeof weather.main != "undefined") 
      ? ((weather.main.temp > 20) 
        ? 'App warm'
        : 'App')
      : 'App'
      }>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Rechercher ..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (
          <>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°C</div>
              <div className="weather">{weather.weather[0].description}</div>
            </div>
          </>
        ) 
        : ('')}
      </main>
    </div>
  )
}

export default App