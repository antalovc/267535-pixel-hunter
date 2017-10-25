import ViewGreeting from '../view/view-greeting.js';

export default class PresenterGreeting {

  constructor(app) {
    this._app = app;
    this._greetingView = new ViewGreeting(app.main);
    this._greetingView.onContinueClicked = () => {
      app.main.prepare();
    };
  }

  init() {
    this._greetingView.update(this._app.main);
    this._app.setScreen(this, this._app.NO_HEADER);
  }

  get element() {
    return this._greetingView.element;
  }
}
