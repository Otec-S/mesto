import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    //ссылка на кнопку "ДА"
    this.confirmDeleteCard = this._popup.querySelector('.popup__submit');
  }

  handleSubmitCallback(action) {
    this.submitCallback = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this.confirmDeleteCard.addEventListener('click', () => this.submitCallback());
  }
}

// Так, ща, немного не так вышло. Функция _handleSubmitCallback у тебя на самом деле не вызывает обработчик, а просто записывает переданный в нее action в качестве обработчика. В ней всё ок, только её надо переименовать и сделать публичной
// А в addEventListener передавать не её, а сам обработчик - addEventListener('click', this.submitCallback)
// А в index.js как раз вызывать handleSubmitCallback с переданной функцией
