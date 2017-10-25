import ViewHeader from '../view/view-header.js';

export default class PresenterHeader {

  constructor(app) {
    this._app = app;
    this._headerView = new ViewHeader(app);
    this._headerView.onBackClicked = () => {
      app.timer.reset();
      app.greet();
    };
  }

  init() {
    this._headerView.update(this._app);
  }

  get element() {
    return this._headerView.element;
  }
}
