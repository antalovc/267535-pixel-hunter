import QuestionBase from './question-base.js';
import Question1 from './question-1.js';
import Question2 from './question-2.js';
import Question3 from './question-3.js';
import {getRandomArrayItem} from './util.js';

export default (onAnsweredCallback) => {

  let newQuestion = null;

  switch (getRandomArrayItem(QuestionBase.QUESTION_TYPES)) {
    case QuestionBase.QUESTION_TYPE.TYPE_1:
      newQuestion = new Question1(onAnsweredCallback);
      break;
    case QuestionBase.QUESTION_TYPE.TYPE_2:
      newQuestion = new Question2(onAnsweredCallback);
      break;
    case QuestionBase.QUESTION_TYPE.TYPE_3:
      newQuestion = new Question3(onAnsweredCallback);
      break;
  }

  return newQuestion;

};
