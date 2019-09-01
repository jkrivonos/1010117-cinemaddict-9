import {FilmCardDetails} from '../components/mainContent/film-card-details.js'
import {FilmCard} from "../components/mainContent/film-card";

export class MovieController {
  constructor(container, filmData, onDataChange, onChangeView) {
    this._container = container;
    this._filmData = filmData;
    this._filmView = new FilmCard(filmData);
    this._filmCardDetails = new FilmCardDetails(filmData);
    this._onChangeView = onChangeView;
    this._onDataChange = onDataChange;
  }

  init() {
    this._showFullInformation();
  }

  _showFullInformation() {
    document.body.append(this._container);
    const filmCardDetails = new FilmCardDetails(this._filmData);
    const fullFilmInfo = filmCardDetails.getElement();
    this._container.append(fullFilmInfo);
    const closeFilmCard = fullFilmInfo.querySelector(`.film-details__close-btn`);

    closeFilmCard.addEventListener(`click`, this._onEscKeyDown);
    document.addEventListener(`keydown`, this._onEscKeyDown);

    const commentArea = fullFilmInfo.querySelector(`textarea`);
    commentArea.addEventListener(`focus`, () => {
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });
    commentArea.addEventListener(`blur`, () => {
      console.log(this._filmData._element);
      console.log(filmCardDetails.getElement().querySelector(`.film-details__inner`));
      const formData = new FormData(filmCardDetails.getElement().querySelector(`.film-details__inner`));
      console.log(`formData`,formData);
      const entry = {
        comments: formData.get(`comment`),
        watchlistFlag: formData.get(`watchlist`),
        emoji: formData.getAll(`comment-emoji`)
      };
      this._onDataChange(entry, this._filmData);
      this._onChangeView();
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

