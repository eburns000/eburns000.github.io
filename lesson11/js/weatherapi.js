function updateFiveDayForecast() {

   const apiURLWeather = "https://api.openweathermap.org/data/2.5/weather?id=5604473&units=imperial&APPID=bf73773183abe1c64658214f3754e35c";

   fetch(apiURLWeather)
      .then((response) => response.json())
      .then((jsObject) => {

         // get weather summary elements
         let currentCondition = document.getElementById("summary-current-condition");
         let highTemp = document.getElementById("summary-high");
         let windChill = document.getElementById("summary-windchill");
         let humidity = document.getElementById("summary-humidity");
         let windSpeed = document.getElementById("summary-windspeed");

         // fill weather summary elements from returned JSON object with weather data
         currentCondition.textContent = jsObject.weather[0].description;
         highTemp.textContent = jsObject.main.temp_max;
         windChill.textContent = calcWindChill(jsObject.main.temp_max, jsObject.wind.speed);
         humidity.textContent = jsObject.main.humidity;
         windSpeed.textContent = jsObject.wind.speed;

      });

}

function updateWeatherSummary() {

   const apiURLForecast = "https://api.openweathermap.org/data/2.5/forecast?id=5604473&units=imperial&APPID=bf73773183abe1c64658214f3754e35c";

   fetch(apiURLForecast)
      .then((response) => response.json())
      .then((jsObject) => {

         // get filtered array of forecast objects where the forecast time is 18:00:00
         let fiveDayForecast = jsObject.list.filter(forecast => forecast.dt_txt.includes("18:00:00"));

         // get array of forecast temp elements 
         const forecastTemp = document.getElementsByClassName("forecast-temp");
         const forecastDay = document.getElementsByClassName("table-head");
         const forecastImg = document.getElementsByClassName("forecast-img");

         // put forecast cast info on page from fiveDayForecast, including temp, day, and icon
         for (let i = 0; i < fiveDayForecast.length; i++) {
            forecastTemp[i].textContent = fiveDayForecast[i].main.temp.toFixed(1);
            forecastDay[i].textContent = getWeekDay(new Date(fiveDayForecast[i].dt_txt));
            forecastImg[i].setAttribute('src', "https://openweathermap.org/img/w/" + fiveDayForecast[i].weather[0].icon + ".png");
            forecastImg[i].setAttribute('alt', fiveDayForecast[i].weather[0].description);
         }

      });

}