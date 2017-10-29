import ViewIntro from '../view/view-intro.js';

export default class PresenterIntro {

  constructor() {
    this._introView = new ViewIntro();
  }

  init(app) {
    app.setScreen(this, app.NO_HEADER);
  }

  get element() {
    return this._introView.element;
  }
}
