function setInputValidState(input, errorElement) {
  input.classList.remove('popup__input_invalid');
  errorElement.textContent = '';
};


function setInputInvalidState(input, errorElement) {
  input.classList.add('popup__input_invalid');
  errorElement.textContent = input.validationMessage;
};



//функция проверки каждого вводимого в поле символа
function checkInputValidity(input) {
  //спорненько, что тут глобальный поиск, но пока лучше не придумал
  const errorElement = document.querySelector(`#error-${input.id}`);

  if (input.validity.valid) {
    //если валидно
    setInputValidState(input, errorElement);

  } else {
    //если невалидно
    setInputInvalidState(input, errorElement);
  }

};


//общая функция проверки валидации
function enableValidation() {


  //делаем массив formList на все формы в документе
  const formList = Array.from(document.querySelectorAll('.popup__form'));

  //делаем массив fieldsetList из всех input в массиве formList
  //сейчас в fieldsetList два массива - один из попапа Profile, второй - из попапа New Card
  formList.forEach((formElement) => {
    const fieldsetList = Array.from(formElement.querySelectorAll('.popup__input'));

    //проходимся по массиву fieldsetlist и на каждый ввод в input явно вызываем функцию checkInputValidity - валидация каждого вводимого символа
    fieldsetList.forEach(function (input) {
      //вешаем слушатель ввода на каждый ввод символа
      input.addEventListener('input', () => {

        checkInputValidity(input);

      })
    });
  })

};

enableValidation();
