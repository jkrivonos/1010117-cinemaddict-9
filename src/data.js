const getRandomFromRange = (min, max) => Math.round(Math.random() * (max - min) + min);

export const getDataFilm = () => ({
  title: [`The Dance of Life`,
    `Sagebrush Trail`,
    `The Man with the Golden Arm`,
    `The Great Flamarion`,
    `Santa Claus Conquers the Martians`,
    `Saint Luiziana`,
    `Wild West`,
    `Cool Russia`,
    `West Coast`,
    `Back to the Future`,
    `Robocop`,
    `Ghostbusters`,
    `The Smurfs`,
    `Red Planet`,
    `Army of Darkness`
  ][Math.floor(Math.random() * 15)],
  rating: getRandomFromRange(1, 9) + 0.2,
  year: getRandomFromRange(1900, 2019),
  duration: getRandomFromRange(25, 180),
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
  comments: [
    {
      author: `Tim Sobakin`,
      commentText: `film is so boring`,
      daysAgo: 5
    },
    {
      author: `Kitty Koshkina`,
      commentText: `it is awesome`,
      daysAgo: 54
    },
    {
      author: `Peter Pen`,
      commentText: `3 hours! Seriously??`,
      daysAgo: 1
    }
    ],
  emojis:[
    {
      id: `emoji-smile`,
      value: `sleeping`,
      image: `./images/emoji/smile.png`,
      checked: false
    },
    {
      id: `emoji-sleeping`,
      value: `neutral-face`,
      image: `./images/emoji/sleeping.png`,
      checked: false
    },
    {
      id: `emoji-gpuke`,
      value: `grinning`,
      image: `./images/emoji/puke.png`,
      checked: false
    },
    {
      id: `emoji-angry`,
      value: `grinning`,
      image: `./images/emoji/angry.png`,
      checked: false
    }
  ],
  isWatchedList: true,
  isHistory: false,
  isFavorite: false
});
