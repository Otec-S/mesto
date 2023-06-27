import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, { handleDelete }) {
    super(popupSelector);
    this.handleDelete = handleDelete;
  }

  //ссылка на кнопку "ДА"
  confirmDeleteCard() {
    const deleteConfirmButton = this._popup.querySelector('.popup__submit');
    return deleteConfirmButton;
  }

  //функция удаления карточки из конструктора
  _handleConfirmButtonToRemoveCard() {
    this.handleDelete();
  }

  setEventListeners() {
    super.setEventListeners();
    //обработчик клика на корзинку
    // card.showTrashCan().addEventListener('click', () => {
    //   this._popup.open();
    // })


    //вешаем обработчик на кнопку "Да" в попапе подтверждения удаления
    this.confirmDeleteCard().addEventListener('click', () => {
      this._handleConfirmButtonToRemoveCard();
    })

    // this._formElement.addEventListener('submit', (evt) => {
    //   evt.preventDefault();

    //   this._submitForm(this._getInputValues());
    // });
  }
}
