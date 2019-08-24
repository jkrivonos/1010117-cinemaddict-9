import {createElement} from '../utils.js';

export class Footer {
  constructor() {
    this._element = null;
    /*здесь храниться ссылка на созданный элемент*/
  }

  getElement(filmsAmount) {
    if (!this._element) {
      this._element = createElement(this.getTemplate(filmsAmount));
    }
    return this._element;
  }

  removeElement() {
    if (this._element) {
      this._element = null;
    }
  }

  getTemplate(filmsAmount) {
    return `<p>${filmsAmount} movies inside</p>`
  }
}
