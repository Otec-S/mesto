//отвечает за отрисовку элементов на странице
//items — это массив данных, которые нужно добавить на страницу при инициализации класса
//renderer — это функция, которая отвечает за создание и отрисовку данных на странице
//containerSelector - селектор контейнера, в который нужно добавлять созданные элементы
export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  //cодержит публичный метод addItem, который принимает DOM-элемент и добавляет его в контейнер.
  addItem(element) {
    this._container.prepend(element);
  }

  //отрисовка массива карточек
  renderItems() {
    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }
}
