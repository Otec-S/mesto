let popUp = document.querySelector('.popup');
let closeCross = popUp.querySelector('.popup__close-cross');
let editButton = document.querySelector('.profile__edit-button');

let currentName = document.querySelector('.profile__title');
let currentStatus = document.querySelector('.profile__subtitle');

let nameInput = popUp.querySelector(".popup__input_type_name");
let nameStatus = popUp.querySelector(".popup__input_type_status");

let formElement = popUp.querySelector('.popup__form');

function handleFormSubmit (evt) {
  evt.preventDefault();
  currentName.textContent = nameInput.value;
  currentStatus.textContent = nameStatus.value;
  popUp.classList.remove('popup_opened');
}

editButton.addEventListener('click', () => {
   popUp.classList.add('popup_opened');
   nameInput.value = currentName.textContent;
   nameStatus.value = currentStatus.textContent;
});

closeCross.addEventListener('click', () => {
  popUp.classList.remove('popup_opened');
})

formElement.addEventListener('submit', handleFormSubmit);
