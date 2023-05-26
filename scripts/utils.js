// ПЕРЕМЕННЫЕ ДЛЯ POP UP BIG PHOTO
//делаю ссылку на popup с большим фото
export const popUpBigPhoto = document.querySelector('.popup-big-photo');
//делаю ссылку на <img> в этом попапе BIG PHOTO
export const pictureOfPopUpBigPhoto = popUpBigPhoto.querySelector('.popup__big-photo-picture');
//делаю ссылку на <figurecaption> в этом попапе BIG PHOTO
export const titleOfPopUpBigPhoto = popUpBigPhoto.querySelector('.popup__big-photo-caption');
//ссылка на псевдомассив NodeList всех крестиков закрывания попапов
export const crossesToClose = document.querySelectorAll('.popup__close-cross');

// // общая функция открывает окно попап
// export function openPopUp(popName) {
//   popName.classList.add('popup_opened');
//   //вешаем слушатель функции на эскейп на этот элемент
//   document.addEventListener('keydown', closePopUpByEscape);
// };

// //закрытие popup по клику на escape
// export function closePopUpByEscape(evt) {
//   if (evt.key === 'Escape') {
//     //ищем открытый popup по его модификатору
//     const popUpOpened = document.querySelector('.popup_opened');
//     //команда закрыть именно этот открытый popup
//     closePopUp(popUpOpened);
//   }
// };

// // общая функция закрывает окно попап
// export function closePopUp(popName) {
//   popName.classList.remove('popup_opened');
//   document.removeEventListener('keydown', closePopUpByEscape);
// }

// //закрытие popup по клику на overlay
// export function closePopUpByClickToOverlay() {
//   document.addEventListener('mousedown', function (evt) {
//     if (evt.target.classList.contains('popup_opened')) {
//       closePopUp(evt.target);
//     }
//   })
// }
