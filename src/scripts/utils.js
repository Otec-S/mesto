// ПЕРЕМЕННЫЕ ДЛЯ POPUP PROFILE
export const popUpProfile = document.querySelector('.popup-profile');
export const editButton = document.querySelector('.profile__edit-button');
// уже имеющиеся в профиле имя и статус
export const currentName = document.querySelector('.profile__title');
export const currentStatus = document.querySelector('.profile__subtitle');
//текущий аватар
export const currentAvatar = document.querySelector('.profile__avatar');
//имя и статус в формах для заполнения попапа
export const nameInput = popUpProfile.querySelector(".popup__input_type_name");
export const nameStatus = popUpProfile.querySelector(".popup__input_type_status");

// ПЕРЕМЕННЫЕ ДЛЯ POPUP NEW CARD
export const addButton = document.querySelector('.profile__add-button');

// ПЕРЕМЕННЫЕ ДЛЯ ВАЛИДАЦИИ ФОРМ
export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_invalid',
}
