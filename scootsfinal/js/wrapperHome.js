function wrapper() {

   // get date and time for footer - footerDateTime.js
   footerDateTime();

   // set hamburger menu listener - toggleHamburger.js
   toggleHamburger();

   // load town data  - loadTownData.js
   // loadTownData();

   // city ID for Cozumel, Mexico
   const cityID = "3530103"

   // update weather summary
   updateWeather(cityID);

}