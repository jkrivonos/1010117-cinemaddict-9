import {AbstractComponent} from "../abstract-component";

export class FilmsList extends AbstractComponent {
  getTemplate() {
    return `<section class="films"></section>`;
  }
}
