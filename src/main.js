import {searchPanel} from '../src/components/search-panel.js';
import {userProfile} from '../src/components/user-profile.js';
import {menuPanel} from '../src/components/menu-panel.js';
import {sortingPanel} from '../src/components/sorting-panel.js';
import {filmsWrapper} from '../src/components/film-cards-wrapper.js';
import {filmCard} from '../src/components/film-card.js';
import {showMoreButton} from '../src/components/show-more-button.js';
import {topRatedFilmsWrapper} from '../src/components/top-rated-films-wrapper.js';
import {mostCommentedFilmsWrapper} from '../src/components/most-commented-films-wrapper.js';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const searchNode = document.querySelector(`.header`);
render(searchNode, searchPanel(), `beforeend`);
render(searchNode, userProfile(), `beforeend`);

const menuNode = document.querySelector(`.main`);
render(menuNode, menuPanel(), `beforeend`);
render(menuNode, sortingPanel(), `beforeend`);
render(menuNode, filmsWrapper(), `beforeend`);



const filmNode = document.querySelector('.films');




const filmsWrapperNode = document.querySelector(`.films-list__container`);
render(filmsWrapperNode, filmCard(`The Dance of Life`, `8.3`, `1929`, `1h 55m`, `Musical`, `'./images/posters/the-dance-of-life.jpg'`, `Burlesque comic Ralph 'Skid' Johnson (Skelly), and specialty dancer Bonny Lee King (Carroll), end up together on a cold, rainy night at a tr…`, `5 comments`), `beforeend`);
render(filmsWrapperNode, filmCard(`Sagebrush Trail`, `3.2`, `1933`, `54m`, `Western`, `'./images/posters/sagebrush-trail.jpg'`, `Sentenced for a murder he did not commit, John Brant escapes from prison determined to find the real killer. By chance Brant's narrow escap…`), `beforeend`);
render(filmsWrapperNode, filmCard(`The Man with the Golden Arm`, `2.6`, `1968`, `69m`, `Drama`, `'./images/posters/the-man-with-the-golden-arm.jpg'`, `Frankie Machine (Frank Sinatra) is released from the federal Narcotic Farm in Lexington, Kentucky with a set of drums and a new outlook on…`), `beforeend`);
render(filmsWrapperNode, filmCard(`The Great Flamarion`, `2.6`, `1968`, `69m`, `Drama`, `'./images/posters/the-great-flamarion.jpg'`, `The film opens following a murder at a cabaret in Mexico City in 1936, and then presents the events leading up to it in flashback. The Grea…`), `beforeend`);
render(filmsWrapperNode, filmCard(`Santa Claus Conquers the Martians`, `2.6`, `1968`, `69m`, `Drama`, `'./images/posters/santa-claus-conquers-the-martians.jpg'`, `Frankie Machine (Frank Sinatra) is released from the federal Narcotic Farm in Lexington, Kentucky with a set of drums and a new outlook on…`), `beforeend`);
render(filmsWrapperNode, showMoreButton(), `afterend`);

render(filmNode, topRatedFilmsWrapper(), `beforeend`);
const topRatedFilmsWrapperNode = document.querySelector(`.films-list--extra .films-list__container`);
render(topRatedFilmsWrapperNode, filmCard(`Santa Claus Conquers the Martians`, `2.6`, `1968`, `69m`, `Drama`, `'./images/posters/santa-claus-conquers-the-martians.jpg'`, `Frankie Machine (Frank Sinatra) is released from the federal Narcotic Farm in Lexington, Kentucky with a set of drums and a new outlook on…`), `beforeend`);
render(topRatedFilmsWrapperNode, filmCard(`Sagebrush Trail`, `3.2`, `1933`, `54m`, `Western`, `'./images/posters/sagebrush-trail.jpg'`, `Sentenced for a murder he did not commit, John Brant escapes from prison determined to find the real killer. By chance Brant's narrow escap…`), `beforeend`);

render(filmNode, mostCommentedFilmsWrapper(), `beforeend`);

const mostCommentedFilmsWrapperNode = document.querySelector(`.films-list--extra .mostcommented`);
render(mostCommentedFilmsWrapperNode, filmCard(`Santa Claus Conquers the Martians`, `2.6`, `1968`, `69m`, `Drama`, `'./images/posters/santa-claus-conquers-the-martians.jpg'`, `Frankie Machine (Frank Sinatra) is released from the federal Narcotic Farm in Lexington, Kentucky with a set of drums and a new outlook on…`), `beforeend`);
render(mostCommentedFilmsWrapperNode, filmCard(`The Dance of Life`, `8.3`, `1929`, `1h 55m`, `Musical`, `'./images/posters/the-dance-of-life.jpg'`, `Burlesque comic Ralph 'Skid' Johnson (Skelly), and specialty dancer Bonny Lee King (Carroll), end up together on a cold, rainy night at a tr…`, `5 comments`), `beforeend`);
