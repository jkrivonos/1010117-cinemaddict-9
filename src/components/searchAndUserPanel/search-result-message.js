import {createElement} from '../../utils.js';

export class SearchResultMessage {
  constructor() {
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    if (this._element) {
      this._element = null;
    }
  }

  getTemplate() {
    return `<div class="no-result">
        There is no movies for your request.
      </div>`;
  }
}
