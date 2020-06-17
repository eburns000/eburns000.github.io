/****************************************
 * COMPUTE AND RETURN WIND CHILL
 ****************************************/

// get high temp and wind speed
let t = parseFloat(document.getElementById("summary-high").textContent);
let s = parseFloat(document.getElementById("summary-windspeed").textContent);

// calculate wind chill factor in terms of Fahrenheit
let windChill = "N/A";

if ( t <= 50 && s > 3 ) {
   let sPow = Math.pow(s, 0.16); // Example Math.pow(7, 2); // 49
   windChill = Math.round(35.74 + (0.6215 * t) - (35.75 * sPow) + (0.4275 * t * sPow)) + " " + String.fromCharCode(8457);
}

// set wind chill value in weather summary
document.getElementById("summary-windchill").textContent = windChill;