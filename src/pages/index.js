import { editButton, currentName, currentStatus, currentAvatar, nameInput, nameStatus, addButton, config, likesCounter } from '../scripts/utils.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
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

//=====GENERAL: MAKE AN INSTANCE OF A CARD=====

//делаем отдельную функцию по созданию экземпляра класса Card
function makeElementOfClassCard(data) {
  //второй параметр экземпляра Card - это и есть функция handleCardClick!!!
  //класс Card получил в параметр конструктора новую функцию handleDelete
  const card = new Card(data, (cardData) => { popUpBigPhoto.open(cardData) },
    {
      handleDelete:
        () => {
          //через api.deleteCard(data._id) удаляется карточка с сервера
          api.deleteCard(data._id)
            .catch((err) => {
              console.log('Что-то пошло не так', err)
            })
        }
    },

    {
      confirmDelete:
        () => {
          confirmPopUp.open()
        }
    }

  )

  const cardElement = card.generateCard();

  // значение счетчика лайков равно длине массива тех, кто лайкнул
  card.showLikesCounter().textContent = data.likes.length;

  api.getUserId().then((res) => {
    //если карточка не моя, значит айди ее собственника не равно моему айди
    //добавляем мусорной корзине такой карточкм свойство display: none
    if (data.owner._id !== res._id) {
      //присваемваем классу мусорной корзинки аттрибут display: none
      card.showTrashCan().classList.add('card__trash-can_inactive');
    }
  });

  return cardElement;
}

//////////////////////////////////////////////////////
//по тупому сначала

const confirmPopUp = new PopupWithConfirmation('.popup-delete-confirmation');
//вашаю обработчик клика на корзинку, найденную через класс PWC
// confirmPopUp.confirmDeleteCard().addEventListener('click', () => {
//   api.deleteCard('6495553a915f5d0902bf84ff');
//   confirmPopUp.close();
// })


//=====RENDER ALL SERVER CARDS=====

let section = {};
//с помощью классов Section и Card отрисовываем все карточки изначального массива [apiCards], который получен с сервера через API
api.getAppInfo()
  .then(([apiCards, usersId]) => {
    section = new Section({
      items: apiCards.reverse(),
      renderer: (data) => {
        const cardElement = makeElementOfClassCard(data);


        //!!!!!!!!!!!!
        //??? кривовато внизу ??? + не работает с удалением второй своей карточки

        // обработчик нажатия на корзину
        // card.showTrashCan().addEventListener('click', () => {
        //   //вашаю обработчик клика на корзинку, найденную через класс PWC
        //   confirmPopUp.confirmDeleteCard().addEventListener('click', () => {
        //     // evt.preventDefault();
        //     // api.deleteCard(data._id);
        //     card._handleTrashCanToRemoveCard();
        //     confirmPopUp.close();
        //   })
        //   confirmPopUp.open();
        // })

        // console.log(data);
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

//возвращаем Promise с данными пользователя с сервера (еще будет нужен?)
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

