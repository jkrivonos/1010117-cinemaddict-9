import {FilmCard} from '../components/mainContent/film-card.js';
import {FilmCardDetails} from '../components/mainContent/film-card-details.js';
import {Wrapper} from '../components/mainContent/films-wrapper';
import {SortingMenu} from '../components/mainContent/sorting-panel.js';
import {ShowMoreButton} from '../components/mainContent/show-more-button.js';
import {render} from '../utils.js';

const FILMS_COUNT_IN_ROW = 5;
const SORTED_FILMS_AMOUNT = 2;

export class PageController {
  constructor(mainPoint, films) {
    this._mainPoint = mainPoint,
    // this._container = container;
    this._films = films;
    this._sortingMenu = new SortingMenu();
    this._wrapper = new Wrapper();
    this._showMoreBtn = new ShowMoreButton();
    this._startIndexFilmElement = 0;
  }


  init() {

    console.log(`mainPoint`, this._mainPoint);
console.log(`this._wrapper`, this._wrapper);
    render(this._mainPoint, this._sortingMenu.getElement(), `beforeend`);
    console.log(`1`);
    render(this._mainPoint, this._wrapper.getElement(), `beforeend`);
    console.log(2);
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
    this._mainPoint.append(fullFilmInfo);

    const closeFilmCard = fullFilmInfo.querySelector(`.film-details__close-btn`);
    closeFilmCard.addEventListener(`click`, this.onEscKeyDown);
    this._mainPoint.addEventListener(`keydown`, this.onEscKeyDown);

    const commentArea = fullFilmInfo.querySelector(`textarea`);
    commentArea.addEventListener(`focus`, () => {
      this._mainPoint.removeEventListener(`keydown`, this.onEscKeyDown);
    });
    commentArea.addEventListener(`blur`, () => {
      this._mainPoint.addEventListener(`keydown`, this.onEscKeyDown);
    });
  };

  onEscKeyDown() {
    console.log(this._mainPoint);
    console.log(this._wrapper);;
    const detailCardElement = this._mainPoint.querySelector(`.film-details`);
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
      this._wrapper.getElement().querySelector(`.films-list__container`).append(...filmCardElementsForNextRow);
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
      this._wrapper.getElement().querySelector(`.films-list__container`).append(...filmCardElementsForFirstRow);
      this._startIndexFilmElement += FILMS_COUNT_IN_ROW;
    };

    createFirstLineFilms(films);
    this._showMoreBtn.getElement().classList.remove(`disabledButton`);
    
    render(this._wrapper.getElement().querySelector(`.films-list`), this._showMoreBtn.getElement(), `beforeend`);
    this._showMoreBtn.getElement().addEventListener(`click`, (evt) => addNextLineWithFilms(films));
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

