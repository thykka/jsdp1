const {
  sin,
  cos,
  PI
} = Math;

const draw = function(state) {
  const c = this.context;
  const cx = sin(state.time / 6) * 2;
  const cy = cos(state.time / 5) * 2;
  const cs = cos(state.time / 14) * 0.05 + 0.05;

  c.resetTransform();
  c.globalCompositeOperation = 'source-over';
  c.fillStyle = '#000';
  c.fillRect(0,0,this.width,this.height);
  c.drawImage(state.texture.canvas, -cx, cy);
  c.translate(this.width/2, this.height/2);
  c.scale(1 + cs,1 + cs);
  c.rotate(cos(state.time/4) * PI/64 + PI/64);
  c.translate(
    -this.width  / 2 + cx,
    -this.height / 2 - cy
  );
  c.drawImage(state.texture.canvas, 0, 0);
  c.globalCompositeOperation = 'overlay';
  c.fillStyle = '#CCC';
  c.fillRect(0,0,this.width, this.height);
};


export default draw;
