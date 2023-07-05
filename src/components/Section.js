//отвечает за отрисовку элементов на странице
//items — это массив данных, которые нужно добавить на страницу при инициализации класса
//renderer — это функция, которая отвечает за создание и отрисовку данных на странице
//containerSelector - селектор контейнера, в который нужно добавлять созданные элементы

//Лучше массив карточек передавать не как параметр конструктора, а как параметр метода renderItems.
// Когда данные будут приходить с сервера, для их отображения можно будет вызвать cardsSection.renderItems(cards), передав полученные данные как параметр метода.

export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  //cодержит публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер.
  addItem(element) {
    this._container.prepend(element);
  }

  //отрисовка массива карточек
  renderItems(items) {
    items.forEach(item => {
      this._renderer(item);
    });
  }
}
