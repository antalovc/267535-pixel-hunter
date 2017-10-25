import PresenterQuestionAbstract from './presenter-question-abstract.js';
import ViewQuestion3 from '../view/view-question-3.js';

export default class PresenterQuestion3 extends PresenterQuestionAbstract {

  constructor(app) {
    super(app);
    this._questionView = new ViewQuestion3(app.game);
    this._questionView.onSubAnswer = (nIntrus) => {
      app.game.currentQuestion.subanswer(nIntrus);
    };
  }

}
