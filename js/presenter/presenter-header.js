import ViewHeader from '../view/view-header.js';

export default class PresenterHeader {

  constructor(app) {
    this._headerView = new ViewHeader(app);
    this._headerView.onBackClicked = () => {
      app.timer.reset();
      app.greet();
    };
  }

  init(app) {
    this._headerView.update(app);
  }

  get element() {
    return this._headerView.element;
  }
}
