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

               // get array of events, loop through and append event elements
               let events = town.events;
               let eventBlockUL = document.createElement('ul');

               for (let i = 0; i < events.length; i++ ) {
                  let eventLI = document.createElement('li');
                  eventLI.innerHTML = "<span>&#9728;</span> " + events[i];
                  eventBlockUL.appendChild(eventLI);
               }

               // make a copy of eventUL to append to events-callout
               let eventsCalloutUL = eventBlockUL.cloneNode(true);

               // add card to callout and block              
               document.querySelector('div.events-block').appendChild(eventBlockUL);
               document.querySelector('div.events-callout').appendChild(eventsCalloutUL);               

            }

         });

      });

}