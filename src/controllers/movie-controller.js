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

  _createDataToUpdate(filmCardDetails){
    const formData = new FormData(filmCardDetails.getElement().querySelector(`.film-details__inner`));
    console.log(formData.get(`watchlist`));
    const entry = {
      description: filmCardDetails._description,
      title: filmCardDetails._title,
      rating: formData.get(`rating`),
      genre: formData.getAll(`genre`),
      image: filmCardDetails._image,
      isWatchedList: formData.get(`watchlist`),
      isHistory: formData.get(`watched`),
      isFavorite: formData.get(`favorite`),
      comments: formData.get(`comment`),
      emoji: formData.getAll(`comment-emoji`)
    };
    console.log(entry);
    this._onDataChange(entry, this._filmData);
  }

  _showFullInformation() {
    document.body.append(this._container);
    const filmCardDetails = new FilmCardDetails(this._filmData);
    const fullFilmInfo = filmCardDetails.getElement();
    this._container.append(fullFilmInfo);

    const closeFilmCard = fullFilmInfo.querySelector(`.film-details__close-btn`);
    closeFilmCard.addEventListener(`click`, this._onEscKeyDown);

// TODO: не могу понять, почему в filmCardDetails в FormDate isWatchedList: null, если я не него уже нажала, а при втором разе уже on..

    fullFilmInfo.querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, (evt) => {
      console.log(evt);
      this._createDataToUpdate(filmCardDetails);
    });

    fullFilmInfo.querySelector(`.film-details__control-label--watched`).addEventListener(`click`, () => {
      this._createDataToUpdate(filmCardDetails);
    });

    fullFilmInfo.querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, () => {
      this._createDataToUpdate(filmCardDetails);
    });
    document.addEventListener(`keydown`, this._onEscKeyDown);

    const commentArea = fullFilmInfo.querySelector(`textarea`);
    commentArea.addEventListener(`focus`, () => {
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });
    commentArea.addEventListener(`blur`, () => {
      const formData = new FormData(filmCardDetails.getElement().querySelector(`.film-details__inner`));
      const entry = {
        comments: formData.get(`comment`),
        watchlistFlag: formData.get(`watchlist`),
        description: formData.get(`description`),
        emoji: formData.getAll(`comment-emoji`)
      };
      console.log(`entry1`, entry);
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

