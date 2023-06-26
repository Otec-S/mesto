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

  setEventListeners() {
    super.setEventListeners();
    //обработчик клика на корзинку
    card.showTrashCan().addEventListener('click', () => {
      this._popup.open();
    })


    //вешаем обработчик на кнопку "Да" в попапе подтверждения удаления
    // this._formElement.addEventListener('submit', (evt) => {
    //   evt.preventDefault();

    //   this._submitForm(this._getInputValues());
    // });
  }
}
