function loadTownData() {

   /****************************************
    * HOME - load town data
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

         towndata.forEach(town => {

            const nameCheck = town.name;

            if (nameCheck === "Preston" || nameCheck === "Soda Springs" || nameCheck === "Fish Haven") {

               // create card section
               let card = document.createElement('section');

               // create town data div and set class
               let townDataDiv = document.createElement('div');
               townDataDiv.classList.add('town-data');

               // create town imaeg div and set class
               let townImgDiv = document.createElement('div');
               townImgDiv.classList.add('town-img');

               // create the heading and append it to the card
               let name = document.createElement('h3');
               name.textContent = town.name;
               townDataDiv.appendChild(name);

               // create the motto div and append it to the element
               let motto = document.createElement('div');
               motto.textContent = town.motto;
               townDataDiv.appendChild(motto);

               // create the year founded para and append it to the element
               let yearFounded = document.createElement('p');
               yearFounded.textContent = "Year Founded: " + town.yearFounded;
               townDataDiv.appendChild(yearFounded);

               // create the population para and append it to the element
               let population = document.createElement('p');
               population.textContent = "Population: " + town.currentPopulation;
               townDataDiv.appendChild(population);

               // create the average rainfall para and append it to the element
               let averageRainfall = document.createElement('p');
               averageRainfall.textContent = "Annual Rainfall: " + town.averageRainfall;
               townDataDiv.appendChild(averageRainfall);

               // append townDataDiv to the Card
               card.appendChild(townDataDiv);

               // create the external image reference and append it to the element
               let image = document.createElement('img');
               image.setAttribute('src', "images/" + town.photo);
               image.setAttribute('alt', town.name);
               townImgDiv.appendChild(image);
               card.appendChild(townImgDiv);

               // add card to page - consider doing this before the loop so ou are only accessing the DOM once
               document.querySelector('div.cards').appendChild(card);

            }

         });

      });

}