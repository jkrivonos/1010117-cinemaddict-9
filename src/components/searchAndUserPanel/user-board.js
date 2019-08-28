import {createElement} from '../../utils.js';

export class User {
  constructor() {
    this._element = null;
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
    if (watchedFilms > 0) {
      if (watchedFilms > 10) {
        if (watchedFilms >= 20) {
          return `movie buff`;
        }
        return `fun`;
      } else if (watchedFilms <= 10) {
        return `novice`;
      }
    } return ``;
  }


}
