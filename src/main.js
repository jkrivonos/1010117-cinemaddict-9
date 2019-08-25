import {getDataFilm} from '../src/data.js';
import {FilmCard} from './components/mainContent/film-card.js';
import {FilmCardDetails} from './components/mainContent/film-card-details.js';
import {User} from './components/searchAndUserPanel/user-panel.js';
import {Search} from './components/searchAndUserPanel/search-panel.js';
import {SearchResultPanel} from './components/searchAndUserPanel/search-result-panel.js';
import {SearchResultMessage} from './components/searchAndUserPanel/search-result-message.js';
import {Menu} from './components/mainContent/menu-panel.js';
import {SortingMenu} from './components/mainContent/sorting-panel.js';
import {Wrapper} from './components/mainContent/films-wrapper.js';
import {Footer} from './components/footer';

const ALL_FILMS_SIZE = 33;
const FILMS_COUNT_IN_ROW = 5;
const SORTED_FILMS_AMOUNT = 2;

const getFilteredFilmsCount = (films, keyName) => {
  return films.filter((el) => el[keyName]).length;
};

const showFullInformation = (film) => {
  const fullFilmInfo = new FilmCardDetails(film).getElement();
  mainNode.append(fullFilmInfo);

};

let startIndexFilmElement = 0;
const addFilmCards = () => {
  const filmCardElementsForNextRow = [];
  const finalIndexFilmElement = (startIndexFilmElement + FILMS_COUNT_IN_ROW < films.length) ? startIndexFilmElement + FILMS_COUNT_IN_ROW : films.length;
  for (let i = startIndexFilmElement; i < finalIndexFilmElement; i++) {
    let filmCardElement = new FilmCard(films[i]).getElement();
    filmCardElement.querySelector(`.film-card__poster`).addEventListener(`click`, () => showFullInformation(films[i]));
    filmCardElementsForNextRow.push(filmCardElement);
  }
  document.querySelector(`.films-list__container`).append(...filmCardElementsForNextRow);
  if (finalIndexFilmElement === films.length) {
    document.getElementById(`showMore`).classList.add(`disabledButton`);
  } else {
    startIndexFilmElement += FILMS_COUNT_IN_ROW;
  }
};

const createHeader = (films) => {
  const headerPoint = document.getElementById(`header`);
  const searchPanelElement = new Search().getElement();
  const userInfoElement = new User().getElement(getFilteredFilmsCount(films, `isWatchedList`));
  headerPoint.append(searchPanelElement, userInfoElement);
};

const getSortedFilmCardElements = (films, sortingKey) => {
  let copyFilms = films.slice();
  const sortedTopFilms = copyFilms.sort((a, b) => b[sortingKey] - a[sortingKey]);
  const sortedFilmCardElements = [];
  for (let i = 0; i < SORTED_FILMS_AMOUNT; i++) {
    let filmCardElement = new FilmCard(sortedTopFilms[i]).getElement();
    console.log(`filmCardElement`, filmCardElement);
    filmCardElement.querySelector(`.film-card__poster`).addEventListener(`click`, () => showFullInformation(sortedTopFilms[i]));
    sortedFilmCardElements.push(filmCardElement);
  }
  return sortedFilmCardElements;
};

const createMainContent = (films) => {
  const mainPoint = document.getElementById(`main`);
  const menuElement = new Menu().getElement(getFilteredFilmsCount(films, `isWatchedList`), getFilteredFilmsCount(films, `isHistory`), getFilteredFilmsCount(films, `isFavorite`));
  const sortingElement = new SortingMenu().getElement();
  const filmsWrapper = new Wrapper().getElement();
  mainPoint.append(menuElement, sortingElement, filmsWrapper);

  const to = (startIndexFilmElement + FILMS_COUNT_IN_ROW < films.length) ? startIndexFilmElement + FILMS_COUNT_IN_ROW : films.length;
  const filmCardElementsForFirstRow = [];
  for (let i = startIndexFilmElement; i < to; i++) {
    let filmCardElement = new FilmCard(films[i]).getElement();
    filmCardElement.querySelector(`.film-card__poster`).addEventListener(`click`, () => showFullInformation(films[i]));
    filmCardElementsForFirstRow.push(filmCardElement);
  }

  document.querySelector(`.films-list__container`).append(...filmCardElementsForFirstRow);
  startIndexFilmElement += FILMS_COUNT_IN_ROW;
  const sortedTopRatedFilmCardElements = getSortedFilmCardElements(films, `rating`);
  document.getElementById(`toprated`).append(...sortedTopRatedFilmCardElements);
  const sortedCommentedFilmCardElements = getSortedFilmCardElements(films, `comments`);
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

const createFooter = (filmsAmount) => {
  const footerPoint = document.getElementById(`footer`);
  const footerElement = new Footer().getElement(filmsAmount);
  footerPoint.append(footerElement);
};

const films = new Array(ALL_FILMS_SIZE).fill(``).map(getDataFilm);
createHeader(films);
createMainContent(films);
setHandlerToShowMoreButton();
// createSearchResult();
// createSearchResultMessage();
createFooter(films.length);
