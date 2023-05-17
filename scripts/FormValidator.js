class FormValidator {

  constructor(config, currentCheckingForm) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._currentCheckingForm = currentCheckingForm;

    //делаем ссылку на переданную в конструктор форму
    this._formElement = document.querySelector(this._currentCheckingForm);

    //проходимся по текущей форме и делаем массив inputList из всех инпутов текущей формы
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));

    //ссылка на кнопку текушего formElement
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  }

  enableValidation(config) {

    //проверка состояния кнопки при первой загрузке страницы.
    this._toggleButtonState(config, this._inputList, this._buttonElement);

    //чистим форму после ее отправки и тут же проверяем кнопку на валидность, делая ее невалидной
    this._formElement.addEventListener('submit', () => {
      this._formElement.reset();
      this._toggleButtonState(config, this._inputList, this._buttonElement);
    });

    //проходим по массиву всех инпутов inputList
    this._inputList.forEach((inputElement) => {
      //вешаем на каждый input слушатель ввода
      inputElement.addEventListener('input', () => {
        //вызываем функцию checkInputValidity
        this._checkInputValidity(config, this._formElement, inputElement);
        //вызываем функцию toggleButtonState в теле обработчика события input. Передаём ей массив полей формы и элемент кнопки. Такой вызов проверит состояние кнопки при каждом изменении символа в любом из полей.
        this._toggleButtonState(config, this._inputList, this._buttonElement);
      });
    });
  };


  //ВАЛИДАЦИЯ ПОЛЕЙ ВВОДА
  //функция вызывает показ ошибок при невалидации
  _checkInputValidity(config, formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(config, this._formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(config, this._formElement, inputElement);
    }
  };

  //показываем невалидное состаяние
  _showInputError(config, formElement, inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#error-${inputElement.id}`);
    inputElement.classList.add(config.inputErrorClass);
    errorElement.textContent = errorMessage;
    // errorElement.classList.add('form__input-error_active');
  };

  //показываем валидное состаяние
  _hideInputError(config, formElement, inputElement) {
    const errorElement = this._formElement.querySelector(`#error-${inputElement.id}`);
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
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  };

  //функция переключения состояния кнопок отправки
  // Первый параметр — массив полей, второй — кнопка.
  _toggleButtonState(config, inputList, buttonElement) {
    if (this._hasInvalidInput(this._inputList)) {
      // сделай кнопку неактивной
      this._buttonElement.setAttribute('disabled', '');
      this._buttonElement.classList.add(config.inactiveButtonClass);
    } else {
      // иначе сделай кнопку активной
      this._buttonElement.removeAttribute('disabled');
      this._buttonElement.classList.remove(config.inactiveButtonClass);
    }
  };
};


export { FormValidator };
