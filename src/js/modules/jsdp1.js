
const {
  PI,
//  floor,
//  round,
//  ceil,
//  sin,
//  cos,
//  random,
//  log2,
//  log10,
} = Math;

const PI2 = PI * 2;

class JsDP1 {
  constructor(options) {
    const defaults = {
      canvasId: 'jsdp1',
      width: 100,
      height: 100
    };

    Object.assign(this, defaults, options);

    this.init();
  }

  init() {
    this.initCanvas();
    this.setCanvasSize();
    this.initContext();

    this.draw();
  }

  initCanvas() {
    this.canvas = document.getElementById(this.canvasId);
  }

  initContext() {
    this.context = this.canvas.getContext('2d');
  }

  setCanvasSize() {
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  draw() {
    const c = this.context;
    const [w, h] = [this.width, this.height];
    c.fillStyle = '#111';
    c.fillRect(0,0,w,h);
    c.strokeStyle = '#fff';
    c.arc(w/2, h/2, 20, 0, PI2);
    c.stroke();
  }
}

export default JsDP1;
