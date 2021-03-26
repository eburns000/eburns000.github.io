// array of links
const links = [{
    label: "Week 01 Notes & Exercises",
    url: "wdd330/week01/index.html"
}, {
    label: "Week 02 Notes & Exercises",
    url: "wdd330/week02/index.html"
}, {
    label: "Week 03 Notes & Exercises",
    url: "wdd330/week03/index.html"
}, {
    label: "Week 04 Notes & Exercises",
    url: "wdd330/week04/index.html"
}, {
    label: "Week 05 Notes & Exercises",
    url: "wdd330/week05/index.html"
}, {
    label: "Week 06 Midterm Checkin",
    url: "wdd330/week06/index.html"
}, {
    label: "Week 07 Notes & Exercises",
    url: "wdd330/week07/index.html"
}, {
    label: "Week 08 Notes & Exercises",
    url: "wdd330/week08/index.html"
}, {
    label: "Week 09 Notes & Exercises",
    url: "wdd330/week09/index.html"
}, {
    label: "Week 10 Notes & Exercises",
    url: "wdd330/week10/index.html"
}, {
    label: "Week 11 Team Activity",
    url: "wdd330/week11/client/week11.html"
}]

function wrapper() {
    // update links
    for (let i = 0; i < links.length; i++) {

        // create the li element to hold the anchor tag
        let li = document.createElement('li');
        li.classList.add("main-li");

        // create the anchor tag with the url reference and label and append it to the li element
        let a = document.createElement('a');
        a.setAttribute('href', links[i].url);
        a.textContent = links[i].label;
        li.appendChild(a);

        // append the li element to the links ol element
        document.querySelector('ul.links').appendChild(li);
    }
}