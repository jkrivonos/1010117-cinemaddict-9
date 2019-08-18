import {getHeaderPanel} from '../src/components/header-panel.js';
import {getContent} from '../src/components/main-content.js';
import {createFilmCard} from '../src/components/film-card.js';
import {getDataFilm} from '../src/data.js';
import {getFooterPanel} from '../src/components/footer-statistics';
import {filmDetailsWrapper} from '../src/components/film-details-wrapper.js';

const ALLFILMS = 15;
const LIMIT = 5;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const getFilteredFilms = (filmsArray, keyName) => {
  return filmsArray.filter((el) => el[keyName]).length;
};

const showFullInformation = () => {
  render(mainNode, filmDetailsWrapper(), `beforeend`);
};

let start = 0;
const getFilmCards = () => {
  let finish = (start + LIMIT < films.length) ? start + LIMIT : films.length;
  let filmsContainer = ``;
  for (let i = start; i < finish; i++) {
    filmsContainer += createFilmCard(films[i]);
  }
  return filmsContainer;
};
const setShowFullInformationHandler = () => {
  const filmCards = document.querySelectorAll(`.film-card`);
  let finish = (start + LIMIT < films.length) ? start + LIMIT : films.length;
  for (let i = start; i < start + LIMIT; i++) {
    filmCards[i].addEventListener(`click`, showFullInformation);
  }
  if (finish === films.length) {
    document.querySelector(`#showMore`).classList.add(`disabledButton`);
  } else {
    start += LIMIT;
  }
};

const showFilmCards = () => {
  render(filmsWrapperNode, getFilmCards(), `beforeend`);
  setShowFullInformationHandler();
};

const allFilms = (count) => new Array(count).fill(``).map(getDataFilm);
const films = allFilms(ALLFILMS);

const headerNode = document.querySelector(`#header`);
render(headerNode, getHeaderPanel(getFilteredFilms(films, `isWatchedList`)), `beforeend`);

const mainNode = document.querySelector(`#main`);
const sortedTopRatedFilms = films.sort((a, b) => b.rating - a.rating);
const sortedCommentedFilms = films.sort((a, b) => b.comments - a.comments);

const contentParams = {
  allFilms: getFilmCards(),
  watchedFilms: getFilteredFilms(films, `isWatchedList`),
  historiedFilms: getFilteredFilms(films, `isHistory`),
  favoriteFilms: getFilteredFilms(films, `isFavorite`),
  topRatedFilms: createFilmCard(sortedTopRatedFilms[0]) + createFilmCard(sortedTopRatedFilms[1]),
  topCommentedFilms: createFilmCard(sortedCommentedFilms[0]) + createFilmCard(sortedCommentedFilms[1])
};
render(mainNode, getContent(contentParams), `beforeend`);
setShowFullInformationHandler();

const filmsWrapperNode = document.querySelector(`#films_container`);
const showMoreBtn = document.querySelector(`#showMore`);

showMoreBtn.addEventListener(`click`, showFilmCards);
const footerStats = document.querySelector(`#footer`);

render(footerStats, getFooterPanel(films.length), `beforeend`);
