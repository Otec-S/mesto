let popUp = document.querySelector('.popup');
let crossToClose = popUp.querySelector('.popup__close-cross');
let editButton = document.querySelector('.profile__edit-button');
//уже имеющиеся в профиле имя и статус
let currentName = document.querySelector('.profile__title');
let currentStatus = document.querySelector('.profile__subtitle');
//имя и статус в формах для заполнения попапа
let nameInput = popUp.querySelector(".popup__input_type_name");
let nameStatus = popUp.querySelector(".popup__input_type_status");
//ссылка на форму из попапа
let formElement = popUp.querySelector('.popup__form');

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
