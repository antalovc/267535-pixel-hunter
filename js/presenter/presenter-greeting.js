import ViewGreeting from '../view/view-greeting.js';

export default class PresenterGreeting {

  constructor(app) {
    this._greetingView = new ViewGreeting();
    this._greetingView.onContinueClicked = () => {
      app.prepare();
    };
  }

  get element() {
    return this._greetingView.element;
  }

  init(app) {
    app.setScreen(this, app.NO_HEADER);
  }

}
