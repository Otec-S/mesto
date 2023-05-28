//импорт popName ?
//импорт crossesToClose ?

// import { crossesToClose } from './utils.js'


export default class Popup {
  constructor(popupSelector) {
    // this._popupSelector = popupSelector;
    //делаю ссылку на popup с большим фото
    this._popup = document.querySelector(popupSelector);
    //ссылка на псевдомассив NodeList всех крестиков закрывания попапов
    this._crossesToClose = document.querySelectorAll('.popup__close-cross');
  }

  // публичный метод открывает окно попап
  open() {
    this._popup.classList.add('popup_opened');
    //вешаем слушатель функции на эскейп на этот элемент
    // document.addEventListener('keydown', this._handleEscClose);
  };

  // публичный метод закрывает окно попап
  close() {
    this._popup.classList.remove('popup_opened');
    // document.removeEventListener('keydown', this._handleEscClose);
  }

  // //приватный метод закрытия popup по клику на escape
  // _handleEscClose(evt) {
  //   if (evt.key === 'Escape') {
  //     //ищем открытый popup по его модификатору
  //     const popUpOpened = document.querySelector('.popup_opened');
  //     //команда закрыть именно этот открытый popup
  //     this.close(popUpOpened);
  //   }
  // };

  //публичный метод setEventListeners, который добавляет слушатель клика иконке (крестику) закрытия попапа.
  setEventListeners() {
    //цикл для крестиков закрытия всех попапов
    this._crossesToClose.forEach(button => {
      const buttonsPopup = button.closest('.popup'); // нашли родителя с нужным классом
      button.addEventListener('click', () => this.close(buttonsPopup)); // закрыли попап
    });

  }

  // // Модальное окно также закрывается при клике на затемнённую область вокруг формы.
  // //приватный метод закрытия popup по клику на overlay
  // _handleOverlayClose() {
  //   document.addEventListener('mousedown', (evt) => {
  //     if (evt.target.classList.contains('popup_opened')) {
  //       this.close(evt.target);
  //     }
  //   })
  // }

  // //вызов приватного метода закрытия popup по клику на overlay
  // //в этом месте его вызывать, или сделать публичным и вызывать в index.js ??
  // _handleOverlayClose()

}
