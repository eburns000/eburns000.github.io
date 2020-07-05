function loadTownEvent(myTown) {

   /****************************************
    * HOME - load town event data
    ****************************************/
   const requestURL = 'https://byui-cit230.github.io/weather/data/towndata.json';

   fetch(requestURL)
      .then(function (response) {
         return response.json();
      })
      .then(function (jsonObject) {

         const towndata = jsonObject['towns'];

         towndata.forEach(town => {

            if (town.name === myTown) {

               // create town data div and set class
               let townEventDiv = document.createElement('div');
               townEventDiv.classList.add('town-data');

               // create the heading and append it to the card
               let h3 = document.createElement('h3');
               h3.textContent = "Upcoming Events";
               townEventDiv.appendChild(h3);

               // get array of events, loop through and append event elements
               let events = town.events;
               let eventUL = document.createElement('ul');

               for (let i = 0; i < events.length; i++ ) {
                  let eventLI = document.createElement('li');
                  eventLI.textContent = events[i];
                  eventUL.appendChild(eventLI);
               }

               townEventDiv.appendChild(eventUL);

               // add card to page - consider doing this before the loop so ou are only accessing the DOM once
               document.querySelector('div.cards').appendChild(townEventDiv);

            }

         });

      });

}