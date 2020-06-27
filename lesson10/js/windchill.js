/****************************************
 * COMPUTE AND RETURN WIND CHILL
 ****************************************/
function calcWindChill(highTemp, windSpeed) {

// calculate wind chill factor in terms of Fahrenheit
let windChill = "N/A";

if ( highTemp <= 50 && windSpeed > 3 ) {
   let sPow = Math.pow(windSpeed, 0.16); // Example Math.pow(7, 2); // 49
   windChill = Math.round(35.74 + (0.6215 * highTemp) - (35.75 * sPow) + (0.4275 * highTemp * sPow)) + " " + String.fromCharCode(8457);
}

return windChill;

}

