import {getDataFilm} from '../src/data.js';
import {FilmCard} from './components/film-card.js';
import {FilmCardDetails} from './components/film-card-details.js';
import {User} from './components/searchAndUserPanel/user-board.js';
import {Search} from './components/searchAndUserPanel/search-board.js';
import {Menu} from './components/mainContent/menu-board.js';
import {SortingMenu} from './components/mainContent/sorting-board.js';
import {Wrapper} from './components/mainContent/mainFilms/films-wrapper.js';
import {Footer} from './components/footer';

const ALL_FILMS_SIZE = 13;
const FILMS_COUNT_IN_ROW = 5;


const getFilteredFilmsCount = (films, keyName) => {
  return films.filter((el) => el[keyName]).length;
};

const showFullInformation = (film) => {
  const fullFilmInfo = new FilmCardDetails(film).getElement();
  mainNode.append(fullFilmInfo);

};

let from = 0;
const addFilmCards = () => {
  const filmCardElementsForNextRow = [];
  const to = (from + FILMS_COUNT_IN_ROW < films.length) ? from + FILMS_COUNT_IN_ROW : films.length;
  for (let i = from; i < to; i++) {
    let filmCardElement = new FilmCard(films[i]).getElement();
    filmCardElement.addEventListener(`click`, () => showFullInformation(films[i]));
    filmCardElementsForNextRow.push(filmCardElement);
  }
  document.querySelector(`.films-list__container`).append(...filmCardElementsForNextRow);
  if (to === films.length) {
    document.querySelector(`#showMore`).classList.add(`disabledButton`);
  } else {
    from += FILMS_COUNT_IN_ROW;
  }
};

function createHeader(films) {
  const headerPoint = document.querySelector(`#header`);
  const searchPanelElement = new Search().getElement();
  const userInfoElement = new User().getElement(getFilteredFilmsCount(films, `isWatchedList`));
  headerPoint.append(searchPanelElement, userInfoElement);
}

function createMainContent(films) {
  const mainPoint = document.querySelector(`#main`);
  const menuElement = new Menu().getElement(getFilteredFilmsCount(films, `isWatchedList`), getFilteredFilmsCount(films, `isHistory`), getFilteredFilmsCount(films, `isFavorite`));
  const sortingElement = new SortingMenu().getElement();
  const filmsWrapper = new Wrapper().getElement();
  mainPoint.append(menuElement, sortingElement, filmsWrapper);

  const to = (from + FILMS_COUNT_IN_ROW < films.length) ? from + FILMS_COUNT_IN_ROW : films.length;
  const filmCardElementsForFirstRow = [];
  for (let i = from; i < to; i++) {
    let filmCardElement = new FilmCard(films[i]).getElement();
    filmCardElement.addEventListener(`click`, () => showFullInformation(films[i]));
    filmCardElementsForFirstRow.push(filmCardElement);
  }
  document.querySelector(`.films-list__container`).append(...filmCardElementsForFirstRow);
  from += FILMS_COUNT_IN_ROW;

  let copyFilms = films.slice();

  const sortedTopRatedFilms = copyFilms.sort((a, b) => b.rating - a.rating);
  const sortedTopRatedFilmCardElements = [];
  for (let i = 0; i < 2; i++) {
    let filmCardElement = new FilmCard(sortedTopRatedFilms[i]).getElement();
    filmCardElement.addEventListener(`click`, () => showFullInformation(sortedTopRatedFilms[i]));
    sortedTopRatedFilmCardElements.push(filmCardElement);
  }
  document.querySelector(`#toprated`).append(...sortedTopRatedFilmCardElements);

  copyFilms = films.slice();

  const sortedCommentedFilms = copyFilms.sort((a, b) => b.comments - a.comments);
  const sortedCommentedFilmCardElements = [];
  for (let i = 0; i < 2; i++) {
    let filmCardElement = new FilmCard(sortedCommentedFilms[i]).getElement();
    filmCardElement.addEventListener(`click`, () => showFullInformation(sortedCommentedFilms[i]));
    sortedCommentedFilmCardElements.push(filmCardElement);
  }
  document.querySelector(`#commented`).append(...sortedCommentedFilmCardElements);
}

function setHandlerToShowMoreButton() {
  const showMoreBtn = document.querySelector(`#showMore`);
  showMoreBtn.addEventListener(`click`, addFilmCards);
}

function createFooter(filmsAmount) {
  const footerPoint = document.querySelector(`#footer`);
  const footerElement = new Footer().getElement(filmsAmount);
  footerPoint.append(footerElement);
}

const mainNode = document.querySelector(`#main`);
const films = new Array(ALL_FILMS_SIZE).fill(``).map(getDataFilm);
createHeader(films);
createMainContent(films);
setHandlerToShowMoreButton();
createFooter(films.length);
