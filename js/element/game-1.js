import ViewGame1 from '../view/view-game-1.js';

class Game1 {

  constructor(app) {
    this._app = app;
    this._game1View = new ViewGame1(app.main.game);
    this._game1View.onSubAnswer = (nPicture, isPhoto) => {
      app.main.game.currentQuestion.subanswer(nPicture, isPhoto);
    };
  }

  init() {
    this._game1View.update(this._app.main.game);
    this._app.setScreen(this, this._app.HAS_HEADER);
  }

  get element() {
    return this._game1View.element;
  }
}

export default Game1;
