import PresenterQuestionAbstract from './presenter-question-abstract.js';
import ViewQuestion2 from '../view/view-question-2.js';

export default class PresenterQuestion2 extends PresenterQuestionAbstract {

  constructor(app) {
    super(app);
    this._questionView = new ViewQuestion2(app.main.game);
    this._questionView.onSubAnswer = (isPhoto) => {
      app.main.game.currentQuestion.subanswer(isPhoto);
    };
  }

}
