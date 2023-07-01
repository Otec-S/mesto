import { editButton, currentName, currentStatus, currentAvatar, nameInput, nameStatus, addButton, config, makeTrashCanVisible, makeHeartToLikeActive } from '../scripts/utils.js';
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
        confirmPopUp.confirmDeleteCard().addEventListener('click', function deleteCurrentCard() {
          api.deleteCard(data._id)
            .then(() => { card.handleTrashCanToRemoveCard() })
            .catch((err) => {
              console.log('Что-то пошло не так', err)
            });
          confirmPopUp.confirmDeleteCard().removeEventListener('click', deleteCurrentCard);
          confirmPopUp.close();
        })
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
      items: apiCards.reverse(),
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
    section.renderItems();
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
  //отправляем карточку на сервер
  api.setCard(cardInfo.name, cardInfo.link)
    .then((res) => {
      //создаем карточку
      const element = makeElementOfClassCard(res);
      //показываем на ней корзинку
      makeTrashCanVisible(element);
      // методом addItem класса Section добавляем эту одну созданную карточку на страницу
      section.addItem(element)
    })
    .catch((err) => { `catch: ${err}` });
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

//возвращаем Promise с данными пользователя с сервера
const userInfoPromise = api.getUserId();

// создаем экземпляр класса Popup с селектором для Profile
const popUpProfileInstance = new PopupWithForm('.popup-profile', handleProfileFormSubmit);
// вызываем публичный метод setEventListeners из класса Popup, чтобы работало нажатие на крестик для закрывания окна
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

//=====ВАЛИДАЦИЯ форм=====

//создаем экземпляр класса FormValidator для формы заполнения новой карточки
const cardFormValidator = new FormValidator(config, '.popup__form_type_profile');
//запускаем проверку валидации этой формы через публичный метод класса
cardFormValidator.enableValidation(config);
//создаем экземпляр класса FormValidator для формы профайла
const profileFormValidator = new FormValidator(config, '.popup__form_type_edit-card');
//запускаем проверку валидации этой формы через публичный метод класса
profileFormValidator.enableValidation(config);

