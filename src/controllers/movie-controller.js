import {FilmCardDetails} from '../components/mainContent/film-card-details.js'

export class MovieController {

  constructor(container, filmData, onDataChange, onChangeView) {
    this._container = container;
    /*элемент, в который конструктор будет аппендить карточки. .film-details */
    this._filmData = filmData;
  }

  init() {
    this._showFullInformation();
  }

  _showFullInformation() {
    document.body.append(this._container);

    const fullFilmInfo = new FilmCardDetails(this._filmData).getElement();
    this._container.append(fullFilmInfo);
    const closeFilmCard = fullFilmInfo.querySelector(`.film-details__close-btn`);

    closeFilmCard.addEventListener(`click`, this._onEscKeyDown);
    document.addEventListener(`keydown`, this._onEscKeyDown);

    const commentArea = fullFilmInfo.querySelector(`textarea`);
    commentArea.addEventListener(`focus`, () => {
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });
    commentArea.addEventListener(`blur`, () => {
      const formData = new FormData(new FilmCardDetails(this._filmData).getElement().querySelector(`.film-details__inner`));
      console.log(`formData`,formData);
      const entry = {
        comments: formData.get(`comment`),
        watchlistFlag: formData.get(`watchlist`),
        emoji: formData.getAll(`comment-emoji`)
      };
      console.log(`entry`,entry);
      document.addEventListener(`keydown`, this._onEscKeyDown);
    });
  }

  _onEscKeyDown() {
    const detailCardElement = document.querySelector(`.film-details`);
    if (detailCardElement) {
      detailCardElement.remove();
    }
  }
}

