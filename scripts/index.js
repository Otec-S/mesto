import initialCards from './initial-cards-array.js';
import Card from './Card.js';
import { openPopUp, closePopUp, closePopUpByClickToOverlay } from './utils.js';
import FormValidator from './FormValidator.js';

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

//сохраняем в переменную ссылку на место добавления карточек
const cardsGrid = document.querySelector(".cards");

//ссылка на псевдомассив NodeList всех крестиков закрывания попапов
const crossesToClose = document.querySelectorAll('.popup__close-cross');

closePopUpByClickToOverlay();

//функция вставки карточки в cardGrid
function renderCardElement(cardElement) {
  cardsGrid.prepend(cardElement);
};

//делаем цикл forEach, чтобы пробежаться во всем элементам изначального массива и рисуем изначальный массив
initialCards.forEach((item) => {
  //делаем экземпляр класса Card из каждого элемнта изначального массива
  const card = new Card(item);
  //запускаем публичный метод класса Card для создания/генерации карточки
  const element = card.generateCard();
  //вставляем готовые карточки в нужное место разметки html
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
  const card = new Card(cardData);
  const element = card.generateCard();
  renderCardElement(element);
  closePopUp(popUpNewCard);
};

editCardForm.addEventListener("submit", handleEditCardSubmit);

//валидация форм
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_invalid',
}

//создаем экземпляр класса FormValidator для каждой проверяемой формы
const validity = new FormValidator(config, config.formSelector);
//запускаем проверку валидации этой формы через публичный метод класса
validity.enableValidation(config);
