import ViewGame3 from '../view/view-game-3.js';

export default (question) => {
  const game3 = new ViewGame3(question);

  game3.onSubAnswer = (nIntrus) => {
    question.subanswer(nIntrus);
  }

  return game3;
};
