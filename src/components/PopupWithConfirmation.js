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

