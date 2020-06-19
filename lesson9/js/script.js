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
    * FORM FUNCTIONS - PUT IN SEPARATE SCRIPT TO RUN ONLY ON STORMCENTER PAGE - EB TODO
    ***************************************/
   // function adjustRating(rating) {
   //    document.getElementById("rating-value").innerHTML = rating;
   // }

   // const rating = document.getElementById("rating");
   // rating.addEventListener('input', (event) => {
   //    adjustRating(event.target.value);
   // });
   // rating.addEventListener('change', (event) => {
   //    adjustRating(event.target.value);
   // });

   /****************************************
    * LOAD TOWN INFO INTO CARDS
    ****************************************/
   const requestURL = 'https://byui-cit230.github.io/weather/data/towndata.json';

   fetch(requestURL)
      .then(function (response) {
         return response.json();
      })
      .then(function (jsonObject) {
         console.table(jsonObject);
         const towndata = jsonObject['towns'];
         console.log(towndata);

         towndata.forEach (town => {

            const nameCheck = town.name;

            if (nameCheck === "Preston" || nameCheck === "Soda Springs" || nameCheck === "Fish Haven") {

               // create card element
               let card = document.createElement('section');

               // create the heading and append it to the card
               let name = document.createElement('h3');
               name.textContent = town.name;
               card.appendChild(name);

               // create the motto div and append it to the element
               let motto = document.createElement('div');
               motto.textContent = town.motto;
               card.appendChild(motto);

               // create the year founded para and append it to the element
               let yearFounded = document.createElement('p');
               yearFounded.textContent = "Year Founded: " + town.yearFounded;
               card.appendChild(yearFounded);

               // create the population para and append it to the element
               let population = document.createElement('p');
               population.textContent = "Population: " + town.currentPopulation;
               card.appendChild(population);

               // create the average rainfall para and append it to the element
               let averageRainfall = document.createElement('p');
               averageRainfall.textContent = "Annual Rainfall: " + town.averageRainfall;
               card.appendChild(averageRainfall);

               // create the external image reference and append it to the element
               let image = document.createElement('img');
               image.setAttribute('src', "images/" + town.photo);
               image.setAttribute('alt', town.name);
               card.appendChild(image);

               // add card to page - consider doing this before the loop so ou are only accessing the DOM once
               document.querySelector('div.cards').appendChild(card);

            }

         });

      });

}