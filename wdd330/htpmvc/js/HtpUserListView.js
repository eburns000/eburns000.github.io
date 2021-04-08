class UserListView {

  renderUserList(parentElement, myUserList) {
    // clear user list
    parentElement.innerHTML = "";
    myUserList.forEach(user => this.renderUser(parentElement, user));
  }

  renderUser(parentElement, user) {
    let userSection = document.createElement('section');
    userSection.classList.add('card-section');
    console.log(user.getUserid());
    userSection.id = user.getUserid();
    userSection.innerHTML = `
      <div class="card-section-left">
        <div class="equipment-img">
          <img src="images/people.png" alt="person icon">
        </div>
        <div class="equipment-data">
          <h3>${user.getFirst()} ${user.getLast()}</h3>              
        </div>
      </div>
      <div class="card-section-right">
        <p class="status">Active</p>
        <p class="account-type">${user.getAccountType()}</p>
        <p class="clinic">${user.getClinic()}</p>
      </div>`;
    parentElement.appendChild(userSection);
  }
}

export default UserListView;