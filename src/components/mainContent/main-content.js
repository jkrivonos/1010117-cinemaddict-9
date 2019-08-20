import {menuPanel} from './menu-panel.js';
import {sortingPanel} from './sorting-panel.js';
import {filmsWrapper} from './mainFilms/film-cards-wrapper.js';
import {createFilmCard, getFilmCardsFrom, FILMS_SIZE_FOR_RENDER_AT_LINE} from './mainFilms/film-card.js';

const getFilteredFilms = (films, keyName) => {
  return films.filter((el) => el[keyName]).length;
};

export const getContent = (films) => {
  const sortedTopRatedFilms = films.sort((a, b) => b.rating - a.rating);
  const sortedCommentedFilms = films.sort((a, b) => b.comments - a.comments);
  return `${menuPanel(getFilteredFilms(films, `isWatchedList`), getFilteredFilms(films, `isHistory`), getFilteredFilms(films, `isFavorite`))}
  ${sortingPanel()}
  ${filmsWrapper(getFilmCardsFrom(films, 0, FILMS_SIZE_FOR_RENDER_AT_LINE), createFilmCard(sortedTopRatedFilms[0]) + createFilmCard(sortedTopRatedFilms[1]), createFilmCard(sortedCommentedFilms[0]) + createFilmCard(sortedCommentedFilms[1]))}`;
};
