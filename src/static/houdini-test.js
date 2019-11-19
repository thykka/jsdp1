/* global registerPaint */

registerPaint('houdiniTest', class {
  static get inputProperties() {
    return [
      '--rings'
    ];
  }

  static get inputArguments() {
    return [];
  }

  paint(ctx, geom, properties) {
    const { width, height } = geom;
    const rings = properties.get('--rings');
    const bmax = Math.max(width, height);
    ctx.strokeStyle = 'red';
    Array.from({ length: rings }, (_,i) => {
      return {
        v: i / (rings - 1)
      };
    }).forEach(ring => {
      const size = (
        ring.v * bmax / 2
      ) % bmax;
      ctx.beginPath();
      ctx.arc(width/2, height/2, size, 0, Math.PI * 2);
      ctx.stroke();
    });
  }
});
