import ViewHeader from '../view/view-header';

export default (main) => {
  const header = new ViewHeader(main);

  header.onBackClicked = () => {
    main.greet();
  };

  return header;
};
