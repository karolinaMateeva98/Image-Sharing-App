import allImagesSlice from './allImagesSlice';

const rootReducer = () => {
  return {
    allImages: allImagesSlice
  };
};

export default rootReducer;
