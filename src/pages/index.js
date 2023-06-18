import { editButton, currentName, currentStatus, currentAvatar, nameInput, nameStatus, addButton, config } from '../scripts/utils.js';
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

//=====GENERAL: MAKE AN INSTANCE OF CARD=====

//делаем отдельную функцию по созданию экземпляра класса Card
function makeElementOfClassCard(data) {
  //второй параметр экземпляра Card - это и есть функция handleCardClick!!!
  const card = new Card(data, (cardData) => { popUpBigPhoto.open(cardData) });
  const cardElement = card.generateCard();
  return cardElement;
}

//=====RENDER ALL SERVER CARDS=====

//возвращаем Promise с карточками сервера
// const apiCardsPromise = api.getCards();
let section = {};
//создаем экземпляр класса Section и передаем в него изначальный массив карточек с сервера через API
api.getCards().then((apiCards) => {
  section = new Section({
    items: apiCards,
    renderer: (data) => {
      const element = makeElementOfClassCard(data);
      section.addItem(element);
    }
  }, ".cards");
  section.renderItems();
});

//===== NEW CARD =====

//пробный запрос карточки на сервер
// api.setCard('Странный котик', 'https://gdb.rferl.org/6E61CFE9-75D1-4EDF-A3DF-50731D80D47D_w650_r1_s.jpg');

//ответ
/*{
  "likes": [],
  "_id": "648eb695ebc96e08a58d498a",
  "name": "Котик",
  "link": "https://bipbap.ru/wp-content/uploads/2021/11/1619541010_52-oir_mobi-p-nyashnie-kotiki-zhivotnie-krasivo-foto-57-730x856.jpg",
  "owner": {
      "name": "Сергей",
      "about": "Юристище",
      "avatar": "https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg",
      "_id": "3f22f8c52c771af55a0fc4d1",
      "cohort": "cohort-68"
  },
  "createdAt": "2023-06-18T07:47:33.568Z"
},*/

// создаем экземпляр класса Popup с селектором для New Card
const popUpNewCard = new PopupWithForm('.popup-newcard', handleCardFormSubmit);
//вызываем публичный метод setEventListeners из класса Popup
popUpNewCard.setEventListeners();
//обработчик клика по кнопке addButton
addButton.addEventListener('click', () => {
  popUpNewCard.open();
});

// функция сабмита/отправки формы новой карты. Аргумент cardInfo - объект с двумя полями name и link
function handleCardFormSubmit(cardInfo) {
  // создаем одну карточку с данными из полей формы попапа
  const element = makeElementOfClassCard(cardInfo);
    // методом addItem класса Section добавляем эту одну созданную карточку на страницу
  section.addItem(element);

  api.setCard(cardInfo.name, cardInfo.link);
  popUpNewCard.close();
}



//=====BIG PHOTO=====

//создаем экземпляр класса Popup с селектором для большого фото
const popUpBigPhoto = new PopupWithImage('.popup-big-photo');
//вызываем публичный метод setEventListeners из класса Popup
popUpBigPhoto.setEventListeners();

//=====PROFILE=====

//экземпляр класса UserInfo с текущими пустыми значениями name и about из html
const infoAboutUser = new UserInfo(currentName, currentStatus);

//возвращаем Promise с данными пользователя с сервера (еще будет нужен?)
const userInfoPromise = api.getUserId();

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
  nameStatus.value = userInfo.about;
  popUpProfileInstance.open();
})

/*функция вставляет данные из заполненной формы попапа в профиль и закрывает попап*/
function handleProfileFormSubmit(inputValues) {
  infoAboutUser.setUserInfo(inputValues);
  // отправка данных на сервер
  api.setUserId(inputValues.name, inputValues.about);
  popUpProfileInstance.close();
}

//заполняем шапку данными с сервера
userInfoPromise.then((result) => {
  infoAboutUser.setUserInfo(result);
  currentAvatar.src = result.avatar;
})



//ВАЛИДАЦИЯ форм

//создаем экземпляр класса FormValidator для формы заполнения новой карточки
const cardFormValidator = new FormValidator(config, '.popup__form_type_profile');
//запускаем проверку валидации этой формы через публичный метод класса
cardFormValidator.enableValidation(config);

//создаем экземпляр класса FormValidator для формы профайла
const profileFormValidator = new FormValidator(config, '.popup__form_type_edit-card');
//запускаем проверку валидации этой формы через публичный метод класса
profileFormValidator.enableValidation(config);
