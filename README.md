# dots-game

  [![travis][travis-image]][travis-url]
  [![deps][deps-image]][deps-url]
  [![license][license-image]][license-url]

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
$ yarn install
$ yarn test
$ yarn run:dev           # runs a dev server
$ yarn run:dev-dashboard # runs a dev server in the "webpack-dashboard"
$ yarn build:prod        # builds production assets to "./dist/"
$ yarn deploy            # pushes "./dist/" to "http://oleksmarkh.github.io/dots-game/"
```

[travis-image]: https://img.shields.io/travis/oleksmarkh/dots-game/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/oleksmarkh/dots-game
[deps-image]: https://img.shields.io/david/oleksmarkh/dots-game.svg?style=flat-square
[deps-url]: https://david-dm.org/oleksmarkh/dots-game
[license-image]: https://img.shields.io/github/license/oleksmarkh/dots-game.svg?style=flat-square
[license-url]: https://github.com/oleksmarkh/dots-game/blob/master/LICENSE
