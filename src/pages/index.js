import { editButton, currentName, currentStatus, currentAvatar, nameInput, nameStatus, addButton, config } from '../scripts/utils.js';
import initialCards from '../scripts/initial-cards-array.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js';
import Api from '../components/Api.js';

import './index.css'; // добавьте импорт главного файла стилей




//=====API=====
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-68',
  headers: {
    authorization: '752cb7e1-403b-438a-9b48-05f4c5ae9d75'
  }
});


//=====INITIAL CARDS=====

//возвращаем Promise с карточками сервера
const apiCardsPromise = api.getCards();

//делаем отдельную функцию по созданию экземпляра класса Card
function makeElementOfClassCard(data) {
  //второй параметр экземпляра Card - это и есть функция handleCardClick!!!
  const card = new Card(data, (cardData) => { popUpBigPhoto.open(cardData) });
  const cardElement = card.generateCard();
  return cardElement;
}
//создаем экземпляр класса Section и передаем в него изначальный массив карточек с сервера через API
apiCardsPromise.then((apiCards) => {
  const section = new Section({
    items: apiCards,
    renderer: (data) => {
      const element = makeElementOfClassCard(data);
      section.addItem(element);
    }
  }, ".cards");
  section.renderItems();
});


//=====BIG PHOTO=====

//создаем экземпляр класса Popup с селектором для большого фото
const popUpBigPhoto = new PopupWithImage('.popup-big-photo');
//вызываем публичный метод setEventListeners из класса Popup
popUpBigPhoto.setEventListeners();


//=====PROFILE=====

//???экземпляр класса UserInfo создается единожды
const infoAboutUser = new UserInfo(currentName, currentStatus);

//возвращаем Promise с данными пользователя с сервера (еще будет нужен?)
const userInfoPromise = api.getUserId();

userInfoPromise.then((result) => {
  // infoAboutUser.setUserInfo(result);
  currentName.textContent = result.name;
  currentStatus.textContent = result.about;
  currentAvatar.src = result.avatar;
})

// создаем экземпляр класса Popup с селектором для Profile
const popUpProfileInstance = new PopupWithForm('.popup-profile', handleProfileFormSubmit);
// вызываем публичный метод setEventListeners из класса Popup
popUpProfileInstance.setEventListeners();
// return infoAboutUser;

// обработчик клика по кнопке Edit
editButton.addEventListener('click', () => {
  //передаем данные из _getInputValues в колбэк сабмита формы
  const userInfo = infoAboutUser.getUserInfo();
  nameInput.value = userInfo.name;
  nameStatus.value = userInfo.link;
  popUpProfileInstance.open();
})

/*функция вставляет данные из заполненной формы попапа в профиль и закрывает попап*/
function handleProfileFormSubmit(inputValues) {
  infoAboutUser.setUserInfo(inputValues);
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

// функция сабмита формы новой карты. Аргумент cardInfo - объект с двумя полями name и link
function handleCardFormSubmit(cardInfo) {
  //создаем одну карточку с данными из полей формы попапа
  const element = makeElementOfClassCard(cardInfo);
  //методом addItem класса Section добавляем эту одну созданную карточку на страницу
  section.addItem(element);
  //закрываем попап
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
