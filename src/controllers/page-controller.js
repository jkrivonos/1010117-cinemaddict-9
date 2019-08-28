import {FilmsList} from '../components/mainContent/films-list.js';
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
    // this._container = container;
    this._films = films;
    this._filmsList = new FilmsList();
    this._sortingMenu = new SortingMenu();
    this._wrapper = new Wrapper();
    this._showMoreBtn = new ShowMoreButton();
  }

  init() {
    render(document.getElementById(`main`), this._sortingMenu.getElement(), `beforeend`);
    render(document.getElementById(`main`), this._wrapper.getElement(), `beforeend`);
    this._sortingMenu.getElement().addEventListener(`click`, (evt) => this._onSortLinkClick(evt));
    render(document.querySelector(`.films-list`), this._showMoreBtn.getElement(), `beforeend`);

    this._showMoreBtn.getElement().addEventListener(`click`, (evt) => this._addFilmCards(this._films));
    this._renderFilm(this._films);
  }

  _renderFilm(films) {
    const onEscKeyDown = () => {
      const detailCardElement = document.querySelector(`.film-details`);
      if (detailCardElement) {
        detailCardElement.remove();
      }
    };

    const showFullInformation = (film) => {
      const fullFilmInfo = new FilmCardDetails(film).getElement();
      mainNode.append(fullFilmInfo);
      const closeFilmCard = document.querySelector(`.film-details__close-btn`);
      closeFilmCard.addEventListener(`click`, onEscKeyDown);
      document.addEventListener(`keydown`, onEscKeyDown);
      const commentArea = document.querySelector(`textarea`);
      commentArea.addEventListener(`focus`, () => {
        document.removeEventListener(`keydown`, onEscKeyDown);
      });
      commentArea.addEventListener(`blur`, () => {
        document.addEventListener(`keydown`, onEscKeyDown);
      });
    };

    // const addFilmCards = () => {
    //   const filmCardElementsForNextRow = [];
    //   const finalIndexFilmElement = (startIndexFilmElement + FILMS_COUNT_IN_ROW < this._films.length) ? startIndexFilmElement + FILMS_COUNT_IN_ROW : this._films.length;
    //   for (let i = startIndexFilmElement; i < finalIndexFilmElement; i++) {
    //     let filmCardElement = new FilmCard(this._films[i]).getElement();
    //     filmCardElement.addEventListener(`click`, () => showFullInformation(this._films[i]));
    //     filmCardElementsForNextRow.push(filmCardElement);
    //   }
    //   document.querySelector(`.films-list__container`).append(...filmCardElementsForNextRow);
    //   if (finalIndexFilmElement === this._films.length) {
    //     document.getElementById(`showMore`).classList.add(`disabledButton`);
    //   } else {
    //     startIndexFilmElement += FILMS_COUNT_IN_ROW;
    //   }
    // };

    const getSortedFilmCardElements = (films, sortingKey) => {
      let copyFilms = films.slice();
      const sortedTopFilms = copyFilms.sort((a, b) => b[sortingKey] - a[sortingKey]);
      const sortedFilmCardElements = [];
      for (let i = 0; i < SORTED_FILMS_AMOUNT; i++) {
        let filmCardElement = new FilmCard(sortedTopFilms[i]).getElement();
        filmCardElement.addEventListener(`click`, () => showFullInformation(sortedTopFilms[i]));
        sortedFilmCardElements.push(filmCardElement);
      }
      return sortedFilmCardElements;
    };
    let startIndexFilmElement = 0;
    // функция основного рендеринга фильмов
    const createFirstView = (films) => {
      let startIndexFilmElement = 0;
      const to = (startIndexFilmElement + FILMS_COUNT_IN_ROW < films.length) ? startIndexFilmElement + FILMS_COUNT_IN_ROW : films.length;
      const filmCardElementsForFirstRow = [];
      for (let i = startIndexFilmElement; i < to; i++) {
        let filmCardElement = new FilmCard(films[i]).getElement();
        filmCardElement.addEventListener(`click`, () => showFullInformation(films[i]));
        filmCardElementsForFirstRow.push(filmCardElement);
      }
      document.querySelector(`.films-list__container`).append(...filmCardElementsForFirstRow);
    };
    startIndexFilmElement += FILMS_COUNT_IN_ROW;

    // функция навешивания обработчика добавления фильмов по кнопке show more
    // const setHandlerToShowMoreButton = () => {
    //   const showMoreBtn = document.getElementById(`showMore`);
    //   showMoreBtn.addEventListener(`click`, addFilmCards(this._films));
    // };

    const sortedTopRatedFilmCardElements = getSortedFilmCardElements(this._films, `rating`);
    document.getElementById(`toprated`).append(...sortedTopRatedFilmCardElements);
    const sortedCommentedFilmCardElements = getSortedFilmCardElements(this._films, `comments`);
    document.getElementById(`commented`).append(...sortedCommentedFilmCardElements);


    const mainNode = document.getElementById(`main`);
    createFirstView(films);
    // setHandlerToShowMoreButton();
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
        this._renderFilm(sortedByDateUpTasks);
        break;
      case `rating`:
        const sortedByDateDownTasks = this._films.slice().sort((a, b) => b.rating - a.rating);
        this._renderFilm(sortedByDateDownTasks);
        break;
      case `default`:
        this._renderFilm(this._films);
        break;
    }
  }

  _addFilmCards(films) {
    const filmCardElementsForNextRow = [];
    let startIndexFilmElement=0;

    const finalIndexFilmElement = (startIndexFilmElement + FILMS_COUNT_IN_ROW < films.length) ? startIndexFilmElement + FILMS_COUNT_IN_ROW : films.length;
    for (let i = startIndexFilmElement; i < finalIndexFilmElement; i++) {
      let filmCardElement = new FilmCard(films[i]).getElement();
      filmCardElement.addEventListener(`click`, () => this.showFullInformation(films[i]));
      filmCardElementsForNextRow.push(filmCardElement);
console.log(`finalIndexFilmElement`, finalIndexFilmElement);
console.log(`films.length`, films.length);

      if (finalIndexFilmElement === films.length) {
        document.getElementById(`showMore`).classList.add(`disabledButton`);
      } else {
        startIndexFilmElement += FILMS_COUNT_IN_ROW;
      }

    }
    document.querySelector(`.films-list__container`).append(...filmCardElementsForNextRow);


  }
}

