function logout(page){
  window.localStorage.removeItem('activeUser');
  document.location=page;
}