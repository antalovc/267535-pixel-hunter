import Picture from '../picture.js';
import QuestionBase from '../question/question-base.js';
import {getRandomArrayItem, generateSingleTrueArray, getRandomBoolean} from "../util.js";

const DATA_DUMMY = {
  PAINTINGS: [
    // People
    `./dummy_data/CF42609C8.jpg`,
    // Animals
    `./dummy_data/D2F0370D6.jpg`,
    // Nature
    `./dummy_data/5C7060EC5.jpg`
  ],
  PHOTOS: [
    // People
    `./dummy_data/1KegWPz.jpg`,
    // Animals
    `./dummy_data/DiHM5Zb.jpg`,
    // Nature
    `./dummy_data/DKR1HtB.jpg`
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
