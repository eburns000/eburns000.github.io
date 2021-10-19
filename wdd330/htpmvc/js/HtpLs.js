// Local Storage Utilities
// create a ls class, that you can use as a namspace for accessing ls functions

function logout(page){
  window.localStorage.removeItem('activeUser');
  window.localStorage.removeItem('activeClient');
  window.localStorage.removeItem('activeClientName');
  document.location=page;
}



