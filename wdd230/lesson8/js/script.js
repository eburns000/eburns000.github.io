// script.js: script file for shermanpeakweather.com site

function wrapper() {

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


   // toggle hamburger menu
   const hambutton = document.querySelector('.ham');
   const mainnav = document.querySelector('.main-nav');

   hambutton.addEventListener('click', () => {
      mainnav.classList.toggle('responsive')
   }, false);

   /************************************
    * BANNER MESSAGE
    * Display banner message given day of week
    ************************************/
   let weekday = dt.getDay();
   if (weekday === 5) {

      // banner message
      let bannerMsg1 = "Saturday = Preston Pancakes in the Park!";
      let bannerMsg2 = "9:00 a.m. Saturday at the city park pavilion.";

      // create banner div and p elements and attach message to banner
      let bannerDiv = document.createElement("div");
      let bannerP = document.createElement("p");
      let node1 = document.createTextNode(bannerMsg1);
      let node2 = document.createElement("br");
      let node3 = document.createTextNode(bannerMsg2);
      bannerP.appendChild(node1);
      bannerP.appendChild(node2);
      bannerP.appendChild(node3);
      bannerDiv.appendChild(bannerP);
      bannerDiv.classList.add("banner");

      // insert banner at top of page
      let content = document.getElementById("content");
      content.insertBefore(bannerDiv, content.firstChild);

   }

   /******************************************************
    * LAZY LOAD IMAGES
    ******************************************************/
   // Create a node list of all of the image elements that have a data-src attribute
   const images = document.querySelectorAll('img[data-src]');

   // load data-src image into src image
   function loadImage(img) {
      const src = img.getAttribute('data-src');

      // double check we have a data-src attribute
      if (!src) {
         return;
      }

      // set the src attribute equal to the data-src attribute
      // and remove the data-src attribute  
      img.setAttribute('src', src);
      img.onload = () => {
         img.removeAttribute('data-src');
      };
   };

   // optional paramaters for observer
   const imgOptions = {
      threshold: 0,
      rootMargin: "0px 0px -200px 0px"
   };

   // if browser supports observer, then load images per options
   if ('IntersectionObserver' in window) {

      const imgObserver = new IntersectionObserver((entries, imgObserver) => {
         entries.forEach((entry) => {
            if (!entry.isIntersecting) {
               return;
            } else {
               loadImage(entry.target);
               imgObserver.unobserve(entry.target);
            }
         })
      }, imgOptions);

      // attach an observer to each img element in the node list
      images.forEach(image => {
         imgObserver.observe(image);
      });

   } else { // if IntersectionObserver is not supported, just load the images
      images.forEach((img) => {
         loadImage(img);
      });
   }

   /****************************************
    * FORM FUNCTIONS
    ***************************************/
   function adjustRating(rating) {
      document.getElementById("rating-value").innerHTML = rating;
   }

   const rating = document.getElementById("rating");
   rating.addEventListener('input', (event) => {
      adjustRating(event.target.value);
   });
   rating.addEventListener('change', (event) => {
      adjustRating(event.target.value);
   });

}