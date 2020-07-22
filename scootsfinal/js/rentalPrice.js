function loadRentalPrices() {

    // get json data
    const jsonFile = 'https://eburns000.github.io/scootsfinal/data/rentalprices.json';

    fetch(jsonFile)
        .then(function (response) {
            return response.json();
        })
        .then(function (jsonObject) {

            // get array of rental price objects from json data
            const rentalPriceData = jsonObject['rentalPrices'];

            console.log(rentalPriceData);

            // get array of rental price ul elements
            rentalPriceLists = document.getElementsByClassName("rental-price");
            console.log(rentalPriceLists);

            for (let i = 0; i < rentalPriceData.length; i++) {

                // set each ul element with data from json object
                rentalPriceLists[i].children[1].textContent = rentalPriceData[i].equipment;
                rentalPriceLists[i].children[2].textContent = rentalPriceData[i].riders;
                rentalPriceLists[i].children[3].textContent = rentalPriceData[i].threeHourReservation;
                rentalPriceLists[i].children[4].textContent = rentalPriceData[i].fullDayReservation;                
                rentalPriceLists[i].children[5].textContent = rentalPriceData[i].threeHourWalkIn;
                rentalPriceLists[i].children[6].textContent = rentalPriceData[i].fullDayWalkIn;

            }

        });

}