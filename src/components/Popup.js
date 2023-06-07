export default class Popup {
  constructor(popupSelector) {
    //делаю ссылку на popup с большим фото
    this._popup = document.querySelector(popupSelector);
    //прибиваем контексты к this
    this._handleEscClose = this._handleEscClose.bind(this);
    this._closePopUpByClickToOverlay = this._closePopUpByClickToOverlay.bind(this);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this._crossToClose = this._popup.querySelector('.popup__close-cross');
  }

  // публичный метод открывает окно попап
  open() {
    this._popup.classList.add('popup_opened');
    // вешаем слушатель функции на эскейп на этот элемент
    document.addEventListener('keydown', this._handleEscClose);
    document.addEventListener('mousedown', this._closePopUpByClickToOverlay);

  }

  // публичный метод закрывает окно попап
  close() {
    this._popup.classList.remove('popup_opened');
    // удаляем слушатель функции на эскейп с этого элемента
    document.removeEventListener('keydown', this._handleEscClose);
    document.removeEventListener('mousedown', this._closePopUpByClickToOverlay);
  }

  //приватный метод закрытия popup по клику на escape
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  //приватный метод закрытия popup по клику на overlay
  _closePopUpByClickToOverlay(evt) {
    if (evt.target.classList.contains('popup_opened')) {
      this.close();
    }
  }

  setEventListeners() {
    // слушатель клика иконке (крестику) закрытия попапа.
    this._crossToClose.addEventListener('click', this.close);
  }
}
