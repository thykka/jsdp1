import log from './utils/log';

import JsDP1 from './modules/jsdp1.js';

function app () {
  log(0, 'Starting app…');
  const demo = new JsDP1({
    canvasId: 'jsdp1'
  });
  log(demo);
}

app();
