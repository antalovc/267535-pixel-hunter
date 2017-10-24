import ViewHeader from '../view/view-header.js';

class Header {

  constructor(app) {
    this._app = app;
    this._headerView = new ViewHeader(app.main);
    this._headerView.onBackClicked = () => {
      app.main.timer.reset();
      app.main.greet();
    };
  }

  init() {
    this._headerView.update(this._app.main);
  }

  get element() {
    return this._headerView.element;
  }
}

export default Header;
