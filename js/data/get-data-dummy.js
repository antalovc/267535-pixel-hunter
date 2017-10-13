import Picture from '../picture.js';
import {getRandomArrayItem} from "../util.js";

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

const generatePicture = () => {
  const isPhoto = Math.round(Math.random());
  return new Picture(isPhoto ? getRandomArrayItem(DATA_DUMMY.PHOTOS) : getRandomArrayItem(DATA_DUMMY.PAINTINGS), isPhoto);
};

export default (nPictures) => {
  const res = [];
  for (let i = 0; i < nPictures; i++) {
    res.push(generatePicture());
  }
  return res;
};
