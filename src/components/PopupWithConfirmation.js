import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    //ссылка на кнопку "ДА"
    this.confirmDeleteCard = this._popup.querySelector('.popup__submit');
  }

  //на период выполнения Response меняет текст на кнопке отправки
  renderLoading(isLoading) {
    if (isLoading) {
      this.normalButtonText = this._submitButton.textContent;
      this._normalButtonBackgroundColor = this._submitButton.style.backgroundColor;
      this._normalButtonTextColor = this._submitButton.style.color;
      this._submitButton.textContent = "Сохранение...";
      this._submitButton.style.backgroundColor = 'black';
      this._submitButton.style.color = 'white';
    } else {
      this._submitButton.textContent = this.normalButtonText;
      this._submitButton.style.backgroundColor = this._normalButtonBackgroundColor;
      this._submitButton.style.color = this._normalButtonTextColor;
    }
  };

  handleSubmitCallback(action) {
    this.submitCallback = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this.confirmDeleteCard.addEventListener('click', () => this.submitCallback());
  }
}

