function stormRating() {

   /****************************************
    * STORM CENTER rating function
    ***************************************/
   const rating = document.getElementById("rating");

   if (rating) {

      function adjustRating(rating) {
         document.getElementById("rating-value").innerHTML = rating;
      }

      rating.addEventListener('input', (event) => {
         adjustRating(event.target.value);
      });

      rating.addEventListener('change', (event) => {
         adjustRating(event.target.value);
      });

   }

}