# dots-game

[![Build Status](https://api.travis-ci.org/oleksmarkh/dots-game.svg)](https://travis-ci.org/oleksmarkh/dots-game)
[![Dependency Status](https://david-dm.org/oleksmarkh/dots-game.svg?style=flat)](https://david-dm.org/oleksmarkh/dots-game)

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

## setup

```bash
$ yarn install
$ yarn run server:dev  # runs a dev server on "http://localhost:8080"
$ yarn run build       # builds production assets to "./dist/"
```

test:

```bash
$ yarn test
```

## features/todo

- [x] zoom
- [x] autosave
- [ ] moves history/replay
- [ ] offline mode for 2 players
- [ ] online multiplayer (via WebRTC)
