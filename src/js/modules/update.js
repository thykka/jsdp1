const {
  sin,
  cos,
  PI
} = Math;

const update = function(state) {
  state.planets.forEach((planet, i)=> {
    const v = i / (state.planets.length);
    //planet.x = sin(state.time + v * PI * 2) * v/2 + 0.5;
    //planet.y = cos(state.time - v * PI * 2) * v/2 + 0.5;
    planet.angle = sin(2 * state.time + v * PI * 2) * -0.2;
  });
};

export default update;
