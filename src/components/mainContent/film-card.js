import {createElement} from '../../utils.js';
import {FilmCardDetails} from './film-card-details';
import {AbstractComponent} from "../abstract-component";

export class FilmCard extends AbstractComponent{
  constructor({title = ``, image = ``, rating = ``, year = ``, duration = ``, genre = ``, description = ``, comments = ``, director = ``, writers = ``, actors = ``, releaseDate = ``, runtime = ``, country = ``}) {
    super();
    this._title = title;
    this._image = image;
    this._rating = rating;
    this._year = year;
    this._duration = duration;
    this._genre = genre;
    this._description = description;
    this._comments = comments;
    this._director = director;
    this._writers = writers;
    this._actors = actors;
    this._releaseDate = releaseDate;
    this._runtime = runtime;
    this._country = country;
  }

  showFullInformation() {
    const fullFilmInfo = new FilmCardDetails({
      title: this._title,
      image: this._image,
      rating: this._rating,
      year: this._year,
      duration: this._duration,
      genre: this._genre,
      description: this._description,
      comments: this._comments,
      director: this._director,
      writers: this._writers,
      actors: this._actors,
      releaseDate: this._releaseDate,
      runtime: this._runtime,
      country: this._country
    }).getElement();

    document.getElementById(`main`).append(fullFilmInfo);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
      this._element.addEventListener(`click`, () => this.showFullInformation());

    }
    return this._element;
  }

  removeElement() {
    if (this._element) {
      this._element = null;
    }
  }

  getTemplate() {
    return `<article class="film-card"><h3 class="film-card__title">${this._title}</h3>
          <p class="film-card__rating">${this._rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${this._year}</span>
            <span class="film-card__duration">${this._duration}</span>
            <span class="film-card__genre">${this._genre}</span>
          </p>
          <img src=${this._image} alt="" class="film-card__poster">
          <p class="film-card__description">${this._description}</p>
          <a class="film-card__comments">${this._comments}</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
          </form>
  </article>`;
  }
}
