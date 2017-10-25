import ViewIntro from '../view/view-intro.js';

export default class PresenterIntro {

  constructor(app) {
    this._introView = new ViewIntro();
    this._introView.onIntroClicked = () => {
      app.greet();
    };
  }

  init(app) {
    app.setScreen(this, app.NO_HEADER);
  }

  get element() {
    return this._introView.element;
  }
}
