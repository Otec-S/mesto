export default class UserInfo {
  constructor(name, link) {
      this._userName = name;
      this._userStatus = link;

      //уже имеющиеся в профиле имя и статус
      // this._currentName = document.querySelector('.profile__title');
      // this._currentStatus = document.querySelector('.profile__subtitle');
    }

    // d.	Содержит публичный метод getUserInfo (вебинар примерно 1:50:00), который возвращает объект с данными пользователя.

    //Этот метод пригодится, когда данные пользователя нужно будет ПОДСТАВИТЬ в форму при открытии.

    //есть метод getUserInfo который возвращает текущие значения из разметки. то есть textContent свойство двух УЖЕ ИМЕЮЩИХСЯ В РАЗМЕТКЕ элементов в виде объекта

    // _getInputValues() {
    //   //создаем объект с данными обоих универсальных полей формы
    //   const cardData = {
    //     name: this._nameInput.value,
    //     link: this._nameStatus.value,
    //   }
    //   return cardData;
    // }


    getUserInfo() {
      const currentUserInfo = {
        name: this._userName.textContent,
        link: this._userStatus.textContent,
      }
      return currentUserInfo;
    }


    // e.	Содержит публичный метод setUserInfo, который принимает новые данные пользователя и добавляет их на страницу.

    //setUserInfo - получает объект с ключами и устанавливает их в разметку (то есть делает наоборот в отличие от getUserInfo)

    setUserInfo(infoObject) {
      // this._currentName.textContent = userInfo.name;
      // this._currentStatus.textContent = userInfo.link;
      this._userName.textContent = infoObject.name;
      this._userStatus.textContent = infoObject.link;
    }


  }
