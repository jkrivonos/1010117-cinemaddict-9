import {createElement} from '../../utils.js';
import {AbstractComponent} from "../abstract-component";

export class Menu extends AbstractComponent {
  constructor() {
    super();
  }

  getElement(watchlistFilms, historyFilms, favoritesFilms) {
    if (!this._element) {
      this._element = createElement(this.getTemplate(watchlistFilms, historyFilms, favoritesFilms));
    }
    return this._element;
  }

  getTemplate(watchlistFilms, historyFilms, favoritesFilms) {
    return `<nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchlistFilms}</span></a>
    <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${historyFilms}</span></a>
    <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favoritesFilms}</span></a>
    <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
  </nav>`;
  }
}
