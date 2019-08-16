const getRandomArbitrary = (min, max) => Math.round(Math.random() * (max - min) + min);

const getDataFilm = () => ({
  title: [`The Dance of Life`,
    `Sagebrush Trail`,
    `The Man with the Golden Arm`,
    `The Great Flamarion`,
    `Santa Claus Conquers the Martians`
  ][Math.floor(Math.random() * 5)],
  rating: getRandomArbitrary(1, 9) + 0.2,
  year: getRandomArbitrary(1900, 2019),
  duration: getRandomArbitrary(25, 180),
  genre: [`drama`,
    `melodrama`,
    `horror`,
    `scary movie`,
    `comedy`
  ][Math.floor(Math.random() * 5)],
  image: [
    `images/posters/made-for-each-other.png`,
    `images/posters/popeye-meets-sinbad.png`,
    `images/posters/sagebrush-trail.jpg`,
    `images/posters/santa-claus-conquers-the-martians.jpg`,
    `images/posters/the-dance-of-life.jpg`
  ][Math.floor(Math.random() * 5)],
  description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget.`,
  comments: getRandomArbitrary(0, 155),
  isWatchedList: Boolean(Math.round(Math.random())),
  isHistory: Boolean(Math.round(Math.random())),
  isFavorite: Boolean(Math.round(Math.random()))
});

export {getDataFilm};
