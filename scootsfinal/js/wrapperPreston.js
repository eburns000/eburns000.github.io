function wrapper() {   

   // get date and time for footer - footerDateTime.js
   footerDateTime();

   // banner message pancake breakfast in Preston - bannerMsg.js
   postBanner();

   // set hamburger menu listener - toggleHamburger.js
   toggleHamburger();

   // city ID for Preston, Idaho
   const cityID = "5604473"

   // update weather summary
   // updateWeatherSummary(cityID);

   // update five day foreast
   // updateFiveDayForecast(cityID);

   // load town event data
   loadTownEvent("Preston");

}