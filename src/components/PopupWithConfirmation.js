import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    //Кроме селектора попапа принимает в конструктор колбэк сабмита формы
    // this._submitForm = submitForm;
  }

  confirmDeleteCard() {
    const deleteConfirmButton = this._popup.querySelector('.popup__submit');
    return deleteConfirmButton;
  }

}
