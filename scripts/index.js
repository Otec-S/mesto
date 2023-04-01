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

//объект с данными карточки
// const cardData = {
//   name,
//   thumbnailUrl,
//   channel: {
//     name: "Wild nature",
//   },
// };

// функция создает карточку из шаблона
function createCard() {
  //клонируем узел с карточкой из шаблона
  const cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);

  const cardName = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__photo");

  return cardElement;
};

//рисуем карточку в начале блока карт
function renderCardElement(cardElement) {
  cardsGrid.prepend(cardElement);
};

//первоначальная отрисовка шести карт из массива initialCards
/*??????? тут ошибка, так как рисует шесть карт Карачеевска, который в шаблоне. Пробегает по всем шести карточкам изначальным верно, но просто рисует не их, а Карачаевск из шаблона*/
initialCards.forEach((item) => {
  const element = createCard(item);
  renderCardElement(element);
});

// const initialCards = [
//   {
//     name: 'Архыз',
//     link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
//   },
// ]


// const createVideoElement = (videoData) => {
//   const videoElement = videoTemplate.content
//     .querySelector(".video")
//     .cloneNode(true);

//   const videoName = videoElement.querySelector(".video__name");
//   const videoImage = videoElement.querySelector(".video__image");
//   const channelName = videoElement.querySelector(".video__channel-name");

//   videoName.textContent = videoData.name;
//   videoImage.src = videoData.thumbnailUrl;
//   videoImage.alt = videoData.name;
//   channelName.textContent = videoData.channel.name;

//   const deleteButton = videoElement.querySelector(
//     ".video__overlay-delete-icon"
//   );
//   const likeButton = videoElement.querySelector(
//     ".video__overlay-favorite-icon"
//   );

//   const handleDelete = () => {
//     videoElement.remove();
//   };

//   const handleLike = () => {
//     likeButton.classList.toggle("video__overlay-favorite-icon_active");
//   };

//   deleteButton.addEventListener("click", handleDelete);

//   likeButton.addEventListener("click", handleLike);

//   return videoElement;
// };



// функция открывает окно попап
function popupToOpen() {
  popUp.classList.add('popup_opened');
}

// функция закрывает окно попап
function popupToClose() {
  popUp.classList.remove('popup_opened');
}

/*функция вставляет данные из заполненной формы попапа в профиль и закрывает попап*/
function handleFormSubmit(evt) {
  evt.preventDefault();
  currentName.textContent = nameInput.value;
  currentStatus.textContent = nameStatus.value;
  popupToClose();
}

//слушатель события клика на кнопку editButton
editButton.addEventListener('click', () => {
  popupToOpen();
  nameInput.value = currentName.textContent;
  nameStatus.value = currentStatus.textContent;
});

//слушатель события клика на крестик закрывания попапа
crossToClose.addEventListener('click', popupToClose);

//слушатель события нажатия на кнопку "Сохранить"
formElement.addEventListener('submit', handleFormSubmit);
