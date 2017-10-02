const mainElement = document.querySelector(`main.central`);

export default (screen) => {
  mainElement.innerHTML = ``;
  mainElement.appendChild(screen);
};
