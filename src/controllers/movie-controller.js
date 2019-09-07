import {FilmCardDetails} from '../components/popupDetails/film-card-details.js'
import {FilmCard} from "../components/mainContent/film-card";
import {CommentItem} from "../components/popupDetails/comment-item";

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
    const entry = {
      description: filmCardDetails._description,
      title: filmCardDetails._title,
      rating: formData.get(`rating`),
      genre: formData.getAll(`genre`),
      image: filmCardDetails._image,
      isWatchedList: !!formData.get(`watchlist`),
      isHistory: !!formData.get(`watched`),
      isFavorite: !!formData.get(`favorite`),
      comments: formData.getAll(`comment`),
      emoji: formData.getAll(`comment-emoji`)
    };
    console.log(entry);
    this._onDataChange(entry, this._filmData);
  }

  _renderComments() {
    // console.log(`this._filmData.comments`, this._filmData.comments);
    // const commentTree = [];
    // for (let i = 0; i < this._filmData.comments.length; i++){
    //   let commentMessage = new CommentItem(this._filmData.comments[i]).getElement();
    //   console.log(`commentMessage`, commentMessage);
    //   commentTree.push(commentMessage);
    //   console.log(`commentTree`, commentTree);
    //   console.log(`11`, fullFilmInfo.querySelector(`.film-details__comments-list`));
    //   fullFilmInfo.querySelector(`.film-details__comments-list`).append(...commentTree);
    // }
  }


  _showFullInformation() {
    document.body.append(this._container);
    console.log(`this._filmData`, this._filmData);
    const filmCardDetails = new FilmCardDetails(this._filmData);


    const fullFilmInfo = filmCardDetails.getElement();
    this._container.append(fullFilmInfo);

    // this._renderComments();
    const commentTree = [];
    for (let i = 0; i < this._filmData.comments.length; i++){
      let commentMessage = new CommentItem(this._filmData.comments[i]).getElement();
      console.log(`commentMessage`, commentMessage);
      commentTree.push(commentMessage);
      console.log(`commentTree`, commentTree);
      console.log(`11`, fullFilmInfo.querySelector(`.film-details__comments-list`));
      fullFilmInfo.querySelector(`.film-details__comments-list`).append(...commentTree);
    }





    const closeFilmCard = fullFilmInfo.querySelector(`.film-details__close-btn`);
    closeFilmCard.addEventListener(`click`, this._onEscKeyDown);

    fullFilmInfo.querySelector(`#watchlist`).addEventListener(`change`, () => {
      this._createDataToUpdate(filmCardDetails);
    });

    fullFilmInfo.querySelector(`#watched`).addEventListener(`change`, () => {
      this._createDataToUpdate(filmCardDetails);
    });

    fullFilmInfo.querySelector(`#favorite`).addEventListener(`change`, () => {
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

