const getRandomImage = (array: string[]) => {
  const index = Math.floor(Math.random() * array.length);
  return array[index];
};

export default getRandomImage;
