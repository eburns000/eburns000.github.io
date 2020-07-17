/******************************************************
 * LAZY LOAD IMAGES - GALLERY
 ******************************************************/
function loadGallery() {

   // Create a node list of all of the image elements that have a data-src attribute
   const images = document.querySelectorAll('img[data-src]');

   // load data-src image into src image
   function loadImage(img) {
      const src = img.getAttribute('data-src');

      // double check we have a data-src attribute
      if (!src) {
         return;
      }

      // set the src attribute equal to the data-src attribute
      // and remove the data-src attribute  
      img.setAttribute('src', src);
      img.onload = () => {
         img.removeAttribute('data-src');
      };
   };

   // optional paramaters for observer
   const imgOptions = {
      threshold: 0,
      rootMargin: "0px 0px -200px 0px"
   };

   // if browser supports observer, then load images per options
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

}