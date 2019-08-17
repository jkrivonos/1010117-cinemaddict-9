import {searchPanel} from '../src/components/search-panel.js';
import {userProfile} from '../src/components/user-profile.js';
import {menuPanel} from '../src/components/menu-panel.js';
import {sortingPanel} from '../src/components/sorting-panel.js';
import {filmsWrapper} from '../src/components/film-cards-wrapper.js';
import {createFilmCard} from '../src/components/film-card.js';
import {showMoreButton} from '../src/components/show-more-button.js';
import {topRatedFilmsWrapper} from '../src/components/top-rated-films-wrapper.js';
import {mostCommentedFilmsWrapper} from '../src/components/most-commented-films-wrapper.js';
import {getDataFilm} from '../src/data.js';
import {getStatistic} from '../src/components/footer-statistics';
import {filmDetailsCard} from '../src/components/film-details.js';

const ALLFILMS = 15;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const menuNode = document.querySelector(`.main`);

const allFilms = (count) => new Array(count).fill(``).map(getDataFilm);
const films = allFilms(ALLFILMS);

// TODO:переписать все одной функцией getFilteredFilms
const getWatchedFilms = (el) => {
  const watchedFilms = el.reduce((finalList, curFilm) => {
    if (curFilm.isWatchedList) {
      finalList.push(curFilm);
    }
    return finalList;
  }, []);
  const headerNode = document.querySelector(`.header`);
  render(headerNode, searchPanel(), `beforeend`);
  render(headerNode, userProfile(watchedFilms.length), `beforeend`);
  return watchedFilms.length;
};

const getHistoriedFilms = (el) => {
  const historiedFilms = el.reduce((finalList, curFilm) => {
    if (curFilm.isHistory) {
      finalList.push(curFilm);
    }
    return finalList;
  }, []);
  return historiedFilms.length;
};

const getFavoritesFils = (el) => {
  const favoritesFilms = el.reduce((finalList, curFilm) => {
    if (curFilm.isFavorite) {
      finalList.push(curFilm);
    }
    return finalList;
  }, []);
  return favoritesFilms.length;
};
render(menuNode, menuPanel(getWatchedFilms(films), getHistoriedFilms(films), getFavoritesFils(films)), `beforeend`);
render(menuNode, sortingPanel(), `beforeend`);
render(menuNode, filmsWrapper(), `beforeend`);

const filmNode = document.querySelector(`.films`);
const filmsWrapperNode = document.querySelector(`.films-list__container`);

createFilmCard(getDataFilm());
render(filmsWrapperNode, showMoreButton(), `afterend`);

render(filmNode, topRatedFilmsWrapper(), `beforeend`);

const topRatedFilmsWrapperNode = document.querySelector(`.toprated`);
const topRatedFilms = films.sort((a, b) => b.rating - a.rating);
const topRatedFilmsForRender = [];
topRatedFilmsForRender.push(topRatedFilms[0], topRatedFilms[1]);
topRatedFilmsForRender.forEach((el) => render(topRatedFilmsWrapperNode, createFilmCard(el), `beforeend`));

render(filmNode, mostCommentedFilmsWrapper(), `beforeend`);

const commentedFilmsNode = document.querySelector(`.commented`);
const commentedFilms = films.sort((a, b) => b.comments - a.comments);
const commentedFilmsForRender = [];
commentedFilmsForRender.push(commentedFilms[0], commentedFilms[1]);
commentedFilmsForRender.forEach((el) => render(commentedFilmsNode, createFilmCard(el), `beforeend`));

const footerStats = document.querySelector(`.footer`);
render(footerStats, getStatistic(films.length), `beforeend`);
const FIRST_COUNT_FILMS = 5;
const LIMIT = 2;
let start = 0;

const showMoreFilmsHandler = () => {
  if (start + LIMIT <= films.length) {
    for (let i = start; i < start + LIMIT; i++) {
      render(filmsWrapperNode, createFilmCard(films[i]), `beforeend`);
    }
    start += LIMIT;
  }
  else {
    const button = document.querySelector(`.films-list__show-more`);
    button.classList.add("disabledButton");
  }
};

for (let i = start; i < FIRST_COUNT_FILMS; i++) {
  render(filmsWrapperNode, createFilmCard(films[i]), `beforeend`);
}
start = FIRST_COUNT_FILMS;

const showMoreBtn = document.querySelector(`.films-list__show-more`);
showMoreBtn.addEventListener(`click`, showMoreFilmsHandler);



const filmCardWraper = document.querySelectorAll(`.film-card`);
console.log(`filmCardWraper`, filmCardWraper );
const showFullInformation = () => {
  const detailsNode = document.querySelector(`.film-details`);
  console.log(`detailsNode`,detailsNode);
  // render(filmCardWraper, filmDetailsCard(), `beforeend`);
};
// filmCardWraper.addEventListener(`click`, showFullInformation);
filmCardWraper.forEach(el => el.addEventListener(`click`, showFullInformation));
