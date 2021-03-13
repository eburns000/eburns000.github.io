import { getLocation } from './utilities.js';
import Quake from './Quake.js';
import QuakesView from './QuakesView.js';

// Quake controller
export default class QuakesController {

  constructor(parent, position = null) {
    this.parent = parent;
    // sometimes the DOM won't exist/be ready when the Class gets instantiated, so we will set this later in the init()
    this.parentElement = null;
    // let's give ourselves the option of using a location other than the current location by passing it in.
    this.position = position || {
      lat: 0,
      lon: 0
    };
    // this is how our controller will know about the model and view...we add them right into the class as members.
    this.quakes = new Quake();
    this.quakesView = new QuakesView();
  }

  async init() {
    // use this as a place to grab the element identified by this.parent, do the initial call of this.initPos(), and display some quakes by calling this.getQuakesByRadius()
    console.log("init method called");
    this.parentElement = document.querySelector(this.parent);
    await this.initPos();
    document.getElementById("radius").addEventListener('change', e => {
      this.getQuakesByRadius(e.target.value);
    });
    this.getQuakesByRadius(document.getElementById("radius").value);

    // adds event listener to each child of the parent element through propagation - works even with radius
    // selectable and changable by the user
    this.parentElement.addEventListener('click', e => {
      this.getQuakeDetails(e.target.dataset.id);
    });
  }

  async initPos() {
    // if a position has not been set
    if (this.position.lat === 0) {
      try {
        // try to get the position using getLocation()
        const location = getLocation( position => {
          this.position.lat = position.coords.latitude;
          this.position.lon = position.coords.longitude;
        });
        console.log(location);      
     
        
      } catch (error) {
        console.log(error);
      }
    }
  }

  async getQuakesByRadius(radius = 100) {
    // this method provides the glue between the model and view. Notice it first goes out and requests the appropriate data from the model, then it passes it to the view to be rendered.
    //set loading message
    this.parentElement.innerHTML = "<li>Loading...</li>";
    // get the list of quakes in the specified radius of the location
    const quakeList = await this.quakes.getEarthQuakesByRadius(
      this.position,
      radius
    );
    // render the list to html
    this.quakesView.renderQuakeList(quakeList, this.parentElement);
    // add a listener to the new list of quakes to allow drill down in to the details
    // adding it here meant that each time this was called, it would add the event listener again, which would call
    // the listener each time the radius was selected. 
    // I moved it to the init() method instead, so the listener is only attached once.
    // interestingly, each time the radius is refreshed, which calls this function, it is not necessary
    // to reset the event listener for each quake. This seems to be happening automatically 
    // because the original listener was added to the parent element, and each element is "updated" 
    // with an event listener through propragation. That, or the event listener is really only on the parent,
    // but each child element can trigger the event listener through bubbling. That is probably a better explanation
 
  }

  async getQuakeDetails(quakeId) {
    // get the details for the quakeId provided from the model, then send them to the view to be displayed
    console.log("quakeID: ", quakeId);
    const quake = this.quakes.getQuakeById(quakeId);
    console.log("getQuakeDetails - quake: ", quake);
    const element = document.querySelector(`[data-id="${quakeId}"]`);
    this.quakesView.renderQuake(quake, element);
  }
}