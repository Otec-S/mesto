export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
    this._authorization = config.headers.authorization;
  }

  //вспомогательный метод
  _handleResponse(res) {
    if (res.ok) { return res.json() }
    else { return Promise.reject(`Ошибка: ${res.status}`) }
  };

  getCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._authorization,
        'Content-type': 'application/json'
      }
    })
      .then(this._handleResponse);
  }

  //отправляет запрос на добавление карточки на сервер
  setCard(newCardName, newCardLink) {
    return fetch(`${this._url}/cards`, {
      method: 'POST',
      headers: {
        authorization: this._authorization,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        name: newCardName,
        link: newCardLink
      })
    })
      .then(this._handleResponse);
  }

  getUserId() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._authorization,
        'Content-type': 'application/json'
      }
    })
      .then(this._handleResponse);
  }

  //принимает имя и статус и отправляет его на сервер
  setUserId(newUserName, newUserStatus) {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: newUserName,
        about: newUserStatus
      })
    })
      .then(this._handleResponse);
  }

  getAppInfo() {
    //возвращаю массив промисов. Первыми - карточки, вторым запрос к информации о пользователе
    return Promise.all([this.getCards(), this.getUserId()]);
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
    })
      .then(this._handleResponse);
  }

  putLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'PUT',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
    })
      .then(this._handleResponse);
  }

  deleteLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
    })
      .then(this._handleResponse);
  }

  //принимает ссылку на новый аватар и отправляет его на сервер
  setAvatar(newAvatarLink) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: newAvatarLink
      })
    })
      .then(this._handleResponse);
  }

}


