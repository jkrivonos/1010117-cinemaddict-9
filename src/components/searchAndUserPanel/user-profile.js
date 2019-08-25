export const userProfile = (watchedFilms) =>
  `<section class="header__profile profile">
    <p class="profile__rating">${getUserStatus(watchedFilms)}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;

const getUserStatus = (watchedFilms) => {
  if (watchedFilms > 0) {
    if (watchedFilms > 10) {
      if (watchedFilms >= 20) {
        return `movie buff`;
      }
      return `fun`;
    } else if (watchedFilms <= 10) {
      return `novice`;
    }
  } return ``;
};

