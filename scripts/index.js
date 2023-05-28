import initialCards from './initial-cards-array.js';
import Card from './Card.js';
import Section from './Section.js';
import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage.js';
// import { popUpBigPhoto } from './utils.js';
import { FormValidator } from './FormValidator.js';

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


/****************************** */
//сохраняем в переменную ссылку на место добавления карточек
// const cardsGrid = document.querySelector(".cards");
/***************************** */


// //ссылка на псевдомассив NodeList всех крестиков закрывания попапов
// const crossesToClose = document.querySelectorAll('.popup__close-cross');

// closePopUpByClickToOverlay();


/************************** */
// функция вставки карточки в cardGrid
// function renderCardElement(cardElement) {
//   cardsGrid.prepend(cardElement);
// };
/************************** */


/************************** */
// делаем отдельную функцию по созданию экземпляра класса Card
// function makeElementOfClassCard(data) {
//   const card = new Card(data);
//   //запускаем публичный метод класса Card для создания/генерации карточки
//   const element = card.generateCard();
//   //вставляем готовые карточки в нужное место разметки html
//   renderCardElement(element);
// }
/***************************** */

/***************************** */
//делаем цикл forEach, чтобы пробежаться во всем элементам изначального массива и рисуем изначальный массив
// initialCards.forEach((item) => {
//   makeElementOfClassCard(item);
// });
/***************************** */



//создаем экземпляр класса Popup с селектором для большого фото
const popUpBigPhoto = new PopupWithImage ('.popup-big-photo');
//вызываем публичный метод setEventListeners из класса Popup
popUpBigPhoto.setEventListeners();

//отрисовываем изначальный массив карточек
const cardList = new Section({
  items: initialCards,
  renderer: (data) => {
    //второй параметр экземпляра Card - это и есть функция handleCardClick!!!
    const card = new Card(data, (cardData) =>
    {popUpBigPhoto.open(cardData)});

    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
}, ".cards");

//отрисовка карточек на странице
cardList.renderItems();



//нажатие на карточку - вызов попапа с большим фото
// const card = new Card (cardData, () => {
//   const popWithImage = new PopupWithImage (cardData, popUpBigPhoto);
//   const bigPhotoOpen = popWithImage.open();
// }
// )






//ФУНКЦИИ ДЛЯ ПОПАПА
/*функция вставляет данные из заполненной формы попапа в профиль и закрывает попап*/
function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  currentName.textContent = nameInput.value;
  currentStatus.textContent = nameStatus.value;
  closePopUp(popUpProfile);
}

// //цикл для крестиков закрытия всех попапов
// crossesToClose.forEach(button => {
//   const buttonsPopup = button.closest('.popup'); // нашли родителя с нужным классом
//   button.addEventListener('click', () => closePopUp(buttonsPopup)); // закрыли попап
// });

//слушатель события клика на кнопку editButton
editButton.addEventListener('click', () => {
  openPopUp(popUpProfile);
  nameInput.value = currentName.textContent;
  nameStatus.value = currentStatus.textContent;
});

//слушатель события нажатия на кнопку "Сохранить" Profile
formElement.addEventListener('submit', handleProfileFormSubmit);



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

  const newCard = new Section({
    items: cardData,
    renderer: (data) => {
      const card = new Card(data);
      const cardElement = card.generateCard();
      newCard.addItem(cardElement);
    }
  }, ".cards");

  newCard.renderItem();

  // makeElementOfClassCard(cardData);
  closePopUp(popUpNewCard);
};

editCardForm.addEventListener("submit", handleEditCardSubmit);


/***************************************** */

//ВАЛИДАЦИЯ форм
const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_invalid',
}

//создаем экземпляр класса FormValidator для формы заполнения новой карточки
const cardFormValidator = new FormValidator(config, '.popup__form_type_profile');
//запускаем проверку валидации этой формы через публичный метод класса
cardFormValidator.enableValidation(config);

//создаем экземпляр класса FormValidator для формы профайла
const profileFormValidator = new FormValidator(config, '.popup__form_type_edit-card');
//запускаем проверку валидации этой формы через публичный метод класса
profileFormValidator.enableValidation(config);

