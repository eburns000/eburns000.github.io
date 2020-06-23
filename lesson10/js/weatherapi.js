function wrapper() {

   /***********************************************************
    * WEATHER API
    * *********************************************************/
   const apiURL = "http://api.openweathermap.org/data/2.5/weather?id=5604473&units=imperial&APPID=bf73773183abe1c64658214f3754e35c";
   
   fetch(apiURL)
   .then((response) => response.json())
   .then((jsObject) => {
      console.log(jsObject);
      
      // get current temp
      let currentTemp = document.getElementById("current-temp");
      currentTemp.textContent = jsObject.main.temp;

      // get icon
      const imagesrc = 'https://openweathermap.org/img/w/' + jsObject.weather[0].icon + '.png';
      const desc = jsObject.weather[0].description;
      document.getElementById('imagesrc').textContent = imagesrc;
      document.getElementById('icon').setAttribute('src', imagesrc);
      document.getElementById('icon').setAttribute('alt', desc);

   });








}