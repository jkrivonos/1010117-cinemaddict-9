import {searchPanel} from '../src/components/search-panel.js';
import {userProfile} from '../src/components/user-profile.js';
import {menuPanel} from '../src/components/menu-panel.js';
import {sortingPanel} from '../src/components/sorting-panel.js';
import {filmsWrapper} from '../src/components/film-cards-wrapper.js';
import {createFilmCard} from '../src/components/film-card.js';
import {getDataFilm} from '../src/data.js';
import {getStatistic} from '../src/components/footer-statistics';
import {filmDetailsWrapper} from '../src/components/film-details-wrapper.js';
import {filmDetailsCard} from '../src/components/film-details.js';

const ALLFILMS = 15;
const LIMIT = 5;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const getFilteredFilms = (filmsArray, keyName) => {
  return filmsArray.filter((el) => el[keyName]).length;
};

const showFullInformation = () => {
  render(menuNode, filmDetailsWrapper(), `beforeend`);
  const detailsNode = document.querySelector(`#film_details`);
  render(detailsNode, filmDetailsCard(), `beforeend`);
};

let start = 0;
const showFilmCards = () => {
  let finish = (start + LIMIT < films.length) ? start + LIMIT : films.length;
  let filmsContainer = ``;
  for (let i = start; i < finish; i++) {
    filmsContainer += createFilmCard(films[i]);
  }
  render(filmsWrapperNode, filmsContainer, `beforeend`);
  const filmCards = document.querySelectorAll(`#film_card`);
  for (let i = start; i < start + LIMIT; i++) {
    filmCards[i].addEventListener(`click`, showFullInformation);
  }
  if (finish === films.length) {
    document.querySelector(`#showMore`).classList.add(`disabledButton`);
  } else {
    start += LIMIT;
  }
};

const allFilms = (count) => new Array(count).fill(``).map(getDataFilm);
const films = allFilms(ALLFILMS);

const menuNode = document.querySelector(`#main`);
render(menuNode,
    menuPanel(getFilteredFilms(films, `isWatchedList`), getFilteredFilms(films, `isHistory`), getFilteredFilms(films, `isFavorite`))
      + sortingPanel()
      + filmsWrapper(),
    `beforeend`);

const headerNode = document.querySelector(`#header`);
render(headerNode, searchPanel(), `beforeend`);
render(headerNode, userProfile(getFilteredFilms(films, `isWatchedList`)), `beforeend`);

const filmsWrapperNode = document.querySelector(`#films_container`);
showFilmCards();
const showMoreBtn = document.querySelector(`#showMore`);

showMoreBtn.addEventListener(`click`, showFilmCards);
const topRatedFilmsWrapperNode = document.querySelector(`#toprated`);
const sortedTopRatedFilms = films.sort((a, b) => b.rating - a.rating);

render(topRatedFilmsWrapperNode, createFilmCard(sortedTopRatedFilms[0]) + createFilmCard(sortedTopRatedFilms[1]), `beforeend`);
const commentedFilmsNode = document.querySelector(`#commented`);
const sortedCommentedFilms = films.sort((a, b) => b.comments - a.comments);

render(commentedFilmsNode, createFilmCard(sortedCommentedFilms[0]) + createFilmCard(sortedCommentedFilms[1]), `beforeend`);
const footerStats = document.querySelector(`#footer`);

render(footerStats, getStatistic(films.length), `beforeend`);
