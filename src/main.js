import {getHeaderPanel} from './components/searchAndUserPanel/header-panel.js';
import {getContent} from './components/mainContent/main-content.js';
import {getFilteredFilms} from './components/mainContent/menu-panel.js';
import {createFilmCard} from './components/mainContent/mainFilms/film-card.js';
import {getFilmCards} from './components/mainContent/mainFilms/film-card.js';
import {getDataFilm} from '../src/data.js';
import {getFooterPanel} from '../src/components/footer-statistics';
import {filmDetailsWrapper} from './components/filmDetails/film-details-wrapper.js';

const ALLFILMS = 15;
const FILMSTEPFORRENDER = 5;

const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place,  template);
};

const showFullInformation = () => {
  render(mainNode, filmDetailsWrapper());
};

let start = 0;
// TODO: не могу убрать эту функцию, тк она цепляется к showFullInformation
const setShowFullInformationHandler = () => {
  const filmCards = document.querySelectorAll(`.film-card`);
  let finish = (start + FILMSTEPFORRENDER < films.length) ? start + FILMSTEPFORRENDER : films.length;
  for (let i = start; i < start + FILMSTEPFORRENDER; i++) {
    filmCards[i].addEventListener(`click`, showFullInformation);
  }
  if (finish === films.length) {
    document.querySelector(`#showMore`).classList.add(`disabledButton`);
  } else {
    start += FILMSTEPFORRENDER;
  }
};

const showFilmCards = () => {
  render(filmsWrapperNode, getFilmCards(start, FILMSTEPFORRENDER, films));
  setShowFullInformationHandler();
};

const allFilms = (count) => new Array(count).fill(``).map(getDataFilm);
const films = allFilms(ALLFILMS);
console.log(`films`, films);

getFilmCards(0, 5, films);

const headerNode = document.querySelector(`#header`);
render(headerNode, getHeaderPanel(getFilteredFilms(films, `isWatchedList`)));

const mainNode = document.querySelector(`#main`);
const sortedTopRatedFilms = films.sort((a, b) => b.rating - a.rating);
const sortedCommentedFilms = films.sort((a, b) => b.comments - a.comments);

const contentParams = {
  allFilms: getFilmCards(start, FILMSTEPFORRENDER, films),
  watchedFilms: getFilteredFilms(films, `isWatchedList`),
  historiedFilms: getFilteredFilms(films, `isHistory`),
  favoriteFilms: getFilteredFilms(films, `isFavorite`),
  topRatedFilms: createFilmCard(sortedTopRatedFilms[0]) + createFilmCard(sortedTopRatedFilms[1]),
  topCommentedFilms: createFilmCard(sortedCommentedFilms[0]) + createFilmCard(sortedCommentedFilms[1])
};
render(mainNode, getContent(contentParams));
setShowFullInformationHandler();

const filmsWrapperNode = document.querySelector(`#films_container`);
const showMoreBtn = document.querySelector(`#showMore`);

showMoreBtn.addEventListener(`click`, showFilmCards);
const footerStats = document.querySelector(`#footer`);

render(footerStats, getFooterPanel(films.length));
