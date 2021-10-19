import UserModel from './HtpUserModel.js';

export default class AddUserController {

  constructor() {
    this.myUserModel = new UserModel();
    this.btnAddUser = document.getElementById('btn-adduser');
  }

  appInit() {
    this.myUserModel.loadLocalData();
    this.addOneTimeListeners();
    console.log("AddUserController Initialized");
  }

  addOneTimeListeners() {
    this.btnAddUser.addEventListener('click', () => {
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const first = document.getElementById('first').value;
      const last = document.getElementById('last').value;
      const phone = document.getElementById('phone').value;
      const clinic = document.getElementById('clinic').value;
      const accountType = document.getElementById('account-type').value;
      const therapist = document.getElementById('therapist').value;
      const newUser = this.myUserModel.createUser(email, password, first, last, phone, clinic, accountType, therapist);
      this.myUserModel.getUsers().push(newUser);
      this.myUserModel.saveLocalData();
      document.location = './users.html';
    });
  }
}