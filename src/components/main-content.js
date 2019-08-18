import {menuPanel} from './menu-panel.js';
import {sortingPanel} from './sorting-panel.js';
import {filmsWrapper} from './film-cards-wrapper.js';

export const getContent = (params) => {
  return menuPanel(params.watchedFilms, params.historiedFilms, params.favoriteFilms)
    + sortingPanel()
    + filmsWrapper(params.allFilms, params.topRatedFilms, params.topCommentedFilms);
};
