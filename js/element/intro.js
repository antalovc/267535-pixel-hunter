import ViewIntro from '../view/view-intro.js';

export default (main) => {
  const intro = new ViewIntro(main);

  intro.onIntroClicked = () => {
    main.greet();
  };

  return intro;
};
