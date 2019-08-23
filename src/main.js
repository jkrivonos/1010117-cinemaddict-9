import {getHeaderPanel} from './components/searchAndUserPanel/header-panel.js';
import {getContent} from './components/mainContent/main-content.js';
import {getFilmCardsFrom, FILMS_SIZE_FOR_RENDER_AT_LINE} from './components/mainContent/mainFilms/film-card.js';
import {getDataFilm} from '../src/data.js';
import {getFooterPanel} from '../src/components/footer-statistics';
import {filmDetailsWrapper} from './components/filmDetails/film-details-wrapper.js';
import {FilmCard} from './components/film-card.js';
import {FilmCardDetails} from './components/film-card-details.js';
import {render} from './utils.js';
import {createElement} from "./utils";

const ALL_FILMS_SIZE = 12;

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
  const headerTemplate = createElement(getHeaderPanel(getFilteredFilms(films, `isWatchedList`)))
  render(headerPoint, headerTemplate);
}

function createMainContent(films) {
  const mainNode = document.querySelector(`#main`);
const mainContentTemplate = createElement(getContent(films));
  render(mainNode, mainContentTemplate);
  // setShowFullInformationHandler();
}
//
// function setHandlerToShowMoreButton() {
//   const showMoreBtn = document.querySelector(`#showMore`);
//   showMoreBtn.addEventListener(`click`, addFilmCards);
// }
//
function createFooter(filmsAmount) {
  const footerPoint = document.querySelector(`#footer`);
  const footerTemplate = createElement(getFooterPanel(filmsAmount));
  render(footerPoint, footerTemplate);
}

const mainNode = document.querySelector(`#main`);
const films = new Array(ALL_FILMS_SIZE).fill(``).map(getDataFilm);
createHeader(films);
createMainContent(films);
// const filmsWrapperNode = document.querySelector(`#films_container`);
// setHandlerToShowMoreButton();
createFooter(films.length);

const renderFilm = (film) => {
  const filmCard = new FilmCard(film);
  const filmDetails = new FilmCardDetails(film);
  filmCard.getElement().querySelector(`.film-card`).addEventListener(`click`, () => console.log(`111`));
  render(filmContainer, filmCard.getElement());
};

const filmContainer = document.querySelector(`.films-list__container`);
console.log(`filmContainer`, filmContainer);
films.forEach((film) => renderFilm(film));

