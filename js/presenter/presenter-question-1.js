import PresenterQuestionAbstract from './presenter-question-abstract.js';
import ViewQuestion1 from '../view/view-question-1.js';

export default class PresenterQuestion1 extends PresenterQuestionAbstract {

  constructor(app) {
    super(app);
    this._questionView = new ViewQuestion1(app.game);
    this._questionView.onSubAnswer = (nPicture, isPhoto) => {
      app.game.currentQuestion.subanswer(nPicture, isPhoto);
    };
  }

}
