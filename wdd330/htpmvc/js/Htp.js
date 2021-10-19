import AddToLibraryController from './HtpAddToLibraryController.js';
import AddUserController from './HtpAddUserController.js';

// load controllers
const myAddToLibraryController = new AddToLibraryController();
const myAddUserController = new AddUserController();

const fileName = location.pathname.split("/").slice(-1)[0];
console.log("filename: ", fileName);

// load init pages
window.addEventListener('load', () => {

  switch (fileName) {
    case 'addtolibrary.html':
      myAddToLibraryController.appInit();
      break;
    case 'adduser.html':
      myAddUserController.appInit();
      break;
    case 'assignexercise.html':
      break;
    case 'assignment.html':
      break;
    case 'client-exercises.html':
      break;
    case 'index.html':
      break;
    case 'library.html':
      break;
    case 'my-clients.html':
      break;
    case 'my-exercises':
      break;
    case 'users.html':
      break;      
    default:
      // code block
  }

});