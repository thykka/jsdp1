const {
  PI,
  floor,
  cos,
  // round,
  // ceil,
  // sin,
  // random,
  // log2,
  // log10,
} = Math;

const PI2 = PI * 2;

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
      width: 128,
      height: 128,
    };

    Object.assign(this, defaults, options);

    // Accessed via `this.state` getter & setter
    this._state = {};

    this.initCanvas();
    this.setCanvasSize();
    this.initContext();

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
  }

  /**
   * The update function
   * @param {Object} state - The current state
   * @param {Number} elapsed - Seconds elapsed since last update
   */
  update(state, elapsed) {
    state.time += elapsed;
    state.frameIndex++;
  }

  /**
   * The draw function
   * @param {Object} state - The current state
   */
  draw(state) {
    if(Math.round(state.time * 60) % 180 === 0) this.clear();
    this.context.fillStyle = (state.time / 30 % 1) < 0.5
      ? `hsl(${
        (floor(state.time) * 60 - 45) % 360
      }, 50%, 50%)`
      : `hsl(${
        (floor(state.time) * 60 - 45) % 360
      }, 80%, 20%)`;
    this.context.rotate(state.elapsed / 10);
    this.drawText({
      text: 'jsDP1',
      x: 8 - cos(state.time) * 13,
      y: this.height * (cos(state.time * 1.333333) * 0.4 + 0.6) + cos(state.time / 10) * 2,
      fontSize: 46 + cos(state.time) * 10
    });
  }

  /**
   * Clears the canvas
   */
  clear() {
    const c = this.context;
    c.clearRect(0, 0, this.width, this.height);
  }

  /**
   * Draws aliased text
   * @param {Object} options -
   * @param {Number} options.x - The x-coordinate of the left edge
   * @param {Number} options.y - The y-coordinate of the bottom edge
   * @param {String} [options.text] - The text to draw
   * @param {Number} [options.fontSize] - The font size to draw with
   * @param {CanvasRenderingContext2D} [c] - The context
   */
  drawText({
    x, y, text = '',
    fontSize = 11
  }, c = this.context) {
    this._noAntialias(() => {
      c.font = `${ fontSize }px sans-serif`;
      c.fillText(text, x, y);
    });
  }

  /**
   * Draws an aliased circle
   * @param {Object} options -
   * @param {Number} options.x - X-coordinate of the circle's center
   * @param {Number} options.y - Y-coordinate of the circle's center
   * @param {Number} [options.radius] - The circle's radius in pixels
   * @param {Number} [options.lineWidth] - The stroke width
   * @param {String} [options.fillStyle] - The fillStyle. When this option is present, the circle is filled, not outlined
   * @param {CanvasRenderingContext2D} [c] - The context
   */
  drawCircle({
    x, y,
    radius = 1,
    lineWidth = 1 - (1 / 6),
    fillStyle = null
  }, c = this.context) {
    this._noAntialias(() => {
      c.beginPath();
      c.arc(x, y, radius, 0, PI2);
      c.closePath();
      if(fillStyle) {
        c.fillStyle = fillStyle;
        c.fill();
      } else {
        c.lineWidth = lineWidth;
        c.stroke();
      }
    });
  }

  /**
   * A wrapper for antialiased drawing. Utilizes an SVG element with ID "remove-alpha"
   * @param {Function} fn - The drawing function to use
   */
  _noAntialias(fn) {
    this.context.filter = 'url(#remove-alpha)';
    fn();
    this.context.filter = 'none';
  }
}

export default JsDP1;
