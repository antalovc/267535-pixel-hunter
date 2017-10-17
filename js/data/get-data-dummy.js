import Picture from '../picture.js';
import QuestionBase from '../question-base.js';
import {getRandomArrayItem, generateSingleTrueArray, getRandomBoolean} from "../util.js";

const DATA_DUMMY = {
  PAINTINGS: [
    // People
    `https://k42.kn3.net/CF42609C8.jpg`,
    // Animals
    `https://k42.kn3.net/D2F0370D6.jpg`,
    // Nature
    `https://k32.kn3.net/5C7060EC5.jpg`
  ],
  PHOTOS: [
    // People
    `http://i.imgur.com/1KegWPz.jpg`,
    // Animals
    `https://i.imgur.com/DiHM5Zb.jpg`,
    // Nature
    `http://i.imgur.com/DKR1HtB.jpg`
  ]
};

const generatePicture = (isPhoto) => {
  isPhoto = (typeof isPhoto !== `boolean`) ? getRandomBoolean() : isPhoto;
  return new Picture(isPhoto ? getRandomArrayItem(DATA_DUMMY.PHOTOS) : getRandomArrayItem(DATA_DUMMY.PAINTINGS), isPhoto);
};

export default (questionType) => {
  let res = [];
  const nPictures = QuestionBase.QUESTION_TYPE_TO_NPICTURES[questionType];
  switch (questionType) {
    case QuestionBase.QUESTION_TYPE.TYPE_1:
    case QuestionBase.QUESTION_TYPE.TYPE_2:
      for (let i = 0; i < nPictures; i++) {
        res.push(generatePicture());
      }
      break;
    case QuestionBase.QUESTION_TYPE.TYPE_3:
      const singleTrueArray = generateSingleTrueArray(nPictures);
      const createSinglePhoto = getRandomBoolean();
      res = singleTrueArray.map((bool) => {
        bool = createSinglePhoto ? bool : !bool;
        return generatePicture(bool);
      });
      break;
  }
  return res;
};
