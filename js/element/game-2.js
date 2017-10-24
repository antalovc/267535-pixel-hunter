import ViewGame2 from '../view/view-game-2.js';

class Game2 {

  constructor(app) {
    this._app = app;
    this._game2View = new ViewGame2(app.main);
    this._game2View.onSubAnswer = (isPhoto) => {
      app.main.game.currentQuestion.subanswer(isPhoto);
    };
  }

  init() {
    this._game2View.update(this._app.main);
    this._app.setScreen(this, this._app.HAS_HEADER);
  }

  get element() {
    return this._game2View.element;
  }
}

export default Game2;


