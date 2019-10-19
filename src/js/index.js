import log from './utils/log';

import JsDP1 from './modules/jsdp1.js';

import init from './modules/init.js';
import update from './modules/update.js';
import draw from './modules/draw.js';

import Prism from 'prismjs';

function app () {
  log(0, 'Starting app…');
  const demo = new JsDP1({
    canvasId: 'jsdp1',
    init, update, draw
  });
  log(demo);

  ['init', 'update', 'draw'].forEach(name => {
    const el = document.getElementById(name);
    el.innerHTML =
      Prism.highlight(
        `const ${name} = ${demo[name].toString().replace(/^\s\s/gm,'')};`,
        Prism.languages.javascript,
        'javascript'
      );
  });
}

app();
