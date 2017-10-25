import ViewRules from '../view/view-rules.js';

export default class PresenterRules {

  constructor(app) {
    this._app = app;
    this._rulesView = new ViewRules(app.main);
    this._rulesView.onStartClicked = () => {
      app.main.startGame(this._rulesView.playerName);
    };
  }

  init() {
    this._rulesView.update(this._app.main);
    this._app.setScreen(this, this._app.HAS_HEADER);
  }

  get element() {
    return this._rulesView.element;
  }
}
