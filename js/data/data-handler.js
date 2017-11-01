import Picture from '../picture.js';
import createQuestion from '../question/create-question.js';
import {Statistics} from '../statistics.js';

const CONFIG_SERVER = {
  URL: `https://es.dump.academy/pixel-hunter/`,
  DATA: `questions`,
  STATS: `stats/:`
};

const CLASS_ERROR = `error`;

export default class DataHandler {

  static onError(error) {
    let node = document.querySelector(`.${CLASS_ERROR}`);
    if (node) {
      node.textContent = error;
    } else {
      node = document.createElement(`div`);
      node.classList.add(CLASS_ERROR);
      node.textContent = error;
      document.body.insertAdjacentElement(`afterbegin`, node);
    }
  }

  /* static fetch(url) {
    return new Promise((resolve, reject) => {
      fetch(url)
          .then(DataHandler.checkStatus)
          .then(resolve, reject);
    });
  } */

  static loadGameData(callback) {
    fetch(`${CONFIG_SERVER.URL}${CONFIG_SERVER.DATA}`)
        .then(DataHandler.jsonLoadResponse)
        .then((data) => {
          return data.map((datum) => {
            return DataHandler.adaptQuestion(datum);
          });
        })
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
    fetch(`${CONFIG_SERVER.URL}${CONFIG_SERVER.STATS}${name}`)
        .then(DataHandler.jsonLoadResponse)
        .then(DataHandler.adaptStats)
        .then((previousStatistics) => {
          callback(previousStatistics);
        })
        .catch(DataHandler.onError);
  }

  static saveStatsData(name, results) {
    const config = {
      body: JSON.stringify(results),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    fetch(`${CONFIG_SERVER.URL}${CONFIG_SERVER.STATS}${name}`, config)
        .catch(DataHandler.onError);
  }

  static jsonLoadResponse(response) {
    return response.ok ? response.json() : [];
  }

  static adaptQuestion(datum) {
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

  static adaptStats(datum) {
    return datum.reduceRight((result, previousStat) => {
      result.push(new Statistics({
        lives: previousStat.lives,
        answers: previousStat.stats
      }));
      return result;
    }, []);
  }

}
