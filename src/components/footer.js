import {createElement} from '../utils.js';

export class Footer {
  constructor() {
    this._element = null;
  }

  getElement(filmsAmount) {
    if (!this._element) {
      this._element = createElement(this.getTemplate(filmsAmount));
    }
    return this._element;
  }

  getTemplate(filmsAmount) {
    return `<p>${filmsAmount} movies inside</p>`;
  }
}
