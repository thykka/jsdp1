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
      width: 512,
      height: 512,
    };

    Object.assign(this, defaults, options);

    // Accessed via `this.state` getter & setter
    this._state = {};

    this.initCanvas();
    this.setCanvasSize();
    this.initContext();

    this._init(this.state);
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
  setCanvasSize(canvas = this.canvas) {
    canvas.width = this.width;
    canvas.height = this.height;
  }

  /**
   * Finds and saves the canvas' context, and sets some options
   */
  initContext() {
    this.context = this.canvas.getContext('2d');

    // only effects pattern fills, drawImage()
    //this.context.imageSmoothingEnabled = false;
    this.context.strokeStyle = '#fff';
    this.context.imageSmoothingQuality = 'high';
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

    this._update(this.state, elapsed);
    this._draw(this.state);

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
  _init(state) {
    state.time = 0;
    state.frameIndex = 0;

    this.init(state);
  }

  /**
   * The update function
   * @param {Object} state - The current state
   * @param {Number} elapsed - Seconds elapsed since last update
   */
  _update(state, elapsed) {
    state.elapsed = elapsed;
    state.time += elapsed;
    state.frameIndex++;

    this.update(state);
  }

  /**
   * The draw function
   * @param {Object} state - The current state
   */
  _draw(state) {
    this.clear();
    this.draw(state);
  }

  /**
   * Clears the canvas
   */
  clear() {
    const c = this.context;
    c.clearRect(0, 0, this.width, this.height);
  }
}

export default JsDP1;
