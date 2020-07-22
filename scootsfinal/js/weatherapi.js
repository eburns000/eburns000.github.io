function updateWeather(cityID) {

   const apiURLWeather = "https://api.openweathermap.org/data/2.5/weather?id=" + cityID + "&units=imperial&APPID=bf73773183abe1c64658214f3754e35c";
   const apiURLForecast = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&units=imperial&APPID=bf73773183abe1c64658214f3754e35c";

   fetch(apiURLWeather)
      .then((response) => response.json())
      .then((jsObject) => {

         // get weather elements
         let currentCondition = document.getElementById("current-condition");
         let currentTemp = document.getElementById("current-temp");
         let currentHumidity = document.getElementById("current-humidity");

         // fill weather elements from returned JSON object with weather data
         currentCondition.textContent = jsObject.weather[0].description;
         currentTemp.textContent = jsObject.main.temp;         
         currentHumidity.textContent = jsObject.main.humidity;

      });

      fetch(apiURLForecast)
         .then((response) => response.json())
         .then((jsObject) => {
   
            // get filtered array of forecast objects where the forecast time is 18:00:00
            let fiveDayForecast = jsObject.list.filter(forecast => forecast.dt_txt.includes("12:00:00"));
  
            // get forecast temp element
            const forecastTemp = document.getElementById("forecast-temp");
   
            // put 5th day forecast info on page from fiveDayForecast
            forecastTemp.textContent = fiveDayForecast[4].main.temp.toFixed(1);
   
         });

}

