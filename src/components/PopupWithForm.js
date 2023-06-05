import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    //Кроме селектора попапа принимает в конструктор колбэк сабмита формы
    this._submitForm = submitForm;

    //общая ссылка на форму из попапа (есть в обеих формах)
    this._formElement = this._popup.querySelector('.popup__form');
    //первое поле
    this._nameInput = this._popup.querySelector(".popup__input_type_name");
    //второе поле
    this._nameStatus = this._popup.querySelector(".popup__input_type_status");
    //editButton - кнопка редактирования Profile
    this._editButton = document.querySelector('.profile__edit-button');
    //addButton - кнопка добавления New Card
    this._addButton = document.querySelector('.profile__add-button');

  }

  _getInputValues() {
    //создаем объект с данными обоих универсальных полей формы
    const cardData = {
      name: this._nameInput.value,
      link: this._nameStatus.value,
    }
    return cardData;
  }

  close() {
    this._formElement.reset();
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();

    //универсальный обработчик клика по кнопке для обоих попапов
    //по нему должна вызываться функция, переданная в колбэк
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      //передаем данные из _getInputValues в колбэк сабмита формы
      this.cardInfo = this._getInputValues();
      //тут функция колбека получает объект cardInfo
      this._submitForm(this.cardInfo);
    });

  }


}