import QuestionAbstract from './question-abstract.js';
import Question1 from './question-1.js';
import Question2 from './question-2.js';
import Question3 from './question-3.js';

export default (data) => {

  let newQuestion = null;

  switch (data.type) {
    case QuestionAbstract.QuestionType.TYPE_1:
      newQuestion = new Question1(data);
      break;
    case QuestionAbstract.QuestionType.TYPE_2:
      newQuestion = new Question2(data);
      break;
    case QuestionAbstract.QuestionType.TYPE_3:
      newQuestion = new Question3(data);
      break;
  }

  return newQuestion;

};
