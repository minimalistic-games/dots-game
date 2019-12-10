# dots-game

  [![license][license-image]][license-url]
  [![deps][deps-image]][deps-url]
  ![code size][code-size-image]

html5 version of a classic paper-based [game](https://en.wikipedia.org/wiki/Dots_(game))

```
------------------------------------
  x x x     x x x    x x x    x x
  x    x   x     x     x     x
  x    x   x     x     x      x x
  x    x   x     x     x         x
  x x x     x x x      x      x x
------------------------------------

· · · · · · · · ·
· · · · · ● ● · ·
· · · · ● · · ● ·
· · · · ● · · ● ·
· · ● ● · ● ○ ● ·
· ● · ○ ○ ○ ● ○ ·
· ● · ○ ○ · ● ○ ·
· · ● ● ● ● ● ○ ·
· · · · · · · · ·
```

## Setup

```bash
$ npm i               # install deps
$ npm run dev         # run a local dev server
$ npm test            # run unit tests
$ npm run build:prod  # produce a build artifact
$ npm run deploy      # deploy to GitHub pages
```

[license-image]: https://img.shields.io/github/license/minimalistic-games/dots-game.svg?style=flat-square
[license-url]: https://github.com/minimalistic-games/dots-game/blob/master/LICENSE
[deps-image]: https://img.shields.io/david/minimalistic-games/dots-game.svg?style=flat-square
[deps-url]: https://david-dm.org/minimalistic-games/dots-game
[code-size-image]: https://img.shields.io/github/languages/code-size/minimalistic-games/dots-game.svg?style=flat-square
