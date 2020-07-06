function wrapper() {   

   // get date and time for footer - footerDateTime.js
   footerDateTime();

   // banner message pancake breakfast in Preston - bannerMsg.js
   postBanner();

   // set hamburger menu listener - toggleHamburger.js
   toggleHamburger();

   // city ID for Garden City, Idaho as a proxy for Fish Haven, Idaho
   const cityID = "5593814"

   // update weather summary
   updateWeatherSummary(cityID);

   // update five day foreast
   updateFiveDayForecast(cityID);
   
   // load town event data
   loadTownEvent("Fish Haven");

}