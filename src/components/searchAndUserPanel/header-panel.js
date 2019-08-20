import {searchPanel} from './search-panel.js';
import {userProfile} from './user-profile.js';

export const getHeaderPanel = (watchedFilms) => {
  return searchPanel() + userProfile(watchedFilms);
};
