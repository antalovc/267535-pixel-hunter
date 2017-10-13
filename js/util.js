const setChildrenFromTemplate = (element, template) => {
  const templateElement = document.createElement(`div`);
  templateElement.innerHTML = template;

  element.innerHTML = ``;
  Array.from(templateElement.childNodes).forEach((child) => {
    element.appendChild(child);
  });
};

const createElementFromTemplate = (type, template, className, id) => {
  const containerElement = document.createElement(type);
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

const addSelfRemovingEventListener = (element, eventType, callback, preventDefault) => {
  const callbackWrapper = (evt) => {
    if (preventDefault) {
      evt.preventDefault();
    }
    element.removeEventListener(`click`, callbackWrapper);
    callback();
  };
  element.addEventListener(`click`, callbackWrapper);

};

export {createElementFromTemplate, setChildrenFromTemplate, getRandomArrayItem, addSelfRemovingEventListener};
