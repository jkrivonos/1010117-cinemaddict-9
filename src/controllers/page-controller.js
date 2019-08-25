class PageController {
  constructor(container, films) {
    this._container = container;
    this._films = films;
    this._page = new Page();
    this._filmsList = new filmsList();
  }
  init() {
    render(this._container, this._page.getElement(), Position.BEFOREEND);
    render(this._page.getElement(), this._filmsList.getElement(), Position.BEFOREEND);

    this._films.forEach((film) => this._renderFilm(film));
  }
  _renderFilm(film){


  }
}
