function wrapper() {

   /***********************************************************
    * DATE TIME FOR FOOTER
    * *********************************************************/
   // get current date for currentyear span and datetime span
   const dt = new Date();

   // update currentyear span
   document.getElementById("currentyear").textContent = dt.toLocaleString('en-US', {
      year: 'numeric'
   });

   // display current date in datetime span in "Weekday, Day Month Year" format, as in Monday, 18 May 2020
   const dateOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: '2-digit'
   };
   document.getElementById("datetime").textContent = dt.toLocaleDateString('en-GB', dateOptions);

}