import {AbstractComponent} from "../abstract-component";

export class EmojiElement extends AbstractComponent {
  constructor({ id = ``, value = ``, image = ``, checkedFlag = false}){
    super();
    this._id = id;
    this._value = value;
    this._image = image;
    this._checked = checkedFlag;
  }

  getTemplate() {
    return `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="${this._id}" value="${this._value}" ${this._checked ? "checked" : ""}>
  <label class="film-details__emoji-label" for="emoji-smile">
  <img src="${this._image}" width="30" height="30" alt="emoji">
  </label>`;
  }
}
