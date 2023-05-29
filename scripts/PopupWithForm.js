import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  //наследуется от Popup, вызывает его конструктор, в который передает нужный параметр - смотреть в сторону super.
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    //Кроме селектора попапа принимает в конструктор колбэк сабмита формы
    this._submitForm = submitForm;

    // ПЕРЕМЕННЫЕ ДЛЯ POPUP PROFILE
    // const popUpProfile = document.querySelector('.popup-profile');
    this._editButton = document.querySelector('.profile__edit-button');
    //уже имеющиеся в профиле имя и статус
    this._currentName = document.querySelector('.profile__title');
    this._currentStatus = document.querySelector('.profile__subtitle');
    //имя и статус в формах для заполнения попапа
    this._nameInput = this._popup.querySelector(".popup__input_type_name");
    this._nameStatus = this._popup.querySelector(".popup__input_type_status");
    //ссылка на форму из попапа
    this._formElement = this._popup.querySelector('.popup__form');
  }

  // b.	Содержит приватный метод _getInputValues, который собирает данные всех полей формы.

  _getInputValues() {
    this._nameInput.value = this._currentName.textContent;
    this._nameStatus.value = this._currentStatus.textContent;
  }

  close() {
    this._formElement.reset();
    super.close();
  }

  _handleProfileFormSubmit() {
    this._currentName.textContent = this._nameInput.value;
    this._currentStatus.textContent = this._nameStatus.value;
    this.close();
  }


  // c.	Перезаписывает родительский метод setEventListeners. Метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.

  setEventListeners() {
    //обработчик клика по кнопке Edit
    this._editButton.addEventListener('click', () => {
      this.open();
      this._getInputValues();
    })
    super.setEventListeners();

    //обработчик клика по кнопке "Сохранить" Profile
    //по нему должна вызываться функция handleProfileFormSubmit
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleProfileFormSubmit();
    });

  }



}
