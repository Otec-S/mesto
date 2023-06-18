import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    //Кроме селектора попапа принимает в конструктор колбэк сабмита формы
    this._submitForm = submitForm;
    //общая ссылка на форму из попапа (есть в обеих формах)
    this._formElement = this._popup.querySelector('.popup__form');
  }

  _getInputValues() {
    //делаем массив всех значений полей текущей формы
    this._inputsFromForm = Array.from(this._formElement.querySelectorAll('.popup__input'));
    //создаем пустой объект
    this._cardData = {};
    //наполняем объект данными с всем полей-инпутов текущей формы
    this._inputsFromForm.forEach((input) => {
      this._cardData[input.name] = input.value;
    })
    //возвращаем полученный объект c полями name и link
    return this._cardData;
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
      this._submitForm(this._getInputValues());
    });
  }

}
