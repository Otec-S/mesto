export default class Card {
  //принимаем данные из объекта
  constructor(cardData, handleCardClick, templateSelector = '.card-template') {
    this._name = cardData.name;
    this._link = cardData.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;

  }

  _getTemplate() {
    //клонируем узел с карточкой из шаблона
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  _handleHeartToLike() {
    this._heart.classList.toggle('card__heart_active');
  }

  //метод возвращает ссылку на счетчик лайков в разметке карточки
  showLikesCounter() {
    return this._element.querySelector('.card__hearts-counter');
    // console.log(this.likesCounter.textContent);
    // return this.likesCounter;
  }

  //метод возарвщает ссылку на мусорную корзину в разметке карточки
  showTrashCan() {
    //делаем ссылку на мусорную корзину
    const trashCan = this._element.querySelector('.card__trash-can');
    return trashCan;
  }

  _handleTrashCanToRemoveCard() {
    this._element.remove();
    this._element = null;
  }

  _handleClick() {
    this._handleCardClick({ name: this._name, link: this._link });
  }

  _setEventListeners() {
    //далаем ссылку на сердечко карточки
    this._heart = this._element.querySelector('.card__heart');
    //вешаем на него вызов функции по клику
    this._heart.addEventListener('click', () => {
      this._handleHeartToLike();
    });

    //слушатель на корзину удаления карточки
    this._can = this.showTrashCan();
    this._can.addEventListener("click", () => {
      this._handleTrashCanToRemoveCard();
    });

    //слушатель при нажатии на фотокарточку - просто вызываем функцию _clickToCard
    this._element.querySelector('.card__link').addEventListener('click', () => {
      this._handleClick();
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
