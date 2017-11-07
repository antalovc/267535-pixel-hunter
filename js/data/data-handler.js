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

  static async loadGameData(callback) {
    try {
      const response = await fetch(`${CONFIG_SERVER.URL}${CONFIG_SERVER.DATA}`);
      const responseData = await DataHandler.parseJsonResponse(response);
      const questions = await DataHandler.adaptQuestions(responseData);
      const questionsWithPictures = await DataHandler.resolvePicturesPromises(questions);
      callback(questionsWithPictures);
    } catch (error) {
      DataHandler.onError(error.message);
    }
  }

  static async loadStatsData(name, callback) {
    try {
      const response = await fetch(`${CONFIG_SERVER.URL}${CONFIG_SERVER.STATS}${name}`);
      const responseData = await DataHandler.parseJsonResponse(response);
      const stats = await DataHandler.adaptStats(responseData);
      callback(stats);
    } catch (error) {
      DataHandler.onError(error.message);
    }
  }

  static async saveStatsData(name, results) {
    const config = {
      body: JSON.stringify(results),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    try {
      await fetch(`${CONFIG_SERVER.URL}${CONFIG_SERVER.STATS}${name}`, config);
    } catch (error) {
      DataHandler.onError(error.message);
    }
  }

  static parseJsonResponse(response) {
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
