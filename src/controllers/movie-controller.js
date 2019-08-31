import FilmCardDetails from '../components/mainContent/film-card-details'
export class MovieController {

  constructor(container, filmData, onDataChange, onChangeView) {
    this._container = container; /*элемент, в который конструктор будет аппендить карточки. */
  }
  /*В init должен переехать код, который отвечает за показ
  попапа с подробной информацией о фильме и его закрытие.*/
  init() {
    this._showFullInformation();
  }

  _showFullInformation() {
    const fullFilmInfo = new FilmCardDetails(film).getElement();
    this._mainPoint.append(fullFilmInfo);

    const closeFilmCard = fullFilmInfo.querySelector(`.film-details__close-btn`);
    closeFilmCard.addEventListener(`click`, this._onEscKeyDown);
    document.addEventListener(`keydown`, this._onEscKeyDown);

    const commentArea = fullFilmInfo.querySelector(`textarea`);
    commentArea.addEventListener(`focus`, () => {
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    });
    commentArea.addEventListener(`blur`, () => {
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

