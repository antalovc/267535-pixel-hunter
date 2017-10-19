import ViewGame2 from '../view/view-game-2.js';

export default (question) => {
  const game2 = new ViewGame2(question);

  game2.onSubAnswer = (isPhoto) => {
    question.subanswer(isPhoto);
  }

  return game2;
};
