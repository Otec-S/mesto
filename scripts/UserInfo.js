export default class UserInfo {
  constructor({ userName, userStatus }) {
    this._userName = userName;
    this._userStatus = userStatus;

    //уже имеющиеся в профиле имя и статус
    this._currentName = document.querySelector('.profile__title');
    this._currentStatus = document.querySelector('.profile__subtitle');
  }

  // d.	Содержит публичный метод getUserInfo (вебинар примерно 1:50:00), который возвращает объект с данными пользователя. Этот метод пригодится, когда данные пользователя нужно будет подставить в форму при открытии.

  //есть метод getUserInfo который возвращает текущие значения из разметки. то есть textContent свойство двух элементов в виде объекта

  getUserInfo() {
    const currentUserInfo = {
      userName: this._currentName.textContent,
      userStatus: this._currentStatus.textContent
    }
    return currentUserInfo;
  }

  // e.	Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.

  //setUserInfo - получает объект с ключами и устанавливает их в разметку (то есть делает наоборот в отличие от getUserInfo)

  setUserInfo() { }


}
