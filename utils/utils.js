const randomInt = (min,max) => Math.floor(Math.random() * (max - min + 1) + min);

const randomDirection = () => {
  const randomNum = Math.random();
  if(randomNum < 0.5) {
    return 'right'
  } else {
    return 'left'
  }
};

const generateInitialPosition = () => ({
  x: randomInt(innerWidth / 100, innerWidth / 30) * 20,
  y: randomInt(innerHeight / 100, innerHeight / 30) * 20
});
