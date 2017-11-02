class PresenterQuestionAbstract {

  constructor() {
    this._questionView = null;
  }

  get element() {
    return this._questionView.element;
  }

  init(app) {
    const timer = app.timer;
    const game = app.game;

    this._questionView.update(game);
    app.setScreen(this, app.HAS_HEADER);

    game.currentQuestion.onAnswer = (isCorrect) => {
      timer.stop();
      const time = timer.timeElapsed;
      timer.reset();
      game.answer(isCorrect, time);
    };
    timer.start();
  }

}

export default PresenterQuestionAbstract;
