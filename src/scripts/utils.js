// ПЕРЕМЕННЫЕ ДЛЯ POPUP PROFILE
export const popUpProfile = document.querySelector('.popup-profile');
export const editButton = document.querySelector('.profile__edit-button');
// уже имеющиеся в профиле имя и статус
export const currentName = document.querySelector('.profile__title');
export const currentStatus = document.querySelector('.profile__subtitle');
//имя и статус в формах для заполнения попапа
export const nameInput = popUpProfile.querySelector(".popup__input_type_name");
export const nameStatus = popUpProfile.querySelector(".popup__input_type_status");
//ссылка на поле для ввода нового адреса нового аватара
export const avatarLink = document.querySelector('.profile__avatar-link');

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

//ФУНКЦИИ
//делает видимой мусорную корзинку
export function makeTrashCanVisible(element) {
  element.querySelector('.card__trash-can').classList.remove('card__trash-can_inactive');
}

//делает черным/активным сердечко для лайков
export function makeHeartToLikeActive(element) {
  element.querySelector('.card__heart').classList.add('card__heart_active');
}
