export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
    this._authorization = config.headers.authorization;

    // console.log(`Массив: ${res.json}`);
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




}
