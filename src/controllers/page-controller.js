import {FilmsContainer} from '../components/mainContent/films-container.js'
import {FilmsList} from '../components/mainContent/films-list.js'
import {getDataFilm} from '../data.js';
import {FilmCard} from '../components/mainContent/film-card.js';
import {FilmCardDetails} from '../components/mainContent/film-card-details.js';
import {SearchResultPanel} from '../components/searchAndUserPanel/search-result-panel.js';
import {SearchResultMessage} from '../components/searchAndUserPanel/search-result-message.js';
import {render} from '../utils.js'

const FILMS_COUNT_IN_ROW = 5;
const SORTED_FILMS_AMOUNT = 2;
// const ALL_FILMS_SIZE = 8;

export class PageController {
  constructor(container, films) {
    this._container = container;/*контейнер где мы фильмы выводим*/
    this._films = films;
    this._filmsContainer = new FilmsContainer();
    this._filmsList = new FilmsList();
  }
  init() {
    render(this._container, this._filmsContainer.getElement(), `beforeend`);
    render(this._filmsContainer.getElement(), this._filmsList.getElement(), `beforeend`);
    console.log(`_films`, this._films);
    this._renderFilm();
  }
  _renderFilm(){
    // const getFilteredFilmsCount = (films, keyName) => {
    //   return films.filter((el) => el[keyName]).length;
    // };

    const onEscKeyDown = () => {
      console.log(`onEscKeyDown`);
      const detailCardElement = document.querySelector(`.film-details`);
      if (detailCardElement) {
        detailCardElement.remove();
      }
    };

    const showFullInformation = (film) => {
      const fullFilmInfo = new FilmCardDetails(film).getElement();
      mainNode.append(fullFilmInfo);
      const closeFilmCard = document.querySelector(`.film-details__close-btn`);
      console.log(`closeFilmCard`, closeFilmCard);
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

    let startIndexFilmElement = 0;
    const addFilmCards = () => {
      const filmCardElementsForNextRow = [];
      const finalIndexFilmElement = (startIndexFilmElement + FILMS_COUNT_IN_ROW < this._films.length) ? startIndexFilmElement + FILMS_COUNT_IN_ROW : this._films.length;
      for (let i = startIndexFilmElement; i < finalIndexFilmElement; i++) {
        let filmCardElement = new FilmCard(this._films[i]).getElement();
        filmCardElement.addEventListener(`click`, () => showFullInformation(this._films[i]));
        filmCardElementsForNextRow.push(filmCardElement);
      }
      document.querySelector(`.films-list__container`).append(...filmCardElementsForNextRow);
      if (finalIndexFilmElement === this._films.length) {
        document.getElementById(`showMore`).classList.add(`disabledButton`);
      } else {
        startIndexFilmElement += FILMS_COUNT_IN_ROW;
      }
    };

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

    const createMainContent = (films) => {
      console.log(`createMainContent`);
      console.log(`startIndexFilmElement`, startIndexFilmElement);
      console.log(`FILMS_COUNT_IN_ROW`, FILMS_COUNT_IN_ROW);
      console.log(`films.length`, films.length);
      const to = (startIndexFilmElement + FILMS_COUNT_IN_ROW < films.length) ? startIndexFilmElement + FILMS_COUNT_IN_ROW : films.length;
      console.log(`to`, to);
      const filmCardElementsForFirstRow = [];
      for (let i = startIndexFilmElement; i < to; i++) {
        let filmCardElement = new FilmCard(films[i]).getElement();
        filmCardElement.addEventListener(`click`, () => showFullInformation(films[i]));
        filmCardElementsForFirstRow.push(filmCardElement);

      }

      document.querySelector(`.films-list__container`).append(...filmCardElementsForFirstRow);
      startIndexFilmElement += FILMS_COUNT_IN_ROW;
      console.log(`!!!startIndexFilmElement` , startIndexFilmElement);
      const sortedTopRatedFilmCardElements = getSortedFilmCardElements(this._films, `rating`);
      document.getElementById(`toprated`).append(...sortedTopRatedFilmCardElements);
      const sortedCommentedFilmCardElements = getSortedFilmCardElements(this._films, `comments`);
      document.getElementById(`commented`).append(...sortedCommentedFilmCardElements);
    };

    const setHandlerToShowMoreButton = () => {
      const showMoreBtn = document.getElementById(`showMore`);
      showMoreBtn.addEventListener(`click`, addFilmCards);
    };
    const mainNode = document.getElementById(`main`);

    const createSearchResult = () => {
      const SearchResultCount = new SearchResultPanel().getElement();
      mainNode.append(SearchResultCount);
    };

    const createSearchResultMessage = () => {
      const searchResultMsg = new SearchResultMessage().getElement();
      mainNode.append(searchResultMsg);
    };

    createMainContent(this._films);
    setHandlerToShowMoreButton();
  }
}
