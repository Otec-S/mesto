import initialCards from './initial-cards-array.js';
import Card from './Card.js';


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
const crossesToClose = document.querySelectorAll('.popup__close-cross');


// общая функция закрывает окно попап
function closePopUp(popName) {
  popName.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopUpByEscape);
}

//закрытие popup по клику на escape
function closePopUpByEscape(evt) {
  if (evt.key === 'Escape') {
    //ищем открытый popup по его модификатору
    const popUpOpened = document.querySelector('.popup_opened');
    //команда закрыть именно этот открытый popup
    closePopUp(popUpOpened);
  }
};

// общая функция открывает окно попап
function openPopUp(popName) {
  popName.classList.add('popup_opened');
  //вешаем слушатель функции на эскейп на этот элемент
  document.addEventListener('keydown', closePopUpByEscape);
};


//закрытие popup по клику на overlay
function closePopUpByClickToOverlay() {
  document.addEventListener('mousedown', function (evt) {
    if (evt.target.classList.contains('popup_opened')) {
      closePopUp(evt.target);
    }
  })
}

closePopUpByClickToOverlay();

//СОЗДАНИЕ НОВОЙ КАРТОЧКИ
//делаем отдельную функцию для создания новой карточки из объекта


//функция вставления карточки в cardGrid
function renderCardElement(cardElement) {
  cardsGrid.prepend(cardElement);
};



//!!!!!!!!!!!!!!!

//делаем цикл forEach, чтобы пробежаться во всем элементам изначального массива и рисуем изначальный массив
initialCards.forEach((item) => {
  // const element = createCardElement(item);
  const card = new Card(item);
  const element = card.generateCard();
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
crossesToClose.forEach(button => {
  const buttonsPopup = button.closest('.popup'); // нашли родителя с нужным классом
  button.addEventListener('click', () => closePopUp(buttonsPopup)); // закрыли попап
});

//слушатель события клика на кнопку editButton
editButton.addEventListener('click', () => {
  openPopUp(popUpProfile);
  nameInput.value = currentName.textContent;
  nameStatus.value = currentStatus.textContent;
});

//слушатель события нажатия на кнопку "Сохранить" Profile
formElement.addEventListener('submit', handleFormSubmit);

//слушатель события клика на кнопку addButton
addButton.addEventListener('click', () => {
  openPopUp(popUpNewCard);
  //очищаем поля ввода при открытии нового попапа
  newCardNameInput.value = '';
  newCardLinkInput.value = '';
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
