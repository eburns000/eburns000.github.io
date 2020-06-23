function wrapper() {

   const requestURL = 'https://byui-cit230.github.io/lessons/lesson-09/data/latter-day-prophets.json';
   
   fetch(requestURL)
   .then(function (response) {
      return response.json();
   })
   .then(function (jsonObject) {
      console.table(jsonObject);
      const prophets = jsonObject['prophets'];
      console.log(prophets);

      const numElements = prophets.length;
      
      for (i = 0; i < numElements; i++) {
         // create card element
         let card = document.createElement('section');
         
         // create the heading and append it to the card
         let h2 = document.createElement('h2');
         h2.textContent = prophets[i].name + ' ' + prophets[i].lastname;
         card.appendChild(h2);

         // create the birthdate para and append it to the element
         let pDate = document.createElement('p');
         pDate.textContent = "Date of Birth: " + prophets[i].birthdate;
         card.appendChild(pDate);

         // create the birthplace para and append it to the element
         let pPlace = document.createElement('p');
         pPlace.textContent = "Place of Birth: " + prophets[i].birthplace;
         card.appendChild(pPlace);

         // create the external image reference and append it to the element
         let image = document.createElement('img');
         image.setAttribute('src', prophets[i].imageurl);
         image.setAttribute('alt', h2.textContent + " - " + prophets[i].order);
         card.appendChild(image);

         // add card to page
         document.querySelector('div.cards').appendChild(card);
      }

      // question for the forum - in JS, does setting the numElements first make a performance 
      // difference?

   });

   // explain the above function in the forum
   // see https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
   // explain that response => response.json() is the same as
   // (response) => {return response.json();}; is the same thing as
   // function (response) {return response.json();};
   // "then" is just a method, and the parameter is a response and an object that is returned
   // by the anonymous functions

}