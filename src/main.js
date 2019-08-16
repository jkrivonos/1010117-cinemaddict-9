const WATCHED_FILMS = 100;
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

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const menuNode = document.querySelector(`.main`);

const allFilms = (count) => new Array(count).fill(``).map(getDataFilm);
const films = allFilms(20);

// TODO:переписать все одной функцией getFilteredFilms
const getWatchedFilms = (films) => {
  const watchedFilms = films.reduce((finalList, curFilm) => {
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

const getHistoriedFilms = (films) => {
  const historiedFilms = films.reduce((finalList, curFilm) => {
    if (curFilm.isHistory) {
      finalList.push(curFilm);
    }
    return finalList;
  }, []);
  return historiedFilms.length;
};

const getFavoritesFils = (films) => {
  const favoritesFilms = films.reduce((finalList, curFilm) => {
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

const filmNode = document.querySelector('.films');
const filmsWrapperNode = document.querySelector(`.films-list__container`);

createFilmCard(getDataFilm());
render(filmsWrapperNode, showMoreButton(), `afterend`);

films.forEach((el) => render(filmsWrapperNode, createFilmCard(el), `beforeend`));

const filmCardWraper = document.querySelector(`.film-card`);
const showFullInformation = () => {
  console.log(`showFullInformation`);
};
filmCardWraper.addEventListener(`click`, showFullInformation);
const detailsNode = document.querySelector(`.film-details`);

render(filmNode, topRatedFilmsWrapper(), `beforeend`);

const topRatedFilmsWrapperNode = document.querySelector(`.toprated`);
const topRatedFilms = films.sort((a,b) => b.rating - a.rating);
const topRatedFilmsForRender = [];
topRatedFilmsForRender.push(topRatedFilms[0], topRatedFilms[1]);
topRatedFilmsForRender.forEach((el) => render(topRatedFilmsWrapperNode, createFilmCard(el), `beforeend`));

render(filmNode, mostCommentedFilmsWrapper(), `beforeend`);

const commentedFilmsNode = document.querySelector(`.commented`);
const commentedFilms = films.sort((a,b) => b.comments - a.comments);
const commentedFilmsForRender = [];
commentedFilmsForRender.push(commentedFilms[0], commentedFilms[1]);
commentedFilmsForRender.forEach((el) => render(commentedFilmsNode, createFilmCard(el), `beforeend`));

const footerStats = document.querySelector(`.footer`);
render(footerStats, getStatistic(films.length), `beforeend`);
