const popUp = document.querySelector('.popup');
const crossToClose = popUp.querySelector('.popup__close-cross');
const editButton = document.querySelector('.profile__edit-button');
//уже имеющиеся в профиле имя и статус
const currentName = document.querySelector('.profile__title');
const currentStatus = document.querySelector('.profile__subtitle');
//имя и статус в формах для заполнения попапа
const nameInput = popUp.querySelector(".popup__input_type_name");
const nameStatus = popUp.querySelector(".popup__input_type_status");
//ссылка на форму из попапа
const formElement = popUp.querySelector('.popup__form');


/*************************************** */


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

//делаем цикл forEach, чтобы пробежаться во всем элементам изначального массива
initialCards.forEach((item) => {
  //клонируем узел с карточкой из шаблона
  const cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);
  const cardName = cardElement.querySelector(".card__title");
  const cardPhoto = cardElement.querySelector(".card__photo");
  cardName.textContent = item.name;
  cardPhoto.src = item.link;
  //рисуем карточку на странице
  cardsGrid.append(cardElement);
});


/******************** */



// функция открывает окно попап
function popupToOpen(pop) {
  pop.classList.add('popup_opened');
}

// функция закрывает окно попап
function popupToClose(pop) {
  pop.classList.remove('popup_opened');
}

/*функция вставляет данные из заполненной формы попапа в профиль и закрывает попап*/
function handleFormSubmit(evt) {
  evt.preventDefault();
  currentName.textContent = nameInput.value;
  currentStatus.textContent = nameStatus.value;
  popupToClose(popUp);
}

//слушатель события клика на кнопку editButton
editButton.addEventListener('click', () => {
  popupToOpen(popUp);
  nameInput.value = currentName.textContent;
  nameStatus.value = currentStatus.textContent;
});

//слушатель события клика на крестик закрывания попапа
crossToClose.addEventListener('click', () => {
  popupToClose(popUp);
});

//слушатель события нажатия на кнопку "Сохранить"
formElement.addEventListener('submit', handleFormSubmit);
