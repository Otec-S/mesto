// ПЕРЕМЕННЫЕ ДЛЯ POPUP PROFILE
const popUpProfile = document.querySelector('.popup-profile');
const crossToClosePopUpProfile = popUpProfile.querySelector('.popup__close-cross');
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
const crossToClosePopUpNewCard = popUpNewCard.querySelector('.popup__close-cross');
const addButton = document.querySelector('.profile__add-button');



/*************************************** */
// ОТРИСОВКА КАРТОЧЕК

//изначальные карточки
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//сохраняем в переменную ссылку на шаблон карточки
const cardTemplate = document.querySelector('.card-template');
//сохраняем в переменную ссылку на место добавления карточек
const cardsGrid = document.querySelector(".cards");

//делаем отдельную функцию для создания новой карточки из объекта
function createCardElement(cardData) {
    //клонируем узел с карточкой из шаблона
    const cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);
    const cardName = cardElement.querySelector(".card__title");
    const cardPhoto = cardElement.querySelector(".card__photo");
    cardName.textContent = cardData.name;
    cardPhoto.src = cardData.link;

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



/******************** */

//ФУНКЦИИ ДЛЯ ПОПАПА

//сохраняем в переменную ссылку на form из pop-up, который делает новые карточки
const editCardForm = document.querySelector(".popup__form_type_edit-card");

// общая функция открывает окно попап
function popupToOpen(pop) {
  pop.classList.add('popup_opened');
}

// общая функция закрывает окно попап
function popupToClose(pop) {
  pop.classList.remove('popup_opened');
}

/*функция вставляет данные из заполненной формы попапа в профиль и закрывает попап*/
function handleFormSubmit(evt) {
  evt.preventDefault();
  currentName.textContent = nameInput.value;
  currentStatus.textContent = nameStatus.value;
  popupToClose(popUpProfile);
}

//слушатель события клика на кнопку editButton
editButton.addEventListener('click', () => {
  popupToOpen(popUpProfile);
  nameInput.value = currentName.textContent;
  nameStatus.value = currentStatus.textContent;
});

//слушатель события клика на крестик закрывания попапа Profile
crossToClosePopUpProfile.addEventListener('click', () => {
  popupToClose(popUpProfile);
});

//слушатель события нажатия на кнопку "Сохранить" Profile
formElement.addEventListener('submit', handleFormSubmit);

//слушатель события клика на кнопку addButton
addButton.addEventListener('click', () => {
  popupToOpen(popUpNewCard);
});

//слушатель события клика на крестик закрывания попапа NewCard
crossToClosePopUpNewCard.addEventListener('click', () => {
  popupToClose(popUpNewCard);
});

// const renderVideoElement = (videoElement) => {
//   videoGrid.prepend(videoElement);
// };

//пересылка пользовательских вводов в новую карточку
function handleEditCardSubmit(event) {
  event.preventDefault();

  const newCardNameInput = editCardForm.querySelector(".popup__input_type_name");
  const newCardLinkInput = editCardForm.querySelector(".popup__input_type_status");

  const cardName = newCardNameInput.value;
  const cardLink = newCardLinkInput.value;

  const cardData = {
    cardName,
    cardLink,
  };

  cardsGrid.prepend(cardData);
  popupToClose(popUpNewCard);

  // renderVideoElement(createVideoElement(videoData));
  // closePoup(editVideoPopup);
};

editCardForm.addEventListener("submit", handleEditCardSubmit);
