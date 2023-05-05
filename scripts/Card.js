export default class Card {

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
    const heartToLike = this._element.querySelector('.card__heart');
    return heartToLike;
  }

  _setEventListeners() {
    this._heart = this._handleHeartToLike();
    //слушатель нажатия на сердечко карточки
    this._heart.addEventListener('click', () => {
      this._heart.classList.toggle('card__heart_active');
    });
  }

  //публичный метод для создания карточки
  generateCard() {
    //ссылка на клонированный узел шаблона из html
    this._element = this._getTemplate();
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

  //   //делаем ссылку на кнопку удаления карточки
  //   const trashCanCardToDelete = cardElement.querySelector('.card__trash-can');
  //   //делаем функцию удаления карточки со страницы
  //   function handleCardDelete() { cardElement.remove() };
  //   //делаем слушатель на кнопку удаления карточки
  //   trashCanCardToDelete.addEventListener("click", handleCardDelete);

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
