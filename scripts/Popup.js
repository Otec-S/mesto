export default class Popup {
  constructor(popupSelector) {
    //делаю ссылку на popup с большим фото
    this._popup = document.querySelector(popupSelector);
    //прибиваем контекст к this в этой функции, иначе this - это весь html документ
    this._handleEscClose = this._handleEscClose.bind(this);
    this._crossToClose = this._popup.querySelector('.popup__close-cross');
  }

  // публичный метод открывает окно попап
  open(popName) {
    popName.classList.add('popup_opened');
    // вешаем слушатель функции на эскейп на этот элемент
    document.addEventListener('keydown', this._handleEscClose);
  }

  // публичный метод закрывает окно попап
  close(popName) {
    popName.classList.remove('popup_opened');
    // удаляем слушатель функции на эскейп с этого элемента
    document.removeEventListener('keydown', this._handleEscClose);
  }

  //приватный метод закрытия popup по клику на escape
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      //ищем открытый popup по его модификатору
      const popUpOpened = document.querySelector('.popup_opened');
      //команда закрыть именно этот открытый popup
      this.close(popUpOpened);
    }
  }


  setEventListeners() {

    // слушатель клика иконке (крестику) закрытия попапа.
    this._crossToClose.addEventListener('click', () => this.close());

    // Модальное окно также закрывается при клике на затемнённую область вокруг формы.
    document.addEventListener('mousedown', function (evt) {
      if (evt.target.classList.contains('popup_opened')) {
        this.close(evt.target);
      }
    })
  }

}
