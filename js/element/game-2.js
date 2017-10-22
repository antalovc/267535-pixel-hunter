import ViewGame2 from '../view/view-game-2.js';

export default (main) => {
  const game2 = new ViewGame2(main);

  game2.onSubAnswer = (isPhoto) => {
    main.game.currentQuestion.subanswer(isPhoto);
  };

  return game2;
};
