// ПЕРЕМЕННЫЕ ДЛЯ POPUP PROFILE
const popUpProfile = document.querySelector('.popup-profile');
const editButton = document.querySelector('.profile__edit-button');
//уже имеющиеся в профиле имя и статус
const currentName = document.querySelector('.profile__title');
const currentStatus = document.querySelector('.profile__subtitle');
//имя и статус в формах для заполнения попапа
const nameInput = popUpProfile.querySelector(".popup__input_type_name");
const nameStatus = popUpProfile.querySelector(".popup__input_type_status");
//ссылка на форму из попапа
const formElement = popUpProfile.querySelector('.popup__form');

// ПЕРЕМЕННЫЕ ДЛЯ POPUP NEW CARD
const popUpNewCard = document.querySelector('.popup-newcard');
const addButton = document.querySelector('.profile__add-button');
//сохраняем в переменную ссылку на form из pop-up, который делает новые карточки
const editCardForm = document.querySelector(".popup__form_type_edit-card");
const newCardNameInput = editCardForm.querySelector(".popup__input_type_name");
const newCardLinkInput = editCardForm.querySelector(".popup__input_type_status");

// ПЕРЕМЕННЫЕ ДЛЯ ОТРИСОВКИ КАРТОЧЕК
//сохраняем в переменную ссылку на шаблон карточки
const cardTemplate = document.querySelector('.card-template');
//сохраняем в переменную ссылку на место добавления карточек
const cardsGrid = document.querySelector(".cards");

// ПЕРЕМЕННЫЕ ДЛЯ POP UP BIG PHOTO
//делаю ссылку на popup с большим фото
const popUpBigPhoto = document.querySelector('.popup-big-photo');
//делаю ссылку на <img> в этом попапе BIG PHOTO
const pictureOfPopUpBigPhoto = popUpBigPhoto.querySelector('.popup__big-photo-picture');
//делаю ссылку на <figurecaption> в этом попапе BIG PHOTO
const titleOfPopUpBigPhoto = popUpBigPhoto.querySelector('.popup__big-photo-caption');

// УНИВЕРСАЛЬНЫЕ ПЕРЕМЕННЫЕ
//ссылка на псевдомассив NodeList всех крестиков закрывания попапов
const crossToClose = document.querySelectorAll('.popup__close-cross');


// общая функция открывает окно попап
function openPopUp(popName) {
  popName.classList.add('popup_opened');
}

// общая функция закрывает окно попап
function closePopUp(popName) {
  popName.classList.remove('popup_opened');
}

//закрытие popup по клику на escape
function closePopUpByEscape(popName) {
  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      closePopUp(popName);
    }
  })
};

//закрытие popup по клику на overlay
function closePopUpByClickToOverlay(popName) {
  document.addEventListener('click', function (evt) {
    const stringClassName = evt.target.className.toString();
    if (stringClassName.includes('popup_opened')) {
      closePopUp(popName);
    }
  })
}

//СОЗДАНИЕ НОВОЙ КАРТОЧКИ
//делаем отдельную функцию для создания новой карточки из объекта
function createCardElement(cardData) {
  //клонируем узел с карточкой из шаблона
  const cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);
  const cardName = cardElement.querySelector(".card__title");
  const cardPhoto = cardElement.querySelector(".card__photo");
  cardName.textContent = cardData.name;
  cardPhoto.src = cardData.link;
  cardPhoto.alt = cardData.name;

  //далаем ссылку на сердечко карточки
  const heartToLike = cardElement.querySelector('.card__heart');
  //слушатель нажатия на сердечко карточки
  heartToLike.addEventListener('click', () => {
    heartToLike.classList.toggle('card__heart_active');
  });

  //делаем ссылку на кнопку удаления карточки
  const trashCanCardToDelete = cardElement.querySelector('.card__trash-can');
  //делаем функцию удаления карточки со страницы
  function handleCardDelete() { cardElement.remove() };
  //делаем слушатель на кнопку удаления карточки
  trashCanCardToDelete.addEventListener("click", handleCardDelete);

  //ссылка на событие нажатия на фотокарточку
  const pressingCardPhoto = cardElement.querySelector('.card__link');

  //слушатель при нажатии на фотокарточку
  pressingCardPhoto.addEventListener('click', () => {
    pictureOfPopUpBigPhoto.src = cardPhoto.src;
    pictureOfPopUpBigPhoto.alt = cardName.textContent;
    titleOfPopUpBigPhoto.textContent = cardName.textContent;
    openPopUp(popUpBigPhoto);
    closePopUpByEscape(popUpBigPhoto);
    closePopUpByClickToOverlay(popUpBigPhoto);
  });

  return cardElement;
}

//функция вставления карточки в cardGrid
function renderCardElement(cardElement) {
  cardsGrid.prepend(cardElement);
};

//делаем цикл forEach, чтобы пробежаться во всем элементам изначального массива
initialCards.forEach((item) => {
  const element = createCardElement(item);
  renderCardElement(element);
});


//ФУНКЦИИ ДЛЯ ПОПАПА
/*функция вставляет данные из заполненной формы попапа в профиль и закрывает попап*/
function handleFormSubmit(evt) {
  evt.preventDefault();
  currentName.textContent = nameInput.value;
  currentStatus.textContent = nameStatus.value;
  closePopUp(popUpProfile);
}

//цикл для крестиков закрытия всех попапов
crossToClose.forEach(button => {
  const buttonsPopup = button.closest('.popup'); // нашли родителя с нужным классом
  button.addEventListener('click', () => closePopUp(buttonsPopup)); // закрыли попап
});

//слушатель события клика на кнопку editButton
editButton.addEventListener('click', () => {
  openPopUp(popUpProfile);
  nameInput.value = currentName.textContent;
  nameStatus.value = currentStatus.textContent;
  //вставляем функцию закрытия popup по нажатию escape
  closePopUpByEscape(popUpProfile);
  closePopUpByClickToOverlay(popUpProfile);
});

//слушатель события нажатия на кнопку "Сохранить" Profile
formElement.addEventListener('submit', handleFormSubmit);

//слушатель события клика на кнопку addButton
addButton.addEventListener('click', () => {
  openPopUp(popUpNewCard);
  //очищаем поля ввода при открытии нового попапа
  newCardNameInput.value = '';
  newCardLinkInput.value = '';
  //вставляем функцию закрытия popup по нажатию escape
  closePopUpByEscape(popUpNewCard);
  closePopUpByClickToOverlay(popUpNewCard);
});

//пересылка пользовательских вводов в новую карточку
function handleEditCardSubmit(event) {
  event.preventDefault();

  const name = newCardNameInput.value;
  const link = newCardLinkInput.value;

  const cardData = {
    name,
    link,
  };

  renderCardElement(createCardElement(cardData));
  closePopUp(popUpNewCard);
};

editCardForm.addEventListener("submit", handleEditCardSubmit);
