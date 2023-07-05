//принимает на вход имя и статус
export default class UserInfo {
  constructor(name, about) {
    this._userName = name;
    this._userStatus = about;
    this._currentAvatar = document.querySelector('.profile__avatar');
  }
  //создает объект, в который записываем принятые в объект имя и статус
  getUserInfo() {
    const currentUserInfo = {
      name: this._userName.textContent,
      about: this._userStatus.textContent,
    }
    return currentUserInfo;
  }

  //публичный метод замены аватара
  changeAvatar(res) {
    this._currentAvatar.src = res.avatar;
  }

  //принимает !объект!, значения которого записывает в принятые в конструтор класса UserInfo имя и статус
  //то есть связывает принятые в класс значания со значениями, принятыми в метод setUserInfo
  setUserInfo(userInfo) {
    this._userName.textContent = userInfo.name;
    this._userStatus.textContent = userInfo.about;
  }

}
