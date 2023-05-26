import Popup from "./Popup";
import { popUpBigPhoto, pictureOfPopUpBigPhoto, titleOfPopUpBigPhoto } from "./utils.js";


export default class PopupWithImage extends Popup {
  //наследуется от Popup, вызывает его конструктор, в который передает нужный параметр - смотреть в сторону super.
  constructor(cardData, popupSelector) {
    super(popupSelector);
    this._name = cardData.name;
    this._link = cardData.link;
  }


  open() {
    pictureOfPopUpBigPhoto.src = this._link;
    pictureOfPopUpBigPhoto.alt = this._name;
    titleOfPopUpBigPhoto.textContent = this._name;
    super.open(popUpBigPhoto);
  }


}
//a.	Должен перезаписывать родительский метод open. В методе open класса PopupWithImage нужно вставлять в попап картинку с src изображения и подписью к картинке.
//используя логику полиморфизма надо перезаписать метод open, сначала сделать в нем то что описано в ТЗ, а потом вызвать метод родительского класса чтобы открыть попап

//  _handleClosePopup() {
  //   popupCaption.textContent = '';
  //   super._handleClosePopup();
  // }

// };
