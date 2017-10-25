import ViewRules from '../view/view-rules.js';

export default class PresenterRules {

  constructor(app) {
    this._rulesView = new ViewRules();
    this._rulesView.onStartClicked = () => {
      app.startGame(this._rulesView.playerName);
    };
  }

  init(app) {
    this._rulesView.update();
    app.setScreen(this, app.HAS_HEADER);
  }

  get element() {
    return this._rulesView.element;
  }
}
