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

  setUserInfo(infoObject) {
    this._userName.textContent = infoObject.name;
    this._userStatus.textContent = infoObject.link;
  }

}
