//ОСНОВНАЯ ФУНКЦИЯ ПРОВЕРКИ ВАЛИДАЦИИ
function enableValidation() {

  //делаем массив formList на две формы в документе
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  console.log("formList это");
  console.log(formList);

    //проходимся по массиву inputList и на каждый ввод в input явно вызываем функцию setEventListeners
  formList.forEach((formElement) => {

     setEventListeners(formElement);
  });
};


//ВТОРИЧНАЯ ФУНКЦИЯ ПРОВЕРКИ ВАЛИДНОСТИ (вероятно, для упрощения)
function setEventListeners(formElement) {
  //проходимся по формлисту и делаем массив из всех импутов
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  console.log("inputList это");
  console.log(inputList);
  //??? ссылка на кнопку текушего formElement
  const buttonElement = formElement.querySelector('.popup__submit');
  console.log("buttonElement это");
  console.log(buttonElement);
  // ???Вызовите функцию toggleButtonState после определения константы buttonElement. Это проверит состояние кнопки при первой загрузке страницы. Тогда кнопка перестанет быть активной до ввода данных в одно из полей.
  toggleButtonState(inputList, buttonElement);

  //проходим по массиву всех импутов inputList
  inputList.forEach((inputElement) => {
    //вешаем на каждый input слушатель ввода
    inputElement.addEventListener('input', function () {
      //вызываем функцию checkInputValidity
      checkInputValidity(formElement, inputElement);
      // Вызовите функцию toggleButtonState в теле обработчика события input. Передайте ей массив полей формы и элемент кнопки. Такой вызов проверит состояние кнопки при каждом изменении символа в любом из полей.
      toggleButtonState(inputList, buttonElement);
    });
  });
};






/********************************** */

//ВАЛИДАЦИЯ ПОЛЕЙ ВВОДА
// //функция проверки каждого вводимого в поле символа
// function checkInputValidity(input) {
//   //спорненько, что тут глобальный поиск, но пока лучше не придумал
//   const errorElement = document.querySelector(`#error-${input.id}`);

//   if (input.validity.valid) {
//     //если валидно
//     setInputValidState(input, errorElement);

//   } else {
//     //если невалидно
//     setInputInvalidState(input, errorElement);
//   }
// };

//функция вызывает показ ошибок при невалидации
function checkInputValidity(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

//показываем невалидное состаяние
function showInputError(formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`#error-${inputElement.id}`);
  inputElement.classList.add('popup__input_invalid');
  errorElement.textContent = errorMessage;
  // errorElement.classList.add('form__input-error_active');
};

//показываем валидное состаяние
function hideInputError(formElement, inputElement) {
  const errorElement = formElement.querySelector(`#error-${inputElement.id}`);
  inputElement.classList.remove('popup__input_invalid');
  // errorElement.classList.remove('form__input-error_active');
  errorElement.textContent = '';
};



/******************************************** */

//ВАЛИДАЦИЯ КНОПОК ОТПРАВКИ
//функция переключения состояния кнопки

// Если поле не валидно, колбэк вернёт true
// Обход массива прекратится и вся функция
// hasInvalidInput вернёт true
function hasInvalidInput(inputList) {
  return inputList.some(function (inputElement) {
    return !inputElement.validity.valid;
  });
};

//функция переключения состояния кнопок отправки
// Первый параметр — массив полей, второй — кнопка «Далее».
function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    // сделай кнопку неактивной
    buttonElement.setAttribute('disabled', '');
    buttonElement.classList.add('popup__submit_disabled');
  } else {
    // иначе сделай кнопку активной
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove('popup__submit_disabled');
  }
};

// function toggleButtonValidity(input) {
//   //получаем ссылку на массив из двух кнопок submit
//   const submitButton = Array.from(document.querySelectorAll('.popup__submit'));
//   //проверяем каждый элемент массива и меняем состяние кнопки от этого
//   submitButton.forEach((buttonItem) => {
//     if (input.checkValidity()) {
//       enableButton(buttonItem);
//     } else {
//       disableButton(buttonItem);
//     }
//   })
// };

// //делаем кнопку отправки активной
// function enableButton(button) {
//   button.removeAttribute('disabled');
//   button.classList.remove('popup__submit_disabled');
// };

// //делаем кнопку отправки неактивной
// function disableButton(button) {
//   button.setAttribute('disabled', '');
//   button.classList.add('popup__submit_disabled');
// };


/*************************** */

//запускаем основную функцию валидации
enableValidation();
