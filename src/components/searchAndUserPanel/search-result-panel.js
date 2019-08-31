import {AbstractComponent} from "../abstract-component";

export class SearchResultPanel extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `<div class="result">
    <p class="result__text">Result <span class="result__count">0</span></p>
  </div>`;
  }
}
