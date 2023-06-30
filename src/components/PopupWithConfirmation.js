import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  // constructor(popupSelector, submitCallback) {
  //   super(popupSelector);
  //   this.submitCallback = submitCallback;
  // }

  //ссылка на кнопку "ДА"
  confirmDeleteCard() {
    const deleteConfirmButton = this._popup.querySelector('.popup__submit');
    return deleteConfirmButton;
  }

  _handleSubmitCallback(action) {
    this.submitCallback = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this.confirmDeleteCard.addEventListener('click', this._handleSubmitCallback);
  }


}


