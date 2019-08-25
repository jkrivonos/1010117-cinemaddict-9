import {AbstractComponent} from "./abstract-component"

export class Page extends AbstractComponent {
  getTemplate() {
    return `<section class="films"></section>`;
  }
}
