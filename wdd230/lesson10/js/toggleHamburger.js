function toggleHamburger() {

   // toggle hamburger menu
   const hambutton = document.querySelector('.ham');
   const mainnav = document.querySelector('.main-nav');

   hambutton.addEventListener('click', () => {
      mainnav.classList.toggle('responsive')
   }, false);

}