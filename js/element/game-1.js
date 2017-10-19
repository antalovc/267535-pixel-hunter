import ViewGame1 from '../view/view-game-1.js';

export default (question) => {
  const game1 = new ViewGame1(question);

  game1.onSubAnswer = (nPicture, isPhoto) => {
    question.subanswer(nPicture, isPhoto);
  }

  return game1;
};
