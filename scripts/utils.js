// общая функция открывает окно попап
export default function openPopUp(popName) {
  popName.classList.add('popup_opened');
  //вешаем слушатель функции на эскейп на этот элемент
  document.addEventListener('keydown', closePopUpByEscape);
};

