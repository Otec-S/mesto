//делаем массив formList на все формы в документе
const formList = Array.from(document.querySelectorAll('.popup__form'));


//делаем массив fieldsetList из всех input в массиве formList
//сейчас в fieldsetList два массива - один из попапа Profile, второй - из попапа New Card
formList.forEach((formElement) => {
  const fieldsetList = Array.from(formElement.querySelectorAll('.popup__input'));
  fieldsetList.forEach(function(input) {
    input.addEventListener('input', function(e) {




    })
  });

})



