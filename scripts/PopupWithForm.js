import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitForm) {
    super(popupSelector);
    //Кроме селектора попапа принимает в конструктор колбэк сабмита формы
    this._submitForm = submitForm;


    //можно как-то элегантнее записать?
    this._profilePopupToOpen = document.querySelector('.popup-profile');
    this._newcardPopupToOpen = document.querySelector('.popup-newcard');


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

    //это вся форма в New Card с двумя инпутами - ??она нужна для чего-то??
    // this._editCardForm = this._popup.querySelector(".popup__form_type_edit-card");

    // this._newCardNameInput = this._editCardForm.querySelector(".popup__input_type_name");
    // this._newCardLinkInput = this._editCardForm.querySelector(".popup__input_type_status");


  }

  // b.	Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
  //Эта функция - чтобы данные всех полей формы передать в функцию-колбэк сабмита формы (this._submitForm), который приходит в конструктор  класса PopupWithForm
  //передать значения полей формы в функцию типа handleEditCardSubmit

  _getInputValues() {
    //создаем объект с данными обоих универсальных полей формы
    const cardData = {
      name: this._nameInput.value,
      link: this._nameStatus.value,
    }
    return cardData;
  }

  close(popName) {
    this._formElement.reset();
    super.close(popName);
  }

  //функция отправки формы сабмита
  //Тело этой функции должно быть внутри PopupWithForm (как метод класса) или в index.js? - В index.js в конструктор передаешь, и вызываешь с аргументом объект с данными, этот объект тебе вернет функция _getInputValues()
  // _handleProfileFormSubmit() {
  //   this._currentName.textContent = this._nameInput.value;
  //   this._currentStatus.textContent = this._nameStatus.value;
  //   this.close();
  // }

  //?????????????????????????????
  // пересылка пользовательских вводов в новую карточку
  // _handleEditCardSubmit() {
  //   const name = this._newCardNameInput.value;
  //   const link = this._newCardLinkInput.value;
  //   const cardData = {
  //     name,
  //     link,
  //   };
  //   this.close();
  //   // return cardData;
  // }

  // c.	Перезаписывает родительский метод setEventListeners. Метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия, но и (только) добавлять обработчик сабмита формы.

  setEventListeners() {
    super.setEventListeners();

    // обработчик клика по кнопке Edit
    this._editButton.addEventListener('click', () => {
      this.open(this._profilePopupToOpen);
    })

    //обработчик клика по кнопке "Сохранить" Profile
    //по нему должна вызываться функция handleProfileFormSubmit
    // this._formElement.addEventListener('submit', (evt) => {
    //   evt.preventDefault();
    //   this._handleProfileFormSubmit();
    // });


    //обработчик клика по кнопке addButton
    this._addButton.addEventListener('click', () => {
      this.open(this._newcardPopupToOpen);
      //очищаем поля ввода при открытии нового попапа
      this._nameInput.value = '';
      this._nameStatus.value = '';
    });

    //обработчик клика по кнопке "Добавить" New Card
    //по нему должна вызываться функция handleEditCardSubmit
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
      //передаем данные из _getInputValues в колбэк сабмита формы
      this.cardInfo = this._getInputValues();
      this._submitForm(this.cardInfo);
    });

  }


}
