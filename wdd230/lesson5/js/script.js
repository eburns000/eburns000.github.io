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

   /* another method - just a personal note */
   /* I could have used this easier method, but I wanted to
      experiement with the create element and create text node methods */
   /* let myBanner = document.querySelector(".my-banner");
   myBanner.style.display = "block"; */
   
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

}