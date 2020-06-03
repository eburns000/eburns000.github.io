// lazyload.js: script file for lazyload activity

function wrapper() {

   /******************************************************
    * LAZY LOADING - FUNCTION TO CHANGE ATTRIBUTE
    * Lazy Load the images by adding an onload event
    * listener to each image
    * Use CSS to transition from a blurred placeholder to the 
    * actual image - see CSS
    * THIS FIRST SECTION IS FOR PERSONAL NOTES ONLY
    * FOR DEMO OF LAZY LOADING USING INTERSECTION OBSERVER
    * PLEASE SEE NEXT SECTION
    * ****************************************************/

   // Create a node list of all of the image elements that have a data-src attribute
   // let imagesToLoad = document.querySelectorAll('img[data-src]');
   // console.log(imagesToLoad);

   // function: for the img element passed into the function, set the 
   // src attribute equal to the data-src attribute
   // set an onload event listener to each image element that removes
   // the data-src attribute upon loading
   // const loadImages = (image) => {
   //    image.setAttribute('src', image.getAttribute('data-src'));
   //    image.onload = () => {
   //       image.removeAttribute('data-src');
   //    };
   // };

   // loop through each image element in the imagesToLoad node list
   // call the load images function to set the data-src attribute to 
   // the src attribute
   // imagesToLoad.forEach((img) => {
   //    loadImages(img);
   // });

   /******************************************************
    * LAZY LOADING - INTERSECT OBSERVER INSTANCE
    * https://www.youtube.com/watch?v=mC93zsEsSrg
    * https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Loading
    ******************************************************/
   // Create a node list of all of the image elements that have a data-src attribute
   const images = document.querySelectorAll('img[data-src]');

   // function to get the data-src attribute, apply it to the src 
   // attribute, and remove the data-src attribute
   // removing the data-src attribute coincides with the css transition
   // that applies when the img element changes to an element with
   // a data-src attribute to an img element that does not have a data-src
   // attribute, and hence from a blur of .2em to 0em - see CSS
   // this function gets called when the observer "observes" that the 
   // observed "entries" are now intersecting - see more about entries below
   function loadImage(img) {
      const src = img.getAttribute('data-src');

      // double check we have a data-src attribute
      if (!src) {
         return;
      }

      // set the src attribute equal to the data-src attribute
      // and remove the data-src attribute onload so our css transition
      // can do it's thing      
      img.setAttribute('src', src);
      img.onload = () => {img.removeAttribute('data-src');};
   };

   // optional paramaters for observer
   // example, set a visual placeholder for each image before it loads
   // also set a value to load the images just before they come into view
   // note the rootMargin rule defines distance off screen where intersection is
   // const imgOptions = {
   // threshold: 0,
   // rootMargin: "0px 0px 300px 0px" 
   // };
   // for this example, I am not using options because I want to see the
   // transition for demonstration purposes
   const imgOptions = {};

   // note: what is "entries"?
   // By creating an imgObserver object, we now can "attach" any elements/nodes
   // to, presumably, an array/list within the observer object, calling it what
   // we want, in this case "entries", which we can then iterate through
   // For each "entry", which is an element we've set to observe, that is
   // intersecting, presumably within the viewport, then we call the 
   // loadImage function, which sets the src attribute
   // But first, we only want to use the Intersection Observer if
   // is supported; otherwise, just load all of the images
   if ('IntersectionObserver' in window) {
      
      const imgObserver = new IntersectionObserver((entries, imgObserver) => {
         entries.forEach((entry) => {
            if (!entry.isIntersecting) {
               return;
            } else {
               loadImage(entry.target);
               imgObserver.unobserve(entry.target);
            }
         })
      }, imgOptions);

      // attach an observer to each img element in the node list
      images.forEach(image => {
         imgObserver.observe(image);
      });

   } else { // if IntersectionObserver is not supported, just load the images
      images.forEach((img) => {
         loadImage(img);
      });
   }

   /***********************************************************
    * DATE TIME FOR FOOTER
    * *********************************************************/
   // get current date for currentyear span and datetime span
   const dt = new Date();

   // update currentyear span
   document.getElementById("currentyear").textContent = dt.toLocaleString('en-US', {
      year: 'numeric'
   });

   // display current date in datetime span in "Weekday, Day Month Year" format, as in Monday, 18 May 2020
   const dateOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: '2-digit'
   };
   document.getElementById("datetime").textContent = dt.toLocaleDateString('en-GB', dateOptions);

}