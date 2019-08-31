import {AbstractComponent} from "../abstract-component";

export class SearchResultMessage extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `<div class="no-result">
        There is no movies for your request.
      </div>`;
  }
}
