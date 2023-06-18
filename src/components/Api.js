export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
    this._authorization = config.headers.authorization;
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      headers: {
        authorization: this._authorization,
        'Content-type': 'application/json'
      }
    })
      .then((res) => {
        if (res.ok) { return res.json() }
        else { return Promise.reject(`Ошибка: ${res.status}`) }
      })
  }

  getUserId() {
    return fetch(`${this._url}/users/me`, {
      headers: {
        authorization: this._authorization,
        'Content-type': 'application/json'
      }
    })
      .then((res) => {
        if (res.ok) { return res.json() }
        else { return Promise.reject(`Ошибка: ${res.status}`) }
      })
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
    .then((res) => {
      if (res.ok) { return res.json() }
      else { return Promise.reject(`Ошибка: ${res.status}`) }
    })
  }

}
