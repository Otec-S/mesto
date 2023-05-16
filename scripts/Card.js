import { openPopUp, popUpBigPhoto, pictureOfPopUpBigPhoto, titleOfPopUpBigPhoto } from "./utils.js";

export default class Card {
  //принимаем данные из объекта
  constructor(cardData, templateSelector = '.card-template') {
    this._name = cardData.name;
    this._link = cardData.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    //клонируем узел с карточкой из шаблона
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  _handleHeartToLike() {
    this._heart.classList.toggle('card__heart_active');
  }

  _handleTrashCanToRemoveCard() {
    this._element.remove();
    this._element = null;
  }

  _handlePressToCardPhoto() {
    pictureOfPopUpBigPhoto.src = this._link;
    pictureOfPopUpBigPhoto.alt = this._name;
    titleOfPopUpBigPhoto.textContent = this._name;
    openPopUp(popUpBigPhoto);
  }

  _setEventListeners() {
    //далаем ссылку на сердечко карточки
    this._heart = this._element.querySelector('.card__heart');
    //вешаем на него вызов функции по клику
    this._heart.addEventListener('click', () => {
      this._handleHeartToLike();
    });

    //делаем ссылку на мусорную корзину
    this._can = this._element.querySelector('.card__trash-can');
    //слушатель на корзину удаления карточки
    this._can.addEventListener("click", () => {
      this._handleTrashCanToRemoveCard();
    });

    //слушатель при нажатии на фотокарточку
    this._element.querySelector('.card__link').addEventListener('click', () => {
      // openPopUp(popUpBigPhoto);
      this._handlePressToCardPhoto();
    });
  }

  //публичный метод для создания карточки
  generateCard() {
    //ссылка на клонированный узел шаблона из html
    this._element = this._getTemplate();
    //навешиваем все слушатели
    this._setEventListeners();
    //название карточки - элемент name из объекта cardData
    this._element.querySelector(".card__title").textContent = this._name;
    //url карточки - элемент link из объекта cardData
    this._element.querySelector(".card__photo").src = this._link;
    //alt карточки - элемент name из объекта cardData
    this._element.querySelector(".card__photo").alt = this._name;
    //возвращаем готовую карточку
    return this._element;
  }
}
