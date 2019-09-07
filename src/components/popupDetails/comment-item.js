import {AbstractComponent} from "../abstract-component";

export class CommentItem extends AbstractComponent {
  constructor({author = `Неопознанный`, commentText = `нет комментария`, daysAgo = ``}) {
    super();
    this._author = author;
    this._commentText = commentText;
    this._daysAgo = daysAgo;
  }

  getTemplate() {
    return `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/smile.png" width="55" height="55" alt="emoji">
            </span>
            <div>
              <p class="film-details__comment-text">${this._commentText}</p>
              <p class="film-details__comment-info
                <span class="film-details__comment-author">${this._author}</span>
                <span class="film-details__comment-day">${this._daysAgo}</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>`;
  }
}
