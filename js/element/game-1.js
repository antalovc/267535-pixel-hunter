import ViewGame1 from '../view/view-game-1.js';

export default (main) => {
  const game1 = new ViewGame1(main);

  game1.onSubAnswer = (nPicture, isPhoto) => {
    main.game.currentQuestion.subanswer(nPicture, isPhoto);
  };

  return game1;
};
