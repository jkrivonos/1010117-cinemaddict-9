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

const headerNode = document.querySelector(`.header`);
render(headerNode, searchPanel(), `beforeend`);
render(headerNode, userProfile(WATCHED_FILMS), `beforeend`);

const menuNode = document.querySelector(`.main`);
render(menuNode, sortingPanel(), `beforeend`);
render(menuNode, filmsWrapper(), `beforeend`);

const filmNode = document.querySelector('.films');
const filmsWrapperNode = document.querySelector(`.films-list__container`);

createFilmCard(getDataFilm());
render(filmsWrapperNode, showMoreButton(), `afterend`);

//
// render(topRatedFilmsWrapperNode, createFilmCard(`Santa Claus Conquers the Martians`, `2.6`, `1968`, `69m`, `Drama`, `'./images/posters/santa-claus-conquers-the-martians.jpg'`, `Frankie Machine (Frank Sinatra) is released from the federal Narcotic Farm in Lexington, Kentucky with a set of drums and a new outlook on…`), `beforeend`);
// render(topRatedFilmsWrapperNode, createFilmCard(`Sagebrush Trail`, `3.2`, `1933`, `54m`, `Western`, `'./images/posters/sagebrush-trail.jpg'`, `Sentenced for a murder he did not commit, John Brant escapes from prison determined to find the real killer. By chance Brant's narrow escap…`), `beforeend`);

render(filmNode, mostCommentedFilmsWrapper(), `beforeend`);

const mostCommentedFilmsWrapperNode = document.querySelector(`.films-list--extra .mostcommented`);
// render(mostCommentedFilmsWrapperNode, createFilmCard(`Santa Claus Conquers the Martians`, `2.6`, `1968`, `69m`, `Drama`, `'./images/posters/santa-claus-conquers-the-martians.jpg'`, `Frankie Machine (Frank Sinatra) is released from the federal Narcotic Farm in Lexington, Kentucky with a set of drums and a new outlook on…`), `beforeend`);
// render(mostCommentedFilmsWrapperNode, createFilmCard(`The Dance of Life`, `8.3`, `1929`, `1h 55m`, `Musical`, `'./images/posters/the-dance-of-life.jpg'`, `Burlesque comic Ralph 'Skid' Johnson (Skelly), and specialty dancer Bonny Lee King (Carroll), end up together on a cold, rainy night at a tr…`, `5 comments`), `beforeend`);


const allFilms = (count) => new Array(count).fill(``).map(getDataFilm);
const films = allFilms(10);
films.forEach((el) => render(filmsWrapperNode, createFilmCard(el), `beforeend`));

// TODO:переписать все одной функцией getFilteredFilms
const getWatchedFilms = (films) => {
  const watchedFilms = films.reduce((finalList, curFilm) => {
    if (curFilm.isWatchedList) {
      finalList.push(curFilm);
    }
    return finalList;
  }, []);
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

const filmCardWraper = document.querySelector(`.film-card`);
const showFullInformation = () => {
  console.log(`showFullInformation`);
};
filmCardWraper.addEventListener(`click`, showFullInformation);
// render(headerNode, filmDetailsWrapper, `beforeend`);
const detailsNode = document.querySelector(`.film-details`);
// console.log(`detailsNode`, detailsNode);
// render(headerNode, filmDetailsCard(), `beforeend`);

render(filmNode, topRatedFilmsWrapper(), `beforeend`);
const topRatedFilmsWrapperNode = document.querySelector(`.toprated`);
const topRatedFilms = films.sort((a,b) => b.rating - a.rating);
const topRatedFilmsForRender = [];
topRatedFilmsForRender.push(topRatedFilms[0], topRatedFilms[1]);
console.log(`topRatedFilms`, topRatedFilms);
topRatedFilmsForRender.forEach((el) => render(topRatedFilmsWrapperNode, createFilmCard(el), `beforeend`));

const commentedFilmsNode = document.querySelector(`.commented`);
const commentedFilms = films.sort((a,b) => b.comments - a.comments);
const commentedFilmsForRender = [];
commentedFilmsForRender.push(commentedFilms[0], commentedFilms[1]);
console.log(`commentedFilmsForRender`, commentedFilmsForRender);
commentedFilmsForRender.forEach((el) => render(commentedFilmsNode, createFilmCard(el), `beforeend`));

const footerStats = document.querySelector(`.footer`);
render(footerStats, getStatistic(films.length), `beforeend`);
