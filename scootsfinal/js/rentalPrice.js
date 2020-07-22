// function loadJSON(callback) {

//     var xobj = new XMLHttpRequest();
//     xobj.overrideMimeType("application/json");
//     xobj.open('GET', 'rentalprices.json', true);
//     xobj.onreadystatechange = function () {
//         if (xobj.readyState == 4 && xobj.status == "200") {
//             callback(xobj.responseText);
//         }
//     };
//     xobj.send(null);
// }

function loadRentalPrices() {

    // get array of rental price ul elements
    rentalPriceLists = document.getElementsByClassName("rental-price");
    console.log(rentalPriceLists);

    const jsonFile = 'https://eburns000.github.io/scootsfinal/data/rentalprices.json';

    fetch(jsonFile)
        .then(function (response) {
            return response.json();
        })
        .then(function (jsonObject) {

            const rentalPriceData = jsonObject['rentalPrices'];

            console.log(rentalPriceData);

        });


    // loadJSON(function (response) {
    //     // Parse JSON string into object
    //     let actual_JSON = JSON.parse(response);
    //     console.log(actual_JSON);
    // });

}