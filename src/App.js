import React,{useState} from 'react';

const api = {
  key : "cacb196f56d4373cbf4b72e066fb7fab",
  base : "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [query,setQuery] = useState("");
  const [weather,setWeather] = useState("");

  const search = evt =>{
    if(evt.key === "Enter"){
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res =>res.json())
      .then(result => {
        setWeather(result);
        setQuery("");
        console.log(result);
      })
    }
  }
  const dateBuilder = (d) =>{
    let months = ["January","Feburary","March","April","May","June","July","August","September","October","November","December"];
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thrusday","Friday","Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  }
  return (
    <div className="app">
      <main>
        <div className = "input-group input-group-lg">
          <input type = "text" placeholder="Search..." style = {{marginTop:"40px"}} className = "form-control" onChange = {e => setQuery(e.target.value)} value={query} onKeyPress={search} />
        </div>
        {(typeof weather.main !== "undefined") ? (
          <div className = {weather.main.temp > 16 ? "container" : "container-cold"} style = {{borderRadius:"20px", height:"600px" ,margin:"100px 0px 100px 500px",maxWidth:"466px"}}>
            <div className = "details">
              <div className = "location-box">
                <div className = "location">{weather.name}, {weather.sys.country}</div>
                <div className = "date">{dateBuilder(new Date())}</div>
              </div>
              <div className = "weather-box">
                <div className = "temp">{Math.round(weather.main.temp)}° celsius</div>
                <div className = "weather">{weather.weather[0].main}</div>
              </div>
            </div>
          </div>
        ) : ("") }
      </main>
    </div>
  );
}

export default App;
