import {getHeaderPanel} from './components/searchAndUserPanel/header-panel.js';
import {getContent} from './components/mainContent/main-content.js';
import {getFilmCardsFrom, FILMS_SIZE_FOR_RENDER_AT_LINE} from './components/mainContent/mainFilms/film-card.js';
import {getDataFilm} from '../src/data.js';
import {getFooterPanel} from '../src/components/footer-statistics';
import {filmDetailsWrapper} from './components/filmDetails/film-details-wrapper.js';

const ALL_FILMS_SIZE = 15;

const getFilteredFilms = (films, keyName) => {
  return films.filter((el) => el[keyName]).length;
};

const render = (container, template) => {
  container.insertAdjacentHTML(`beforeend`, template);
};

const showFullInformation = () => {
  render(mainNode, filmDetailsWrapper());
};

let from = 0;
const setShowFullInformationHandler = () => {
  const filmCards = document.querySelectorAll(`.film-card`);
  let finish = (from + FILMS_SIZE_FOR_RENDER_AT_LINE < films.length) ? from + FILMS_SIZE_FOR_RENDER_AT_LINE : films.length;
  for (let i = from; i < from + FILMS_SIZE_FOR_RENDER_AT_LINE; i++) {
    filmCards[i].addEventListener(`click`, showFullInformation);
  }
  if (finish === films.length) {
    document.querySelector(`#showMore`).classList.add(`disabledButton`);
  } else {
    from += FILMS_SIZE_FOR_RENDER_AT_LINE;
  }
};

const addFilmCards = () => {
  render(filmsWrapperNode, getFilmCardsFrom(films, from, FILMS_SIZE_FOR_RENDER_AT_LINE));
  setShowFullInformationHandler();
};

function createHeader(films) {
  const headerNode = document.querySelector(`#header`);
  render(headerNode, getHeaderPanel(getFilteredFilms(films, `isWatchedList`)));
}

function createMainContent(films) {
  render(mainNode, getContent(films));
  setShowFullInformationHandler();
}

function setHandlerToShowMoreButton() {
  const showMoreBtn = document.querySelector(`#showMore`);
  showMoreBtn.addEventListener(`click`, addFilmCards);
}

function createFooter(filmsAmount) {
  const footerStats = document.querySelector(`#footer`);
  render(footerStats, getFooterPanel(filmsAmount));
}

const mainNode = document.querySelector(`#main`);
const films = new Array(ALL_FILMS_SIZE).fill(``).map(getDataFilm);
createHeader(films);
createMainContent(films);
const filmsWrapperNode = document.querySelector(`#films_container`);
setHandlerToShowMoreButton();
createFooter(films.length);
