const getRandomIntegerFromRange = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomBoolean = () => {
  return Math.random() >= 0.5;
};

const createElementFromTemplate = (tagName, template, className, id) => {
  const containerElement = document.createElement(tagName);
  if (className) {
    containerElement.className = className;
  }
  if (id) {
    containerElement.id = id;
  }
  containerElement.innerHTML = template;
  return containerElement;
};

const getRandomArrayItem = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const generateSingleTrueArray = (length) => {
  const res = new Array(length).fill(false);
  res[getRandomIntegerFromRange(0, length - 1)] = true;
  return res;
};

export {createElementFromTemplate, getRandomArrayItem, generateSingleTrueArray, getRandomBoolean};
