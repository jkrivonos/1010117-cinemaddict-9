import {FilmCard} from '../components/mainContent/film-card.js';
import {Wrapper} from '../components/mainContent/films-wrapper';
import {SortingMenu} from '../components/mainContent/sorting-panel.js';
import {ShowMoreButton} from '../components/mainContent/show-more-button.js';
import {render} from '../utils.js';
import {MovieController} from '../controllers/movie-controller.js';
import {FilmDetailsWrapper} from '../components/mainContent/film-details-wrapper.js'

const FILMS_COUNT_IN_ROW = 5;
const SORTED_FILMS_AMOUNT = 2;

export class PageController {
  constructor(mainPoint, films) {
    this._mainPoint = mainPoint;
    this._films = films;
    this._sortingMenu = new SortingMenu();
    this._wrapper = new Wrapper();
    this._showMoreBtn = new ShowMoreButton();
    this._startIndexFilmElement = 0;
    this._filmDetailsWrap = new FilmDetailsWrapper();
  }

  init() {
    render(this._mainPoint, this._sortingMenu.getElement(), `beforeend`);
    render(this._mainPoint, this._wrapper.getElement(), `beforeend`);
    this._sortingMenu.getElement().addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
    this._renderFirstLineWithFilmsAndShowMoreButton(this._films);
    this._renderSortedFilms();
  }

  removeElement() {
    if (this._element) {
      this._element = null;
    }
  }

  _getSortedFilmCardElements(films, sortingKey) {
    const filmDetailsWrap = this._filmDetailsWrap.getElement();

    let copyFilms = films.slice();

    const sortedTopFilms = copyFilms.sort((a, b) => b[sortingKey] - a[sortingKey]);
    const sortedFilmCardElements = [];
    for (let i = 0; i < SORTED_FILMS_AMOUNT; i++) {
      let filmCardElement = new FilmCard(sortedTopFilms[i]).getElement();
      const movieController = new MovieController(filmDetailsWrap, films[i]);
      filmCardElement.addEventListener(`click`, () => movieController.init(sortedTopFilms[i]));
      sortedFilmCardElements.push(filmCardElement);
    }
    return sortedFilmCardElements;
  }

  _renderFirstLineWithFilmsAndShowMoreButton(filmsContainer) {
    const filmDetailsWrap = this._filmDetailsWrap.getElement();

    const addNextLineWithFilms = (filmsContainer) => {
      const filmCardElementsForNextRow = [];
      const finalIndexFilmElement = (this._startIndexFilmElement + FILMS_COUNT_IN_ROW < filmsContainer.length) ? this._startIndexFilmElement + FILMS_COUNT_IN_ROW : filmsContainer.length;
      for (let i = this._startIndexFilmElement; i < finalIndexFilmElement; i++) {
        let filmCardElement = new FilmCard(filmsContainer[i]).getElement();
        const movieController = new MovieController(filmDetailsWrap, filmsContainer[i]);
        filmCardElement.addEventListener(`click`, () => movieController.init());

        filmCardElementsForNextRow.push(filmCardElement);
      }
      if (finalIndexFilmElement === filmsContainer.length) {
        this._showMoreBtn.getElement().classList.add(`disabledButton`);
      } else {
        this._startIndexFilmElement += FILMS_COUNT_IN_ROW;
      }
      this._wrapper.getElement().querySelector(`.films-list__container`).append(...filmCardElementsForNextRow);
    };

    const createFirstLineFilms = (films) => {

      this._startIndexFilmElement = 0;
      const to = (this._startIndexFilmElement + FILMS_COUNT_IN_ROW < films.length) ? this._startIndexFilmElement + FILMS_COUNT_IN_ROW : films.length;
      const filmCardElementsForFirstRow = [];
      for (let i = this._startIndexFilmElement; i < to; i++) {
        let filmCardElement = new FilmCard(filmsContainer[i]).getElement();
        const movieController = new MovieController(filmDetailsWrap, filmsContainer[i]);

        filmCardElement.addEventListener(`click`, () => movieController.init());
        filmCardElementsForFirstRow.push(filmCardElement);
      }
      this._wrapper.getElement().querySelector(`.films-list__container`).append(...filmCardElementsForFirstRow);
      this._startIndexFilmElement += FILMS_COUNT_IN_ROW;
    };

    createFirstLineFilms(filmsContainer);
    this._showMoreBtn.getElement().classList.remove(`disabledButton`);

    render(this._wrapper.getElement().querySelector(`.films-list`), this._showMoreBtn.getElement(), `beforeend`);
    this._showMoreBtn.getElement().addEventListener(`click`, () => addNextLineWithFilms(filmsContainer));
  }

  _renderSortedFilms() {
    const sortedTopRatedFilmCardElements = this._getSortedFilmCardElements(this._films, `rating`);
    this._wrapper.getElement().querySelector(`#toprated`).append(...sortedTopRatedFilmCardElements);

    const sortedCommentedFilmCardElements = this._getSortedFilmCardElements(this._films, `comments`);
    this._wrapper.getElement().querySelector(`#commented`).append(...sortedCommentedFilmCardElements);
  }

  _onSortLinkClick(evt) {
    evt.preventDefault();
    if (evt.target.tagName !== `A`) {
      return;
    }
    this._wrapper.getElement().querySelector(`.films-list__container`).innerHTML = ``;
    switch (evt.target.dataset.sortType) {
      case `date-up`:
        const sortedByDateUpTasks = this._films.slice().sort((a, b) => a.year - b.year);
        this._renderFirstLineWithFilmsAndShowMoreButton(sortedByDateUpTasks);
        break;
      case `rating`:
        const sortedByDateDownTasks = this._films.slice().sort((a, b) => b.rating - a.rating);
        this._renderFirstLineWithFilmsAndShowMoreButton(sortedByDateDownTasks);
        break;
      case `default`:
        this._renderFirstLineWithFilmsAndShowMoreButton(this._films);
        break;
    }
  }
}

