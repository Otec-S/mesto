export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
    this._authorization = config.headers.authorization;
    this._body = config.body;
    this._newUserName = config.body.name;
    this._newUserStatus = config.body.about;

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

  setUserId() {
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._authorization,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: this._newUserName,
        about: this._newUserStatus
      })
    })
    .then((res) => {
      if (res.ok) { return res.json() }
      else { return Promise.reject(`Ошибка: ${res.status}`) }
    })
  }

}
