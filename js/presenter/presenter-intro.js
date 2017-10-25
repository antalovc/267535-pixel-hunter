import ViewIntro from '../view/view-intro.js';

export default class PresenterIntro {

  constructor(app) {
    this._app = app;
    this._introView = new ViewIntro(app.main);
    this._introView.onIntroClicked = () => {
      app.main.greet();
    };
  }

  init() {
    this._introView.update(this._app.main);
    this._app.setScreen(this, this._app.NO_HEADER);
  }

  get element() {
    return this._introView.element;
  }
}
