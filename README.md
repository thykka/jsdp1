# jsDP1

Tooling for graphics prototyping with HTML Canvas.

## Features

- Provides three functions; `init` and `update` are used to set or update the global state, whereas `draw` is used to paint on the canvas, based on the current state.
- non-antialiased drawing methods: `drawText`, `drawCircle`
- Gulp build process allows SCSS, ES6 syntax, modules etc.
- Minimal express server, proxied via BrowserSync

## Setup

1. Clone the repo:
```sh
$ git clone https://github.com/thykka/jsdp1.git
```

1. Switch to Node v12, with [nvm](https://github.com/nvm-sh/nvm) installed:
```sh
$ cd jsdp1
$ nvm use
```

1. Install gulp-cli and project dependencies:
```sh
$ npm i --global gulp-cli
$ npm i .
```

## Usage

1. Start the Gulp task for building and watching for changes:
```sh
$ gulp
```
