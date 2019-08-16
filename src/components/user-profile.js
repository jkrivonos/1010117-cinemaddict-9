export const userProfile = (watchedFilms) =>
  `<section class="header__profile profile">
    <p class="profile__rating">${watchedFilms > 0 ? (watchedFilms > 10 ? (watchedFilms > 20 ? `movie buff` : `fan`) : `novice`) : ``}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;
