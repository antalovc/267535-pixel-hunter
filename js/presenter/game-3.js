import GameAbstract from './game-abstract.js';
import ViewGame3 from '../view/view-game-3.js';

class Game3 extends GameAbstract {

  constructor(app) {
    super(app);
    this._gameView = new ViewGame3(app.main.game);
    this._gameView.onSubAnswer = (nIntrus) => {
      app.main.game.currentQuestion.subanswer(nIntrus);
    };
  }

}

export default Game3;
