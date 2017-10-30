import ViewLives from '../view/view-lives.js';

export default class PresenterLives {

  constructor(app) {
    this._livesView = new ViewLives(app.game);
  }

  init(app) {
    this._livesView.update(app.game);
  }

  get element() {
    return this._livesView.element;
  }
}
