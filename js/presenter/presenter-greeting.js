import ViewGreeting from '../view/view-greeting.js';

export default class PresenterGreeting {

  constructor(app) {
    this._app = app;
    this._greetingView = new ViewGreeting(app);
    this._greetingView.onContinueClicked = () => {
      app.prepare();
    };
  }

  init() {
    this._greetingView.update(this._app);
    this._app.setScreen(this, this._app.NO_HEADER);
  }

  get element() {
    return this._greetingView.element;
  }
}
