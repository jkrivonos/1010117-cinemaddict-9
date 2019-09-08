import {AbstractComponent} from "../abstract-component";

export class FilmCard extends AbstractComponent {
  constructor({title = ``, image = ``, rating = ``, genre = ``, description = ``, comments = ``, director = ``, writers = ``, actors = ``, releaseDate = ``, runtime = ``, country = ``, isWatchedList = false, isHistory = false, isFavorite =false}) {
    super();
    this._title = title;
    this._image = image;
    this._rating = rating;
    this._genre = genre;
    this._description = description;
    this._comments = comments.length;
    this._director = director;
    this._writers = writers;
    this._actors = actors;
    this._releaseDate = releaseDate;
    this._runtime = runtime;
    this._country = country;
    this._isWatchedList = isWatchedList;
    this._isHistory = isHistory;
    this._isFavorite = isFavorite;
  }

  getTemplate() {
    return `<article class="film-card"><h3 class="film-card__title">${this._title}</h3>
          <p class="film-card__rating">${this._rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${this._releaseDate}</span>
            <span class="film-card__duration">${this._runtime}</span>
            <span class="film-card__genre">${this._genre}</span>
          </p>
          <img src=${this._image} alt="" class="film-card__poster">
          <p class="film-card__description">${this._description}</p>
          <a class="film-card__comments">${this._comments} comments</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${this._isWatchedList ? "film-card__controls-item--active" : ""}" name="watchlist">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${this._isHistory ? "film-card__controls-item--active" : ""}" name="watched">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite ${this._isFavorite ? "film-card__controls-item--active" : ""}" name="favorite">Mark as favorite</button>
          </form>
  </article>`;
  }
}
