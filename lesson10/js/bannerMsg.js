/************************************
 * BANNER MESSAGE
 * Display banner message given day of week
 ************************************/
function postBanner() {

   const bannerDate = new Date();
   let weekday = bannerDate.getDay();
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

}

