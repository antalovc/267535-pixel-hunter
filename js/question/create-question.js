import QuestionAbstract from './question-abstract.js';
import Question1 from './question-1.js';
import Question2 from './question-2.js';
import Question3 from './question-3.js';

export default (data) => {

  let question = null;

  switch (data.type) {
    case QuestionAbstract.QuestionType.TYPE_1:
      question = new Question1(data);
      break;
    case QuestionAbstract.QuestionType.TYPE_2:
      question = new Question2(data);
      break;
    case QuestionAbstract.QuestionType.TYPE_3:
      question = new Question3(data);
      break;
  }

  return question;

};
