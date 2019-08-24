import {getContent} from './components/mainContent/main-content.js';
import {getFilmCardsFrom, FILMS_SIZE_FOR_RENDER_AT_LINE} from './components/mainContent/mainFilms/film-card.js';
import {getDataFilm} from '../src/data.js';
import {render} from './utils';
import {filmDetailsWrapper} from './components/filmDetails/film-details-wrapper.js';
import {FilmCard} from './components/film-card.js';
import {FilmCardDetails} from './components/film-card-details.js';
import {User} from './components/searchAndUserPanel/user-board.js';
import {Search} from './components/searchAndUserPanel/search-board.js';
import {Menu} from './components/mainContent/menu-board.js';
import {SortingMenu} from './components/mainContent/sorting-board.js';
import {Wrapper} from './components/mainContent/mainFilms/films-wrapper.js';
import {Footer} from './components/footer';

const ALL_FILMS_SIZE = 10;

const getFilteredFilmsCount = (films, keyName) => {
  return films.filter((el) => el[keyName]).length;
};
const renderFilm = (film, point) => {
  const filmCard = new FilmCard(film);
  const filmDetails = new FilmCardDetails(film);
  filmCard.getElement().querySelector(`.film-card__rating`).addEventListener(`click`, () => console.log(`111`));
  const filmContainer = document.querySelector(point);
  render(filmContainer, filmCard.getElement());
};



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
  const userInfoElement = new User().getElement(getFilteredFilmsCount(films, `isWatchedList`));
  headerPoint.append(searchPanelElement, userInfoElement);
}

function createMainContent(films) {
  const mainPoint = document.querySelector(`#main`);
  const menuElement = new Menu().getElement(getFilteredFilmsCount(films, `isWatchedList`), getFilteredFilmsCount(films, `isHistory`), getFilteredFilmsCount(films, `isFavorite`));
  mainPoint.append(menuElement);
  const sortingElement = new SortingMenu().getElement();
  mainPoint.append(sortingElement);
  const filmsWrapper = new Wrapper().getElement();
  mainPoint.append(filmsWrapper);

  const mainFilmsPoint = `.films-list__container`;
  films.forEach((film) => renderFilm(film, mainFilmsPoint));


  const sortedTopRatedFilms = films.sort((a, b) => b.rating - a.rating);
  const sortedCommentedFilms = films.sort((a, b) => b.comments - a.comments);

  const sortedRatedFilms = [];
  const sortedComFilms = [];
  sortedRatedFilms.push(sortedTopRatedFilms[0], sortedTopRatedFilms[1]);
  sortedComFilms.push(sortedCommentedFilms[0], sortedCommentedFilms[1]);

  sortedRatedFilms.forEach((film) => renderFilm(film, `#toprated`));;
  sortedComFilms.forEach((film) => renderFilm(film, `#commented`));;


  // const mainContentTemplate = createElement(getContent(films));
  // render(mainNode, mainContentTemplate);
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
  const footerElement = new Footer().getElement(filmsAmount);
  footerPoint.append(footerElement);
}

const mainNode = document.querySelector(`#main`);
const films = new Array(ALL_FILMS_SIZE).fill(``).map(getDataFilm);
createHeader(films);
createMainContent(films);
// const filmsWrapperNode = document.querySelector(`#films_container`);
// setHandlerToShowMoreButton();
createFooter(films.length);



