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

    console.log(this._inputsFromForm);

    this._cardData = {};

    this._inputsFromForm.forEach((input) => {
      // console.log(input.name);
      // console.log(input.value);

      this._cardData[input.name] = input.value;
    })

    //Я
    // делаем объект из полей
    // name: this._inputsFromForm[0].value,
    // link: this._inputsFromForm[1].value,

//ключом поля объекта должно стать name инпута
//значением поля объекта должно стать value инпута

    console.log(this._cardData);

    //ТЗ: Содержит приватный метод _getInputValues, который собирает данные всех полей формы.

    //Сергей: ...Чтобы данные в колбэк сабмита формы передать, который в конструктор приходит класса PopupWithForm.
    //В index.js в конструктор передаешь и вызываешь с аргументом объектом с данными, этот объект тебе вернет функция, которую напишешь из пункта 2

    //Наталья:
    //У тебя не должно быть привязки к названиям инпутов, надо через querySelectorAll выбрать все инпуты из формы, и циклом по ним собрать данные оттуда
    //Можно собрать все поля по input.name, тогда ты как раз отвяжешься от name и link. Но надо будет аккуратно проверить name в html и в js, где дальше используешь значения из инпутов

    //Артём
    //data - это принимаемый объект
    // _setInputValues(data) {
    //   this._inputsFromForm.forEach((input) => {
    //     input.value = data[input.name]
    //   })
    // }

    //Наталья
    // this._inputsFromForm.forEach((input) => {
    //   this._formValues[input.name] = input.value;
    // })

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
