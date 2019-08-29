import {AbstractComponent} from "../abstract-component";

export class ShowMoreButton extends AbstractComponent {
  getTemplate() {
    return `<button id="showMore" class="films-list__show-more">Show more</button>`
  }
}
