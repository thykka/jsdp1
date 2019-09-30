const draw = function(state) {
  //
  this.context.fillStyle = '#fff';
  this.context.fillText(state.time.toFixed(0), 1, 8);
};


export default draw;
