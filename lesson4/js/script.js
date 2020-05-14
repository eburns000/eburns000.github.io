// script.js: script file for design-principles.html

function wrapper() {

// get date document was last modified and update datetime span
const dt = new Date(document.lastModified);
const dateOptions = {
   weekday: 'long',
   year: 'numeric',
   month: 'long',
   day: '2-digit'
};
document.getElementById("datetime").textContent = dt.toLocaleDateString('en-GB', dateOptions);

// get current year and update currentyear span
const cy = new Date();
document.getElementById("currentyear").textContent = cy.toLocaleString('en-US', {
   year: 'numeric'
});

// toggle hamburger menu
const hambutton = document.querySelector('.ham');
const mainnav = document.querySelector('.main-nav');

hambutton.addEventListener('click', () => {
   mainnav.classList.toggle('responsive')
}, false);

}