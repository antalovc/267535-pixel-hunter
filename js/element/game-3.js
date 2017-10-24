import ViewGame3 from '../view/view-game-3.js';

class Game3 {

  constructor(app) {
    this._app = app;
    this._game3View = new ViewGame3(app.main);
    this._game3View.onSubAnswer = (nIntrus) => {
      app.main.game.currentQuestion.subanswer(nIntrus);
    };
  }

  init() {
    this._game3View.update(this._app.main);
    this._app.setScreen(this, this._app.HAS_HEADER);
  }

  get element() {
    return this._game3View.element;
  }
}

export default Game3;
