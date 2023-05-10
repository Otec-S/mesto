export default class FormValidator {

  // formSelector = '.popup__form', inputSelector = '.popup__input', submitButtonSelector = '.popup__submit', inactiveButtonClass = 'popup__submit_disabled', inputErrorClass = 'popup__input_invalid'

  constructor(config, currentCheckingForm) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    //ссылка на HTML-элемент проверяемой формы?
    //ссылка на форму, которую необходимо валидировать?
    this._currentCheckingForm = currentCheckingForm;
  }



  //единственный публичный метод класса
  enableValidation(config) {

    //делаем массив formList на две формы в документе
    const formList = Array.from(document.querySelectorAll(config.formSelector));

    //проходимся по массиву formList и на каждый ввод в input явно вызываем функцию setEventListeners
    formList.forEach((formElement) => {
      this._setEventListeners(config, formElement);
    });
  };


  //ВТОРИЧНАЯ ФУНКЦИЯ ПРОВЕРКИ ВАЛИДНОСТИ
  _setEventListeners(config, formElement) {
    //проходимся по formList и делаем массив inputList из всех инпутов
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));

    //ссылка на кнопку текушего formElement
    const buttonElement = formElement.querySelector(config.submitButtonSelector);

    //проверка состояния кнопки при первой загрузке страницы.
    this._toggleButtonState(config, inputList, buttonElement);

    //чистим форму после ее отправки и тут же проверяем кнопку на валидность, делая ее невалидной
    formElement.addEventListener('submit', function () {
      formElement.reset();
      this._toggleButtonState(config, inputList, buttonElement);
    });

    //проходим по массиву всех инпутов inputList
    inputList.forEach((inputElement) => {
      //вешаем на каждый input слушатель ввода
      inputElement.addEventListener('input', function () {
        //вызываем функцию checkInputValidity
        this._checkInputValidity(config, formElement, inputElement);
        //вызываем функцию toggleButtonState в теле обработчика события input. Передаём ей массив полей формы и элемент кнопки. Такой вызов проверит состояние кнопки при каждом изменении символа в любом из полей.
        this._toggleButtonState(config, inputList, buttonElement);
      });
    });
  };


  //ВАЛИДАЦИЯ ПОЛЕЙ ВВОДА
  //функция вызывает показ ошибок при невалидации
  _checkInputValidity(config, formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(config, formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(config, formElement, inputElement);
    }
  };

  //показываем невалидное состаяние
  _showInputError(config, formElement, inputElement, errorMessage) {
    const errorElement = formElement.querySelector(`#error-${inputElement.id}`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    // errorElement.classList.add('form__input-error_active');
  };

  //показываем валидное состаяние
  _hideInputError(config, formElement, inputElement) {
    const errorElement = formElement.querySelector(`#error-${inputElement.id}`);
    inputElement.classList.remove(config.inputErrorClass);
    // errorElement.classList.remove('form__input-error_active');
    errorElement.textContent = '';
  };

  //ВАЛИДАЦИЯ КНОПОК ОТПРАВКИ
  //функция переключения состояния кнопки

  // Если поле не валидно, колбэк вернёт true
  // Обход массива прекратится и вся функция
  // hasInvalidInput вернёт true
  _hasInvalidInput(inputList) {
    return inputList.some(function (inputElement) {
      return !inputElement.validity.valid;
    });
  };

  //функция переключения состояния кнопок отправки
  // Первый параметр — массив полей, второй — кнопка.
  _toggleButtonState(config, inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
      buttonElement.setAttribute('disabled', '');
      buttonElement.classList.add(config.inactiveButtonClass);
    } else {
      // иначе сделай кнопку активной
      buttonElement.removeAttribute('disabled');
      buttonElement.classList.remove(config.inactiveButtonClass);
    }
  };


};


