const {
  sin,
  cos,
  PI
} = Math;

const update = function(state) {
  state.halfW = this.width / 2;
  state.halfH = this.height / 2;
  state.cx = sin(state.time / 6) * 2;
  state.cy = cos(state.time / 5) * 2;
  state.cs = cos(state.time / 14) * 0.05 + 1.05;
  state.cr = cos(state.time/4) * PI/64 + PI/64;
};

export default update;
