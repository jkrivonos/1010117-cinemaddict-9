import {getContent} from './components/mainContent/main-content.js';
import {getFilmCardsFrom, FILMS_SIZE_FOR_RENDER_AT_LINE} from './components/mainContent/mainFilms/film-card.js';
import {getDataFilm} from '../src/data.js';
import {getFooterPanel} from '../src/components/footer-statistics';
import {filmDetailsWrapper} from './components/filmDetails/film-details-wrapper.js';
import {FilmCard} from './components/film-card.js';
import {FilmCardDetails} from './components/film-card-details.js';
import {User} from './components/searchAndUserPanel/user-board.js';
import {Search} from './components/searchAndUserPanel/search-board.js';
import {Footer} from './components/footer';
import {render} from './utils.js';
import {createElement} from "./utils";

const ALL_FILMS_SIZE = 6;

const getFilteredFilms = (films, keyName) => {
  return films.filter((el) => el[keyName]).length;
};

// const render = (container, template, place = `beforeend`) => {
//   container.insertAdjacentHTML(place, template);
// };

// const showFullInformation = () => {
//   render(mainNode, filmDetailsWrapper());
// };

// let from = 0;
// const setShowFullInformationHandler = () => {
//   const filmCards = document.querySelectorAll(`.film-card`);
//   let finish = (from + FILMS_SIZE_FOR_RENDER_AT_LINE < films.length) ? from + FILMS_SIZE_FOR_RENDER_AT_LINE : films.length;
//   for (let i = from; i < from + FILMS_SIZE_FOR_RENDER_AT_LINE; i++) {
//     filmCards[i].addEventListener(`click`, showFullInformation);
//   }
//   if (finish === films.length) {
//     document.querySelector(`#showMore`).classList.add(`disabledButton`);
//   } else {
//     from += FILMS_SIZE_FOR_RENDER_AT_LINE;
//   }
// };

// const addFilmCards = () => {
//   render(filmsWrapperNode, getFilmCardsFrom(films, from, FILMS_SIZE_FOR_RENDER_AT_LINE));
//   // setShowFullInformationHandler();
// };

function createHeader(films) {
  const headerPoint = document.querySelector(`#header`);
  const searchPanelElement = new Search().getElement();
  const userInfoElement = new User().getElement(getFilteredFilms(films, `isWatchedList`));
  headerPoint.append(searchPanelElement, userInfoElement);
}

// function createMainContent(films) {
//   const mainNode = document.querySelector(`#main`);
//   const mainContentTemplate = createElement(getContent(films));
//   render(mainNode, mainContentTemplate);
  // setShowFullInformationHandler();
// }
//
// function setHandlerToShowMoreButton() {
//   const showMoreBtn = document.querySelector(`#showMore`);
//   showMoreBtn.addEventListener(`click`, addFilmCards);
// }
//
function createFooter(filmsAmount) {
  console.log(`filmsAmount`, filmsAmount);
  const footerPoint = document.querySelector(`#footer`);
  const footerElement = new Footer().getElement(filmsAmount);
  footerPoint.append(footerElement);
}

const mainNode = document.querySelector(`#main`);
const films = new Array(ALL_FILMS_SIZE).fill(``).map(getDataFilm);
createHeader(films);
// createMainContent(films);
// const filmsWrapperNode = document.querySelector(`#films_container`);
// setHandlerToShowMoreButton();
createFooter(films.length);

// const renderFilm = (film) => {
//   const filmCard = new FilmCard(film);
//   const filmDetails = new FilmCardDetails(film);
//   filmCard.getElement().querySelector(`.film-card__rating`).addEventListener(`click`, () => console.log(`111`));
//   // console.log(filmContainer);
//   render(filmContainer, filmCard.getElement());
// };
//
// const filmContainer = document.querySelector(`.films-list__container`);
// films.forEach((film) => renderFilm(film));
//
