  // Quake View handler
  export default class QuakesView {

    renderQuakeList(quakeList, listElement) {
      //build a list of the quakes...include the title and time of each quake then append the list to listElement. You should also add the id of the quake record as a data- property to the li. ie. <li data-id="">
      listElement.innerHTML = quakeList.features
      .map(quake => {
        return `<li class="quakes" data-id="${quake.id}">
  ${quake.properties.title}, ${new Date(
          quake.properties.time
        )}
  </li>`;
      })
      .join(' ');
    }

    renderQuake(quake, element) {
      const quakeProperties = Object.entries(quake.properties);
      // for the provided quake make a list of each of the properties associated with it. Then append the list to the provided element. Notice the first line of this method. Object.entries() is a slick way to turn an object into an array so that we can iterate over it easier! 
      
      // first clear out all prior tables 
      const existingTables = document.getElementsByTagName("table");
      for (let existingTable of existingTables) {
        existingTable.parentElement.removeChild(existingTable.parentElement.lastElementChild);
      }
      
      // create a table and add the properties to the table below the quake
      const table = document.createElement("table");

      quakeProperties.forEach(elem => {
        const tableRow = document.createElement("tr");
        tableRow.innerHTML = `        
        <td>${elem[0]}</td>
        <td>${elem[1]}</td>        
        `;
        table.appendChild(tableRow);
      });
      
      element.appendChild(table);
    }

  }