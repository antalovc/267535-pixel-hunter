import Picture from '../picture.js';
import createQuestion from '../question/create-question.js';

export default class DataHandler {

  static onError(error) {
    const node = document.createElement(`div`);
    node.style = `width: 180px; margin: 0 auto; text-align: center; background-color: red;`;

    node.textContent = error;
    document.body.insertAdjacentElement(`afterbegin`, node);
  }

  static loadGameData(callback) {
    fetch(`https://es.dump.academy/pixel-hunter/questions`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error(`Неизвестный статус: ${response.status} ${response.statusText}`);
        })
        .then((data) => {
          return data.map((datum) => {
            return DataHandler.processQuestion(datum);
          });
        })
        // .then((questionsPromises) => Promise.all(questionsPromises))
        .then((questions) => {
          return questions.map((question) => {
            return createQuestion(question);
          });
        })
        .then((questions) => callback(questions))
        .catch(DataHandler.onError);
  }

  static loadResultData() {

  }

  static saveResultData() {

  }

  static processQuestion(datum) {
    const question = {};
    question.type = datum.type;
    question.text = datum.question;

    question.pictures = datum.answers.map((answer) => {
      return new Picture({
        path: answer.image.url,
        isPhoto: answer.type === `photo`,
        width: answer.image.width,
        height: answer.image.height
      });
    });

    return question;
  }
}
