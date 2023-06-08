export default class UserInfo {
  constructor(name, link) {
    this._userName = name;
    this._userStatus = link;
  }

  getUserInfo() {
    const currentUserInfo = {
      name: this._userName.textContent,
      link: this._userStatus.textContent,
    }
    return currentUserInfo;
  }

  setUserInfo(userInfo) {
    this._userName.textContent = userInfo.name;
    this._userStatus.textContent = userInfo.link;
  }

}
