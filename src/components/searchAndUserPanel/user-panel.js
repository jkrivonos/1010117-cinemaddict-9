import {createElement} from '../../utils.js';
import {AbstractComponent} from "../abstract-component";

export class User extends AbstractComponent {
  constructor() {
    super();
  }

  getElement(watchedFilms) {
    if (!this._element) {
      this._element = createElement(this.getTemplate(watchedFilms));
    }
    return this._element;
  }

  removeElement() {
    if (this._element) {
      this._element = null;
    }
  }

  getTemplate(watchedFilms) {
    return `<section class="header__profile profile">
    <p class="profile__rating">${this.getUserStatus(watchedFilms)}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
  }

  getUserStatus(watchedFilms) {
    if (watchedFilms >= 20) {
      return `movie buff`;
    } else if (watchedFilms > 10) {
      return `fun`;
    } else {
      return `novice`;
    }
  }
}
