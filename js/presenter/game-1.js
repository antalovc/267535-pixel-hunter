import GameAbstract from './game-abstract.js';
import ViewGame1 from '../view/view-game-1.js';

class Game1 extends GameAbstract {

  constructor(app) {
    super(app);
    this._gameView = new ViewGame1(app.main.game);
    this._gameView.onSubAnswer = (nPicture, isPhoto) => {
      app.main.game.currentQuestion.subanswer(nPicture, isPhoto);
    };
  }

}

export default Game1;
