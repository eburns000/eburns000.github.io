function toggleHamburger() {

   // toggle hamburger menu
   const hambutton = document.querySelector('.ham');
   const mainnav = document.querySelector('.main-nav');
   const container = document.querySelector('.container');

   hambutton.addEventListener('click', () => {
      mainnav.classList.toggle('responsive');
      container.classList.toggle('container-responsive');
   }, false);

}