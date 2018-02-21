# dots-game

  [![travis][travis-image]][travis-url]
  [![deps][deps-image]][deps-url]
  [![license][license-image]][license-url]
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
$ yarn install            # install deps
$ yarn run:dev            # run a local dev server
$ yarn run:dev-dashboard  # run a local dev server in the "webpack-dashboard"
$ yarn test               # run unit tests
$ yarn build:prod         # produce a build artifact
$ yarn deploy             # deploy to GitHub pages
```

[travis-image]: https://img.shields.io/travis/oleksmarkh/dots-game/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/oleksmarkh/dots-game
[deps-image]: https://img.shields.io/david/oleksmarkh/dots-game.svg?style=flat-square
[deps-url]: https://david-dm.org/oleksmarkh/dots-game
[license-image]: https://img.shields.io/github/license/oleksmarkh/dots-game.svg?style=flat-square
[license-url]: https://github.com/oleksmarkh/dots-game/blob/master/LICENSE
[code-size-image]: https://img.shields.io/github/languages/code-size/oleksmarkh/dots-game.svg?style=flat-square
