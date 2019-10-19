const {
  abs,
  floor,
  PI,
  random
} = Math;

const init = function(state) {
  state.texture = {
    canvas: document.createElement('canvas')
  };
  state.texture.context = state.texture.canvas.getContext('2d');
  state.texture.context.imageSmoothingEnabled = false;

  this.setCanvasSize(state.texture.canvas);

  drawTexture(state.texture);
};

function drawTexture({ context, canvas }) {
  const [w, h, c] = [
    canvas.width,
    canvas.height,
    context
  ];
  const colors = [
    [0, 0, 0],
    [32, 0, 128],
    [64, 0, 160],
    [0, 96, 220],
    [0, 112, 250],
    [128, 80, 64],
    [192, 128, 128]
  ];
  const pattern = new ImageData(w, h);
  pattern.data.forEach((v, i) => {
    if(i%4) return;
    const color = colors[
      floor(
        random() * colors.length
      )
    ];
    color.forEach((v, ci) => {
      pattern.data[i + ci] = v;
    });
    pattern.data[i + 3] = random() > 0.95 ? 255 : 0;
  });
  c.putImageData(pattern, 0, 0);
}

export default init;
