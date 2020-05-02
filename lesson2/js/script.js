// script.js: script file for design-principles.html

// get date document was last modified and update datetime span
const dt = new Date(document.lastModified);
const dateOptions = {
   year: 'numeric',
   month: '2-digit',
   day: '2-digit'
};
const timeOptions = {
   hour: '2-digit',
   minute: '2-digit',
   second: '2-digit',
   hour12: false
};
document.getElementById("datetime").textContent = dt.toLocaleDateString('en-US', dateOptions) + " " + dt.toLocaleTimeString('en-US', timeOptions);

// get current year and update currentyear span
const cy = new Date();
document.getElementById("currentyear").textContent = cy.toLocaleString('en-US', {year: 'numeric'});
