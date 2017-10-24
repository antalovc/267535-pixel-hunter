import ViewGame3 from '../view/view-game-3.js';

export default (main) => {
  const game3 = new ViewGame3(main);

  game3.onSubAnswer = (nIntrus) => {
    main.game.currentQuestion.subanswer(nIntrus);
  };

  return game3;
};
