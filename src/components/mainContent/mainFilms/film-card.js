const FILMS_SIZE_FOR_RENDER_AT_LINE = 5;

const createFilmCard = (filmParams) =>
  `<article class="film-card">
          <h3 class="film-card__title">${filmParams.title}</h3>
          <p class="film-card__rating">${filmParams.rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${filmParams.year}</span>
            <span class="film-card__duration">${filmParams.duration}</span>
            <span class="film-card__genre">${filmParams.genre}</span>
          </p>
          <img src=${filmParams.image} alt="" class="film-card__poster">
          <p class="film-card__description">${filmParams.description}</p>
          <a class="film-card__comments">${filmParams.comments}</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite">Mark as favorite</button>
          </form>
  </article>`;

const getFilmCardsFrom = (films, from, amount) => {
  let to = (from+amount < films.length) ? from+amount : films.length;
  let filmsContainer = ``;
  for (let i = from; i < to; i++) {
    filmsContainer += createFilmCard(films[i]);
  }
  return filmsContainer;
};

export {createFilmCard, getFilmCardsFrom, FILMS_SIZE_FOR_RENDER_AT_LINE};
