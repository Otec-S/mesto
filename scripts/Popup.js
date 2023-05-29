export default class Popup {
  constructor(popupSelector) {
    //делаю ссылку на popup с большим фото
    this._popup = document.querySelector(popupSelector);
    //ссылка на псевдомассив NodeList всех крестиков закрывания попапов
    // this._crossesToClose = document.querySelectorAll('.popup__close-cross');
    this._crossToClose = this._popup.querySelector('.popup__close-cross');

  }

  // публичный метод открывает окно попап
  open() {
    this._popup.classList.add('popup_opened');
    // вешаем слушатель функции на эскейп на этот элемент
    document.addEventListener('keydown', this._handleEscClose);
  };

  // публичный метод закрывает окно попап
  close() {
    this._popup.classList.remove('popup_opened');
    // удаляем слушатель функции на эскейп с этого элемента
    document.removeEventListener('keydown', this._handleEscClose);
    // console.log(this._handleEscClose);

  }

  //приватный метод закрытия popup по клику на escape
  _handleEscClose(evt) {
    //тут контекст - это весь HTML документ!!!
    // if (evt.key === 'Escape') {
      // () => { console.log(this) };
      //ищем открытый popup по его модификатору
      // const popUpOpened = document.querySelector('.popup_opened');
      //команда закрыть именно этот открытый popup
      // this.close();
      // console.log(this); //тут контекст - это весь HTML документ!!!
    // }
  };


  setEventListeners() {
    // слушатель клика иконке (крестику) закрытия попапа.
    this._crossToClose.addEventListener('click', () => this.close());

    // Модальное окно также закрывается при клике на затемнённую область вокруг формы.
    document.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.close();
      }
    })

  }

}
