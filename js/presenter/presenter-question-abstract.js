class PresenterQuestionAbstract {

  constructor(app) {
    this._app = app;
    this._questionView = null;
  }

  init() {
    const timer = this._app.timer;
    const game = this._app.game;

    this._questionView.update(game);
    this._app.setScreen(this, this._app.HAS_HEADER);

    game.currentQuestion.onAnswer = (isCorrect) => {
      timer.stop();
      const time = timer.timeElapsed;
      timer.reset();
      game.answer(isCorrect, time);
    };
    timer.start();
  }

  get element() {
    return this._questionView.element;
  }
}

export default PresenterQuestionAbstract;
