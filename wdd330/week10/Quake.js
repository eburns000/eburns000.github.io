import { getJSON } from './utilities.js';

// Quake Model
export default class Quake {

  constructor() {
    this.baseUrl =
      'https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2019-01-01&endtime=2019-03-02';
    
      // this is where we will store the last batch of retrieved quakes in the model.  I don't always do this...in this case the api doesn't have an endpoint to request one quake.
    this._quakes = [];
  }

  async getEarthQuakesByRadius(position, radius = 100) {
    // use the getJSON function and the position provided to build out the correct URL to get the data we need.  Store it into this._quakes, then return it
    const url = `${this.baseUrl}&latitude=${position.lat}&longitude=${position.lon}&maxradiuskm=${radius}`;
    
    this._quakes = await getJSON(url); // note that we did not have "await" before, and this was necessary to assign to this._quakes - otherwise this._quakes and this._quakes.features were both undefined
    console.log("this_quakes: ", this._quakes);
    console.log("features: ", this._quakes.features);
    return this._quakes;
  }

  getQuakeById(id) {
    // filter this._quakes for the record identified by id and return it      
    return this._quakes.features.filter(item => item.id === id)[0];
  }

}