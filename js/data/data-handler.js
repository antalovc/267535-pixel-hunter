import Picture from '../picture.js';
import createQuestion from '../question/create-question.js';
import {Statistics} from '../statistics.js';

const CONFIG_SERVER = {
  URL: `https://es.dump.academy/pixel-hunter/`,
  DATA: `questions`,
  STATS: `stats/:`
};

export default class DataHandler {

  static onError(error) {
    const node = document.createElement(`div`);
    node.style = `width: 180px; margin: 0 auto; text-align: center; background-color: red;`;

    node.textContent = error;
    document.body.insertAdjacentElement(`afterbegin`, node);
  }

  static loadGameData(callback) {
    fetch(`${CONFIG_SERVER.URL}${CONFIG_SERVER.DATA}`)
        .then(DataHandler.checkStatus)
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
        .then((questions) => {
          callback(questions);
        })
        .catch(DataHandler.onError);
  }

  static loadStatsData(name, callback) {
    return fetch(`${CONFIG_SERVER.URL}${CONFIG_SERVER.STATS}${name}`)
        .then(DataHandler.checkStatus)
        .then((res) => {
          return res.json();
        })
        .then((previousStats) => {
          return previousStats.reduceRight((result, previousStat) => {
            result.push(new Statistics({
              lives: previousStat.lives,
              answers: previousStat.stats
            }));
            return result;
          }, []);
        })
        .then((previousStatistics) => {
          callback(previousStatistics);
        })
        .catch(callback([]));
  }

  static saveStatsData(name, results) {
    const config = {
      body: JSON.stringify(results),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return fetch(`${CONFIG_SERVER.URL}${CONFIG_SERVER.STATS}${name}`, config)
        .then(DataHandler.checkStatus)
        .catch(DataHandler.onError);
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

  static checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      throw new Error(response.statusText);
    }
  }
}
