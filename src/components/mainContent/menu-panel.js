const menuPanel = (watchlistFilms, historyFilms, favoritesFilms) =>
  `<nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${watchlistFilms}</span></a>
    <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${historyFilms}</span></a>
    <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${favoritesFilms}</span></a>
    <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
  </nav>`;

export {menuPanel};
