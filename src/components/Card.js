export default class Card {

  //принимаем данные из объекта
  constructor(cardData, { handleCardClick }, { confirmDelete }, { putHeartToLike }, { deleteHeartToLike }, templateSelector = '.card-template') {
    this._name = cardData.name;
    this._link = cardData.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this._confirmDelete = confirmDelete;
    this.putHeartToLike = putHeartToLike;
    this.deleteHeartToLike = deleteHeartToLike;
  }

  _getTemplate() {
    //клонируем узел с карточкой из шаблона
    const cardElement = document.querySelector(this._templateSelector).content.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  //метод возвращает ссылку на сердечко в разметке карточки
  showHeartToLike() {
    return this._element.querySelector('.card__heart');
  }

  _handleHeartToLike() {
    if (this._heart.classList.contains('card__heart_active')) {
      this.deleteHeartToLike();
    } else {
      this.putHeartToLike();
    }
  }

  //метод возвращает ссылку на счетчик лайков в разметке карточки
  showLikesCounter() {
    return this._element.querySelector('.card__hearts-counter');
  }

  //метод возвращает ссылку на мусорную корзину в разметке карточки
  showTrashCan() {
    return this._element.querySelector('.card__trash-can');
  }

  handleTrashCanToRemoveCard() {
    this._element.remove();
    this._element = null;
  }

  _confirmToRemoveCard() {
    this._confirmDelete();
  }

  _handleClick() {
    this._handleCardClick({ name: this._name, link: this._link });
  }

  _setEventListeners() {

    //вешаем на сердечко вызов функции по клику
    this._heart = this.showHeartToLike();
    this._heart.addEventListener('click', () => {
      this._handleHeartToLike();
    });

    // слушатель на корзину удаления карточки
    this.showTrashCan().addEventListener("click", () => {
      this._confirmToRemoveCard();
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
