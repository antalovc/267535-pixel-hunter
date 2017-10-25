import ViewIntro from '../view/view-intro.js';

export default class PresenterIntro {

  constructor(app) {
    this._app = app;
    this._introView = new ViewIntro(app);
    this._introView.onIntroClicked = () => {
      app.greet();
    };
  }

  init() {
    this._introView.update(this._app);
    this._app.setScreen(this, this._app.NO_HEADER);
  }

  get element() {
    return this._introView.element;
  }
}
