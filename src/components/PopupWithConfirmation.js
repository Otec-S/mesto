import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  //ссылка на кнопку "ДА"
  confirmDeleteCard() {
    const deleteConfirmButton = this._popup.querySelector('.popup__submit');
    return deleteConfirmButton;
  }

}
