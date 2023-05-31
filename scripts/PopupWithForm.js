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

    // ПЕРЕМЕННЫЕ ДЛЯ POPUP NEW CARD
    // const popUpNewCard = document.querySelector('.popup-newcard');
    this._addButton = document.querySelector('.profile__add-button');
    //сохраняем в переменную ссылку на form из pop-up, который делает новые карточки

    this._editCardForm = this._popup.querySelector(".popup__form_type_edit-card");
    this._newCardNameInput = this._editCardForm.querySelector(".popup__input_type_name");
    this._newCardLinkInput = this._editCardForm.querySelector(".popup__input_type_status");

  }

  // b.	Содержит приватный метод _getInputValues, который собирает данные всех полей формы.
  //Эта функция - чтобы данные всех полей формы в колбэк сабмита формы передать, который приходит в конструктор  класса PopupWithForm
  //передать значения полей формы в функцию типа handleEditCardSubmit

  _getInputValues() {
    // this._nameInput.value = this._currentName.textContent;
    // this._nameStatus.value = this._currentStatus.textContent;
    const cardData = {
      name: this._newCardNameInput.value,
      link: this._newCardLinkInput.value,
    }
      return cardData;
  }

    close() {
      this._formElement.reset();
      super.close();
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
      //обработчик клика по кнопке Edit
      // this._editButton.addEventListener('click', () => {
      //   this.open();
      //   this._getInputValues();
      // })
      super.setEventListeners();

      //обработчик клика по кнопке "Сохранить" Profile
      //по нему должна вызываться функция handleProfileFormSubmit
      // this._formElement.addEventListener('submit', (evt) => {
      //   evt.preventDefault();
      //   this._handleProfileFormSubmit();
      // });


      //обработчик клика по кнопке addButton
      this._addButton.addEventListener('click', () => {
        this.open();
        //очищаем поля ввода при открытии нового попапа
        this._newCardNameInput.value = '';
        this._newCardLinkInput.value = '';
      });

      //обработчик клика по кнопке "Добавить" New Card
      //по нему должна вызываться функция handleEditCardSubmit
      this._formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
        //...ниже не уверен, что именно сюда надо вставлять...
        this.card = this._getInputValues();
        this._submitForm();
      });

    }


  }
