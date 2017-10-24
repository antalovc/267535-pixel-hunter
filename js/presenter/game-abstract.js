class GameAbstract {

  constructor(app) {
    this._app = app;
    this._gameView = null;
  }

  init() {
    const timer = this._app.main.timer;
    const game = this._app.main.game;

    this._gameView.update(game);
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
    return this._gameView.element;
  }
}

export default GameAbstract;
