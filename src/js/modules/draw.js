const {
  PI,
  cos,
  max
} = Math;

const draw = function(state) {
  state.planets.forEach(planet => {
    drawPlanet(planet, this.context);
  });
};

function drawPlanet({
  x = 0, y = 0, angle = 0,
  planetRadius, ringDistance = 0,
  planetColor, ringColor,
  ringCount = 0,
  ringWidth = 0,
  ringAngle = PI/4,
  overlap = PI/180
} = {}, c) {

  const { width, height } = c.canvas;


  // Draw lower half of planet
  if(planetColor) c.fillStyle = planetColor, c.strokeStyle = planetColor;
  c.beginPath();
  c.arc(x * width, y * height, planetRadius, angle, angle + PI);
  c.closePath();
  c.fill();
  c.stroke();

  // Draw rings
  if(ringColor) c.strokeStyle = ringColor;
  [...Array(ringCount)].forEach((_, i, rings) => {
    const v = i / max(1, ringCount - 1);
    const radiusX = (planetRadius + ringDistance) + (v * ringWidth);
    const radiusY = radiusX * (ringAngle / PI);

    c.beginPath();
    c.ellipse(x * width, y * height, radiusX, radiusY, angle, 0, PI * 2);
    c.closePath();
    c.stroke();
  });

  // Draw upper part of planet
  if(planetColor) c.strokeStyle = planetColor;
  c.beginPath();
  c.arc(x * width, y * height, planetRadius, angle, angle + PI, true);
  c.closePath();
  c.fill();
  c.stroke();
}


export default draw;
