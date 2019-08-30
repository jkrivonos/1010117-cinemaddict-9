import {createElement} from '../../utils.js';

export class SearchResultPanel {
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
    return `<div class="result">
    <p class="result__text">Result <span class="result__count">0</span></p>
  </div>`;
  }
}
