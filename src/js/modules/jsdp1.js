/**
 * jsDPI Class
 */
class JsDP1 {
  /**
   * Constructs and initializes a new jsDP1 instance
   * @param {Object} [options] -
   * @param {String} [options.canvasId] - ID of the <canvas> element to use
   * @param {Number} [options.width] - Width of the scene
   * @param {Number} [options.height] - Height of the scene
   */
  constructor(options) {
    const defaults = {
      canvasId: 'jsdp1',
      width: 256,
      height: 256,
    };

    Object.assign(this, defaults, options);

    // Accessed via `this.state` getter & setter
    this._state = {};

    this.initCanvas();
    this.setCanvasSize();
    this.initContext();

    this.bindEvents();

    this.init(this.state);
    this.queueUpdate();
  }

  /**
   * @returns {Object} - The current state
   */
  get state() {
    return this._state;
  }

  /**
   * Only returns the current state.
   * Should block reassinging the state.
   * @param {*} value - The value that will be discarded
   * @returns {Object} - The current state
   */
  set state(value) {
    return this._state;
  }

  /**
   * Finds and saves a reference to the canvas element
   */
  initCanvas() {
    this.canvas = document.getElementById(this.canvasId);
  }

  /**
   * Matches canvas size with class instance's width & height
   */
  setCanvasSize() {
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  /**
   * Finds and saves the canvas' context, and sets some options
   */
  initContext() {
    this.context = this.canvas.getContext('2d');

    // only effects pattern fills, drawImage()
    this.context.imageSmoothingEnabled = false;
    this.context.strokeStyle = '#fff';
  }

  /**
   * Queues a loop update, and saves the requestAnimationFrame Id
   */
  queueUpdate() {
    this._drawRAFId = requestAnimationFrame((t) => {
      this.updateLoop(t);
    });
  }

  /**
   * Main loop handler
   * @param {Number} t - Current time (internal, from RAF)
   */
  updateLoop(t) {
    const { time, elapsed } = this.getTime(t);

    this.update(this.state, elapsed);
    this.draw(this.state);

    this.continueLoop(time);
  }

  /**
   * Calculates time elapsed between updates (use with this.continueLoop())
   * @param {Number} t - Current time (internal, from RAF)
   * @returns {Object} - Object with total elapsed time in and time elapsed since last update (in seconds)
   */
  getTime(t) {
    const time = t / 1000;
    if(!this._lastUpdateTime) this._lastUpdateTime = time;
    return {
      time,
      elapsed: time - this._lastUpdateTime
    };
  }

  /**
   * Sets the last update time and queues a new update,
   * unless paused or not started.
   * @param {Number} time - Current time (in seconds)
   */
  continueLoop(time) {
    this._lastUpdateTime = time;
    if(!this.paused && this._drawRAFId) {
      this.queueUpdate();
    }
  }

  /**
   * The initialization function
   * @param {Object} state - The current state
   */
  init(state) {
    state.time = 0;
    state.frameIndex = 0;
    state.beam = {
      x: this.width / 2,
      y: this.height / 2
    };
    state.mirror = {
      x: 0,
      y: this.height - 20,
      angle: 270,
      width: this.width
    };
  }

  /**
   * The update function
   * @param {Object} state - The current state
   * @param {Number} elapsed - Seconds elapsed since last update
   */
  update(state, elapsed) {
    state.elapsed = elapsed;
    state.time += elapsed;
    state.frameIndex++;

    this.updateBeam(state);
    this.updateMirror(state);
  }

  updateBeam(state) {
    state.beam.x = this._mouseX * this.width;
    state.beam.y = this._mouseY * this.height;

    state.beam.points = [
      [state.beam.x, state.beam.y],
      [state.mirror.x, state.mirror.y]
    ];
  }

  updateMirror(state) {
    state.mirror.x = this.width / 2 + sin(state.time / 13) * this.width / 3;
    state.mirror.y = this.height * 0.8 + sin(state.time / 9) * this.width / 10;
    state.mirror.angle = 270 + cos(state.time) * 20;

    const offsetX = sin(state.mirror.angle / 360 * PI2) * state.mirror.width;
    const offsetY = cos(state.mirror.angle / 360 * PI2) * state.mirror.width;

    state.mirror.points = [
      [
        state.mirror.x + offsetX,
        state.mirror.y - offsetY
      ], [
        state.mirror.x - offsetX,
        state.mirror.y + offsetY
      ]
    ];
  }

  /**
   * The draw function
   * @param {Object} state - The current state
   */
  draw(state) {
    this.clear('#080808');


    this.context.strokeStyle = '#222';
    this.context.beginPath();
    this.context.arc(
      state.mirror.x, state.mirror.y,
      this.width / 10,
      PI / -2 + state.mirror.angle/360*PI2,
      PI / 2 + state.mirror.angle/360*PI2
    );
    this.context.stroke();

    this.line(state.mirror.points, '#222');
    this.line(state.beam.points, '#F44');

    const reflect = this.reflect(state.beam, state.mirror);
    this.line([
      [state.mirror.x, state.mirror.y],
      [lerp(state.mirror.x, reflect.x, 9001), lerp(state.mirror.y, reflect.y, 9001)]
    ], '#C22');


  }

  /**
   * Wrapper for line drawing
   */
  line(points, color = '#fff', offset = 0.5) {
    const c = this.context;
    c.strokeStyle = color;
    c.beginPath();
    points.forEach(([x, y], i) => {
      if(i > 0) {
        c.lineTo(x + offset, y + offset);
      } else {
        c.moveTo(x + offset, y + offset);
      }
    });
    c.closePath();
    c.stroke();
  }

  reflect(beam, mirror) {
    // mirror angle in radians
    const mirrorAngle = mirror.angle / 360 * PI2;
    const beamAngle = atan2(mirror.x - beam.x, mirror.y - beam.y);
    const parallel = beamAngle + (PI + mirrorAngle);
    const diff = ((parallel + beamAngle) + mirrorAngle) % PI2;
    const { x, y } = this.rotate(beam, mirror, diff);
    return {
      x, y,
      angle: diff / PI2 * 360
    };
  }

  rotate(point, origin, angle){
    const c = cos(angle);
    const s = sin(angle);
    return {
      x: c * (point.x - origin.x) - s * (point.y - origin.y) + origin.x,
      y: s * (point.x - origin.x) + c * (point.y - origin.y) + origin.y
    };
  }

  /**
   * Clears the canvas
   */
  clear(color = false) {
    if(!color) {
      this.context.clearRect(0, 0, this.width, this.height);
    } else {
      this.context.fillStyle = color;
      this.context.fillRect(0, 0, this.width, this.height);
    }
  }

  bindEvents() {
    this._mouseX = 0;
    this._mouseY = 0;
    this.canvas.addEventListener('mousemove', e => {
      const { layerX, layerY } = e;
      const { width, height } = e.currentTarget.getBoundingClientRect();
      this._mouseX = layerX / width;
      this._mouseY = layerY / height;
    });
  }
}

function lerp(a, b, t) {
  return a * (1 - t) + b * t;
}

/**
 * Shorthand math functions, because we're
 * probably gonna need them a lot
 */
const {
  PI,
  atan2,
  abs,
  floor,
  cos,
  sqrt,
  // round,
  // ceil,
  sin,
  // random,
  // log2,
  // log10,
} = Math;
const PI2 = PI * 2;

export default JsDP1;
