function logout(page){
  window.localStorage.removeItem('activeUser');
  window.localStorage.removeItem('activeClient');
  window.localStorage.removeItem('activeClientName');
  document.location=page;
}

