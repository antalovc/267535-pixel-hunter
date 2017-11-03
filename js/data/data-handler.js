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
      document.body.insertBefore(node, document.body.firstChild);
    }
  }

  static loadGameData(callback) {
    fetch(`${CONFIG_SERVER.URL}${CONFIG_SERVER.DATA}`)
        .then(DataHandler.jsonLoadResponse)
        .then(DataHandler.adaptQuestions)
        .then(DataHandler.resolvePicturesPromises)
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

  static adaptQuestions(data) {
    return data.map((datum) => {
      return createQuestion({
        type: datum.type,
        text: datum.question,
        pictures: datum.answers.map((answer) => {
          return new Picture({
            path: answer.image.url,
            isPhoto: answer.type === `photo`,
            width: answer.image.width,
            height: answer.image.height
          });
        })
      });
    });
  }

  static resolvePicturesPromises(questions) {
    return Promise.all(questions.reduce((picturesPromises, question) => {
      return [...picturesPromises, ...question.pictures.map(DataHandler.createPicturePromise)];
    }, []))
        .then(() => {
          return questions;
        })
        .catch((error) => {
          throw error;
        });
  }

  static createPicturePromise(picture) {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = picture.path;
      image.onload = () => {
        picture.image = image;
        resolve(picture);
      };
      image.onerror = (e) => {
        reject(e);
      };
    });
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
