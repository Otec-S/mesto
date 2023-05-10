// //ОСНОВНАЯ ФУНКЦИЯ ПРОВЕРКИ ВАЛИДАЦИИ
// function enableValidation(config) {

//   //делаем массив formList на две формы в документе
//   const formList = Array.from(document.querySelectorAll(config.formSelector));

//   //проходимся по массиву formList и на каждый ввод в input явно вызываем функцию setEventListeners
//   formList.forEach((formElement) => {
//     setEventListeners(config, formElement);
//   });
// };


// //ВТОРИЧНАЯ ФУНКЦИЯ ПРОВЕРКИ ВАЛИДНОСТИ
// function setEventListeners(config, formElement) {
//   //проходимся по formList и делаем массив inputList из всех инпутов
//   const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));

//   //ссылка на кнопку текушего formElement
//   const buttonElement = formElement.querySelector(config.submitButtonSelector);

//   //проверка состояния кнопки при первой загрузке страницы.
//   toggleButtonState(config, inputList, buttonElement);

//   //чистим форму после ее отправки и тут же проверяем кнопку на валидность, делая ее невалидной
//   formElement.addEventListener('submit', function () {
//     formElement.reset();
//     toggleButtonState(config, inputList, buttonElement);
//   });

//   //проходим по массиву всех инпутов inputList
//   inputList.forEach((inputElement) => {
//     //вешаем на каждый input слушатель ввода
//     inputElement.addEventListener('input', function () {
//       //вызываем функцию checkInputValidity
//       checkInputValidity(config, formElement, inputElement);
//       //вызываем функцию toggleButtonState в теле обработчика события input. Передаём ей массив полей формы и элемент кнопки. Такой вызов проверит состояние кнопки при каждом изменении символа в любом из полей.
//       toggleButtonState(config, inputList, buttonElement);
//     });
//   });
// };


// //ВАЛИДАЦИЯ ПОЛЕЙ ВВОДА
// //функция вызывает показ ошибок при невалидации
// function checkInputValidity(config, formElement, inputElement) {
//   if (!inputElement.validity.valid) {
//     showInputError(config, formElement, inputElement, inputElement.validationMessage);
//   } else {
//     hideInputError(config, formElement, inputElement);
//   }
// };

// //показываем невалидное состаяние
// function showInputError(config, formElement, inputElement, errorMessage) {
//   const errorElement = formElement.querySelector(`#error-${inputElement.id}`);
//   inputElement.classList.add(config.inputErrorClass);
//   errorElement.textContent = errorMessage;
//   // errorElement.classList.add('form__input-error_active');
// };

// //показываем валидное состаяние
// function hideInputError(config, formElement, inputElement) {
//   const errorElement = formElement.querySelector(`#error-${inputElement.id}`);
//   inputElement.classList.remove(config.inputErrorClass);
//   // errorElement.classList.remove('form__input-error_active');
//   errorElement.textContent = '';
// };

// //ВАЛИДАЦИЯ КНОПОК ОТПРАВКИ
// //функция переключения состояния кнопки

// // Если поле не валидно, колбэк вернёт true
// // Обход массива прекратится и вся функция
// // hasInvalidInput вернёт true
// function hasInvalidInput(inputList) {
//   return inputList.some(function (inputElement) {
//     return !inputElement.validity.valid;
//   });
// };

// //функция переключения состояния кнопок отправки
// // Первый параметр — массив полей, второй — кнопка.
// function toggleButtonState(config, inputList, buttonElement) {
//   if (hasInvalidInput(inputList)) {
//     // сделай кнопку неактивной
//     buttonElement.setAttribute('disabled', '');
//     buttonElement.classList.add(config.inactiveButtonClass);
//   } else {
//     // иначе сделай кнопку активной
//     buttonElement.removeAttribute('disabled');
//     buttonElement.classList.remove(config.inactiveButtonClass);
//   }
// };

//запускаем основную функцию валидации
// enableValidation({
//   formSelector: '.popup__form',
//   inputSelector: '.popup__input',
//   submitButtonSelector: '.popup__submit',
//   inactiveButtonClass: 'popup__submit_disabled',
//   inputErrorClass: 'popup__input_invalid',
// });
