export default (frameSizes, pictureSizes) => {
  let divider = Math.max(pictureSizes.width / frameSizes.width, pictureSizes.height / frameSizes.height);
  return {
    width: Math.floor(pictureSizes.width / divider),
    height: Math.floor(pictureSizes.height / divider)
  };
};
