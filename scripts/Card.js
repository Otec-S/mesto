export default class Card {
  //принимаем данные из объекта
  constructor(cardData) {
    this._name = cardData.name;
    this._link = cardData.link;
  }

  _getTemplate() {
    //клонируем узел с карточкой из шаблона
    const cardElement = document.querySelector('.card-template').content.querySelector('.card').cloneNode(true);
    return cardElement;
  }

  _handleHeartToLike() {
    //далаем ссылку на сердечко карточки
    this._heart = this._element.querySelector('.card__heart');
    this._heart.classList.toggle('card__heart_active');
    return this._heart;
  }

  _handleTrashCanToRemoveCard() {
    //делаем ссылку на мусорную корзину
    this._can = this._element.querySelector('.card__trash-can');
    this._element.remove();
    return this._can;
  }

  _setEventListeners() {
    //слушатель нажатия на сердечко карточки
    this._heartToLike = this._handleHeartToLike();
    this._heartToLike.classList.remove('card__heart_active');
    this._heartToLike.addEventListener('click', () => {
      this._handleHeartToLike();
    });

    //слушатель на корзину удаления карточки
    this._trashCan = this._handleTrashCanToRemoveCard();
    this._trashCan.addEventListener("click", () => {
      this._handleTrashCanToRemoveCard();
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

  // createCardElement(cardData) {



  //   //ссылка на событие нажатия на фотокарточку
  //   const pressingCardPhoto = cardElement.querySelector('.card__link');

  //   //слушатель при нажатии на фотокарточку
  //   pressingCardPhoto.addEventListener('click', () => {
  //     pictureOfPopUpBigPhoto.src = cardPhoto.src;
  //     pictureOfPopUpBigPhoto.alt = cardName.textContent;
  //     titleOfPopUpBigPhoto.textContent = cardName.textContent;
  //     openPopUp(popUpBigPhoto);
  //   });

  //   return cardElement;
  // }

}
