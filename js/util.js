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

export {createElementFromTemplate, getRandomBoolean};
