import {FilmCard} from '../components/mainContent/film-card.js';
import {FilmCardDetails} from '../components/mainContent/film-card-details.js';
import {Wrapper} from '../components/mainContent/films-wrapper';
import {SortingMenu} from '../components/mainContent/sorting-panel.js';
import {ShowMoreButton} from '../components/mainContent/show-more-button.js';
import {render} from '../utils.js';

const FILMS_COUNT_IN_ROW = 5;
const SORTED_FILMS_AMOUNT = 2;

export class PageController {
  constructor(container, films) {
    this._films = films;
    this._sortingMenu = new SortingMenu();
    this._wrapper = new Wrapper();
    this._showMoreBtn = new ShowMoreButton();
    this._startIndexFilmElement = 0;
  }

  init() {
    render(document.getElementById(`main`), this._sortingMenu.getElement(), `beforeend`);
    render(document.getElementById(`main`), this._wrapper.getElement(), `beforeend`);
    this._sortingMenu.getElement().addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
    this._renderFirstLineWithFilmsAndShowMoreButton(this._films);
    this._renderSortedFilms();
  }

  _getSortedFilmCardElements(films, sortingKey) {
    let copyFilms = films.slice();
    const sortedTopFilms = copyFilms.sort((a, b) => b[sortingKey] - a[sortingKey]);
    const sortedFilmCardElements = [];
    for (let i = 0; i < SORTED_FILMS_AMOUNT; i++) {
      let filmCardElement = new FilmCard(sortedTopFilms[i]).getElement();
      filmCardElement.addEventListener(`click`, () => this._showFullInformation(sortedTopFilms[i]));
      sortedFilmCardElements.push(filmCardElement);
    }
    return sortedFilmCardElements;
  };

  _showFullInformation(film) {
    const fullFilmInfo = new FilmCardDetails(film).getElement();
    document.getElementById(`main`).append(fullFilmInfo);
    const closeFilmCard = document.querySelector(`.film-details__close-btn`);
    closeFilmCard.addEventListener(`click`, this._onEscKeyDown);
    document.addEventListener(`keydown`, this._onEscKeyDown);
    const commentArea = document.querySelector(`textarea`);
    commentArea.addEventListener(`focus`, () => {
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });
    commentArea.addEventListener(`blur`, () => {
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });
  };

  _onEscKeyDown() {
    const detailCardElement = document.querySelector(`.film-details`);
    if (detailCardElement) {
      detailCardElement.remove();
    }
  };

  _renderFirstLineWithFilmsAndShowMoreButton(films) {
    const addNextLineWithFilms= (films) => {
      const filmCardElementsForNextRow = [];
      const finalIndexFilmElement = (this._startIndexFilmElement + FILMS_COUNT_IN_ROW < films.length) ? this._startIndexFilmElement + FILMS_COUNT_IN_ROW : films.length;
      for (let i = this._startIndexFilmElement; i < finalIndexFilmElement; i++) {
        let filmCardElement = new FilmCard(films[i]).getElement();
        filmCardElement.addEventListener(`click`, () => this._showFullInformation(films[i]));
        filmCardElementsForNextRow.push(filmCardElement);
      }
      if (finalIndexFilmElement === films.length) {
        this._showMoreBtn.getElement().classList.add(`disabledButton`);
      } else {
        this._startIndexFilmElement += FILMS_COUNT_IN_ROW;
      }
      document.querySelector(`.films-list__container`).append(...filmCardElementsForNextRow);
    }

    const createFirstLineFilms = (films) => {
      this._startIndexFilmElement = 0;
      const to = (this._startIndexFilmElement + FILMS_COUNT_IN_ROW < films.length) ? this._startIndexFilmElement + FILMS_COUNT_IN_ROW : films.length;
      const filmCardElementsForFirstRow = [];
      for (let i = this._startIndexFilmElement; i < to; i++) {
        let filmCardElement = new FilmCard(films[i]).getElement();
        filmCardElement.addEventListener(`click`, () => this._showFullInformation(films[i]));
        filmCardElementsForFirstRow.push(filmCardElement);
      }
      document.querySelector(`.films-list__container`).append(...filmCardElementsForFirstRow);
      this._startIndexFilmElement += FILMS_COUNT_IN_ROW;
    };

    createFirstLineFilms(films);
    this._showMoreBtn.getElement().classList.remove(`disabledButton`);
    render(document.querySelector(`.films-list`), this._showMoreBtn.getElement(), `beforeend`);
    this._showMoreBtn.getElement().addEventListener(`click`, (evt) => addNextLineWithFilms(films));
  }

  _renderSortedFilms() {
    const sortedTopRatedFilmCardElements = this._getSortedFilmCardElements(this._films, `rating`);
    document.getElementById(`toprated`).append(...sortedTopRatedFilmCardElements);
    const sortedCommentedFilmCardElements = this._getSortedFilmCardElements(this._films, `comments`);
    document.getElementById(`commented`).append(...sortedCommentedFilmCardElements);
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
