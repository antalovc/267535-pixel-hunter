import GameAbstract from './game-abstract.js';
import ViewGame2 from '../view/view-game-2.js';

class Game2 extends GameAbstract {

  constructor(app) {
    super(app);
    this._gameView = new ViewGame2(app.main.game);
    this._gameView.onSubAnswer = (isPhoto) => {
      app.main.game.currentQuestion.subanswer(isPhoto);
    };
  }

}

export default Game2;


