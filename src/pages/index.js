import { editButton, currentName, currentStatus, nameInput, nameStatus, addButton, config, makeTrashCanVisible, makeHeartToLikeActive, avatarLink } from '../scripts/utils.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import UserInfo from '../components/UserInfo.js';
import { FormValidator } from '../components/FormValidator.js';
import Api from '../components/Api.js';

import './index.css'; // добавьте импорт главного файла стилей

//=====POPUP DELETE CONFIRMATION=====
const confirmPopUp = new PopupWithConfirmation('.popup-delete-confirmation');
confirmPopUp.setEventListeners();

//=====API=====
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-68',
  headers: {
    authorization: '752cb7e1-403b-438a-9b48-05f4c5ae9d75'
  }
});

//=====GENERAL: MAKE AN INSTANCE OF A CARD=====

//делаем отдельную функцию по созданию экземпляра класса Card
function makeElementOfClassCard(data) {
  const card = new Card(data,
    {
      handleCardClick: (cardData) => {
        popUpBigPhoto.open(cardData)
      }
    },
    {
      confirmDelete: () => {
        confirmPopUp.open();
        confirmPopUp.handleSubmitCallback(() => {
          confirmPopUp.renderLoading(true);
          api.deleteCard(data._id)
            .then(() => {
              card.handleTrashCanToRemoveCard();
              confirmPopUp.close();
            })
            .catch((err) => {
              console.log('Что-то пошло не так', err)
            })
            .finally(() => { confirmPopUp.renderLoading(false) });
        }
        )
      }
    },
    {
      putHeartToLike: () => {
        api.putLike(data._id)
          .then((res) => {
            card.showLikesCounter().textContent = res.likes.length;
            card.showHeartToLike().classList.add('card__heart_active');
          })
          .catch((err) => {
            console.log('Что-то пошло не так', err)
          });
      }
    },
    {
      deleteHeartToLike: () => {
        api.deleteLike(data._id)
          .then((res) => {
            card.showLikesCounter().textContent = res.likes.length;
            card.showHeartToLike().classList.remove('card__heart_active');
          })
          .catch((err) => {
            console.log('Что-то пошло не так', err)
          });
      }
    }
  )

  const cardElement = card.generateCard();

  // значение счетчика лайков равно длине массива тех, кто лайкнул
  card.showLikesCounter().textContent = data.likes.length;

  return cardElement;
}

//=====RENDER ALL SERVER CARDS=====

let section = {};
//с помощью классов Section и Card отрисовываем все карточки изначального массива [apiCards], который получен с сервера через API
api.getAppInfo()
  .then(([apiCards, usersId]) => {
    section = new Section({
      renderer: (data) => {
        const cardElement = makeElementOfClassCard(data);

        // если карточка не моя, значит айди ее собственника не равно моему айди
        if (data.owner._id === usersId._id) {
          //убираем с класса мусорной корзинки аттрибут display: none
          makeTrashCanVisible(cardElement);
        }

        //лайкнутая мною карточка должна иметь активное сердечко после перезагрузки страницы
        data.likes.forEach(element => {
          if (element._id.includes(usersId._id)) {
            makeHeartToLikeActive(cardElement);
          }
        })

        section.addItem(cardElement);
      }
    }, ".cards");

    //отрисовываем массив карточек с сервера
    section.renderItems(apiCards.reverse());

    //заполняем шапку (профиль и аватар пользователя) данными с сервера
    infoAboutUser.setUserInfo(usersId);
    infoAboutUser.changeAvatar(usersId);
  })
  .catch((err) => {
    console.log('Что-то пошло не так', err)
  });

//===== NEW CARD =====

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
  popUpNewCard.renderLoading(true);
  //отправляем карточку на сервер
  api.setCard(cardInfo.name, cardInfo.link)
    .then((res) => {
      //создаем карточку
      const element = makeElementOfClassCard(res);
      //показываем на ней корзинку
      makeTrashCanVisible(element);
      // методом addItem класса Section добавляем эту одну созданную карточку на страницу
      section.addItem(element);
      popUpNewCard.close();
    })
    .catch((err) => {
      console.log('Что-то пошло не так', err)
    })
    .finally(() => { popUpNewCard.renderLoading(false) });
}

//=====BIG PHOTO=====

//создаем экземпляр класса Popup с селектором для большого фото
const popUpBigPhoto = new PopupWithImage('.popup-big-photo');
//вызываем публичный метод setEventListeners из класса Popup
popUpBigPhoto.setEventListeners();

//=====PROFILE=====

//экземпляр класса UserInfo с текущими пустыми значениями name и about из html
const infoAboutUser = new UserInfo(currentName, currentStatus);

// создаем экземпляр класса Popup с селектором для Profile
const popUpProfileInstance = new PopupWithForm('.popup-profile', handleProfileFormSubmit);
// вызываем публичный метод setEventListeners из класса Popup, чтобы работало нажатие на крестик для закрывания окна
popUpProfileInstance.setEventListeners();

// обработчик клика по кнопке Edit
editButton.addEventListener('click', () => {
  //передаем данные из _getInputValues в колбэк сабмита формы
  const userInfo = infoAboutUser.getUserInfo();
  nameInput.value = userInfo.name;
  nameStatus.value = userInfo.about;
  popUpProfileInstance.open();
})

//функция вставляет данные из заполненной формы попапа в профиль и закрывает попап
function handleProfileFormSubmit(inputValues) {
  popUpProfileInstance.renderLoading(true);
  // отправка данных на сервер
  api.setUserId(inputValues.name, inputValues.about)
    .then(() => {
      infoAboutUser.setUserInfo(inputValues);
      popUpProfileInstance.close();
    })
    .catch((err) => {
      console.log('Что-то пошло не так', err)
    })
    .finally(() => { popUpProfileInstance.renderLoading(false) })
};

//=====PROFILE AVATAR=====

//экземпляр класса с функцией замены аватара
const popUpToChangeAvatar = new PopupWithForm('.popup-change-avatar', handleAvatarChangeSubmit);
popUpToChangeAvatar.setEventListeners();

// обработчик клика по карандашу
avatarLink.addEventListener('click', () => {
  popUpToChangeAvatar.open();
})

//функция вставляет данные из заполненной формы попапа в аватар и закрывает попап
function handleAvatarChangeSubmit(avatarInfo) {
  popUpToChangeAvatar.renderLoading(true);
  api.setAvatar(avatarInfo.link)
    .then((res) => {
      infoAboutUser.changeAvatar(res);
      popUpToChangeAvatar.close();
    })
    .catch((err) => {
      console.log('Что-то пошло не так', err)
    })
    .finally(() => { popUpToChangeAvatar.renderLoading(false) });
};

//=====ВАЛИДАЦИЯ форм=====

//создаем экземпляр класса FormValidator для формы заполнения новой карточки
const cardFormValidator = new FormValidator(config, '.popup__form_type_profile');
//запускаем проверку валидации этой формы через публичный метод класса
cardFormValidator.enableValidation(config);
//создаем экземпляр класса FormValidator для формы профайла
const profileFormValidator = new FormValidator(config, '.popup__form_type_edit-card');
//запускаем проверку валидации этой формы через публичный метод класса
profileFormValidator.enableValidation(config);
//создаем экземпляр класса FormValidator для формы смены аватара
const avatarFormValidator = new FormValidator(config, '.popup__form_type_avatar');
//запускаем проверку валидации этой формы через публичный метод класса
avatarFormValidator.enableValidation(config);
