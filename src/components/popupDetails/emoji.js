import {AbstractComponent} from "../abstract-component";

export class EmojiElement extends AbstractComponent {
  constructor({ id = ``, value = ``, image = ``, checked = false}){
    super();
    this._id = id;
    this._value = value;
    this._image = image;
    this._checked = checked;
  }

  getTemplate() {
    return `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="${this._id}" value="${this._value}" ${this._checked ? "checked=\"\"" : ""}>
  <label class="film-details__emoji-label" for="${this._id}">
  <img src="${this._image}" width="30" height="30" alt="emoji">
  </label>`;
  }
}
