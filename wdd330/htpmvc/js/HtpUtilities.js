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

// use this for init - move data to a JSON file
export function getJSON(url) {
  return fetch(url)
      .then(function(response) {
          if (!response.ok) {
              throw Error(response.statusText);
          } else {
              return response.json();
          }
      })
      .catch(function(error) {
          console.log(error);
      });
}
