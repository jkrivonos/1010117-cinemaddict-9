import {getDataFilm} from '../src/data.js';
import {PageController} from './controllers/page-controller.js';
import {User} from './components/searchAndUserPanel/user-panel.js';
import {Search} from './components/searchAndUserPanel/search-panel.js';
import {Menu} from './components/mainContent/menu-panel.js';
// import {SortingMenu} from './components/mainContent/sorting-panel.js';
import {Wrapper} from './components/mainContent/films-wrapper.js';
import {Footer} from './components/footer';

const ALL_FILMS_SIZE = 11;
const films = new Array(ALL_FILMS_SIZE).fill(``).map(getDataFilm);
const getFilteredFilmsCount = (filmsStack, keyName) => {
  return filmsStack.filter((el) => el[keyName]).length;
};
const createHeader = (filmsContainer) => {
  const headerPoint = document.getElementById(`header`);
  const searchPanelElement = new Search().getElement();
  const userInfoElement = new User().getElement(getFilteredFilmsCount(filmsContainer, `isWatchedList`));
  headerPoint.append(searchPanelElement, userInfoElement);
};
const createMainContent = (filmsContent) => {
  const mainPoint = document.getElementById(`main`);
  const menuElement = new Menu().getElement(getFilteredFilmsCount(filmsContent, `isWatchedList`), getFilteredFilmsCount(filmsContent, `isHistory`), getFilteredFilmsCount(filmsContent, `isFavorite`));
  // const sortingElement = new SortingMenu().getElement();
  const filmsWrapper = new Wrapper().getElement();
  mainPoint.append(menuElement, filmsWrapper);
};
const createFooter = (filmsAmount) => {
  const footerPoint = document.getElementById(`footer`);
  const footerElement = new Footer().getElement(filmsAmount);
  footerPoint.append(footerElement);
};
createHeader(films);
createMainContent(films);
const filmsContainer = document.querySelector(`.films-list__container`);
const pageController = new PageController(filmsContainer, films);
pageController.init();
createFooter(films.length);
