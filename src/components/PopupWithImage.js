import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  //наследуется от Popup, вызывает его конструктор, в который передает нужный параметр - смотреть в сторону super.
  constructor(popupSelector) {
    super(popupSelector);
    //делаю ссылку на <img> в попапе BIG PHOTO
    this._image = this._popup.querySelector('.popup__big-photo-picture');
    //делаю ссылку на <figurecaption> в этом попапе BIG PHOTO
    this._caption = this._popup.querySelector('.popup__big-photo-caption');
  }

  open(cardData) {
    this._image.src = cardData.link;
    this._caption.textContent = cardData.name;
    this._image.alt = cardData.name;
    super.open();
  }
}

