import { editButton, currentName, currentStatus, nameInput, nameStatus, addButton, config } from '../scripts/utils.js';
import initialCards from '../scripts/initial-cards-array.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js';


//=====BIG PHOTO=====

//создаем экземпляр класса Popup с селектором для большого фото
const popUpBigPhoto = new PopupWithImage('.popup-big-photo');
//вызываем публичный метод setEventListeners из класса Popup
popUpBigPhoto.setEventListeners();

//отрисовываем изначальный массив карточек
const cardList = new Section({
  items: initialCards,
  renderer: (data) => {
    //второй параметр экземпляра Card - это и есть функция handleCardClick!!!
    const card = new Card(data, (cardData) => { popUpBigPhoto.open(cardData) });
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
  }
}, ".cards");

//отрисовка карточек на странице
cardList.renderItems();


//=====PROFILE=====

//экземпляр класса UserInfo создается единожды
const infoAboutUser = new UserInfo(currentName, currentStatus);

// создаем экземпляр класса Popup с селектором для Profile
const popUpProfileInstance = new PopupWithForm('.popup-profile', handleProfileFormSubmit);
// вызываем публичный метод setEventListeners из класса Popup
popUpProfileInstance.setEventListeners();

// обработчик клика по кнопке Edit
editButton.addEventListener('click', () => {
  //передаем данные из _getInputValues в колбэк сабмита формы
  const userInfo = infoAboutUser.getUserInfo();
  nameInput.value = userInfo.name;
  nameStatus.value = userInfo.link;
  popUpProfileInstance.open();
})

/*функция вставляет данные из заполненной формы попапа в профиль и закрывает попап*/
function handleProfileFormSubmit(cardInfo) {
  infoAboutUser.setUserInfo(cardInfo);
  popUpProfileInstance.close();
}


//===== NEW CARD =====

// создаем экземпляр класса Popup с селектором для New Card
const popUpNewCard = new PopupWithForm('.popup-newcard', handleCardFormSubmit);
//вызываем публичный метод setEventListeners из класса Popup
popUpNewCard.setEventListeners();
//обработчик клика по кнопке addButton
addButton.addEventListener('click', () => {
  popUpNewCard.open();
});

//функция сабмита формы новой карты
function handleCardFormSubmit(cardInfo) {

  const newCard = new Section({
    items: cardInfo,
    renderer: (data) => {
      const card = new Card(data, (cardData) => { popUpBigPhoto.open(cardData) });
      const cardElement = card.generateCard();
      newCard.addItem(cardElement);
    }
  }, ".cards");

  newCard.renderItem();
  popUpNewCard.close();
}


//ВАЛИДАЦИЯ форм

//создаем экземпляр класса FormValidator для формы заполнения новой карточки
const cardFormValidator = new FormValidator(config, '.popup__form_type_profile');
//запускаем проверку валидации этой формы через публичный метод класса
cardFormValidator.enableValidation(config);

//создаем экземпляр класса FormValidator для формы профайла
const profileFormValidator = new FormValidator(config, '.popup__form_type_edit-card');
//запускаем проверку валидации этой формы через публичный метод класса
profileFormValidator.enableValidation(config);
