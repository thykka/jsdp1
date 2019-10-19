const draw = function(state) {
  const c = this.context;
  c.resetTransform();
  c.globalCompositeOperation = 'source-over';
  c.fillStyle = '#000';
  c.fillRect(0,0,this.width,this.height);
  c.drawImage(state.texture.canvas, -state.cx, state.cy);
  c.translate(state.halfW, state.halfH);
  c.scale(state.cs, state.cs);
  c.rotate(state.cr);
  c.translate(-state.halfH + state.cx, -state.halfW - state.cy);
  c.drawImage(state.texture.canvas, 0, 0);
  c.globalCompositeOperation = 'overlay';
  c.fillStyle = '#CCC';
  c.fillRect(0, 0, this.width, this.height);
};


export default draw;
