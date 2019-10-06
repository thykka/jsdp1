const {
  floor, random
} = Math;

const init = function(state) {
  state.width = this.width;

  const gridSizeInput = document.getElementById('gridSize');
  const gridSizeOutput = document.getElementById('gridSizeOut');

  gridSizeInput.addEventListener('change', (ev) => {
    const gridSize = ev.currentTarget.value;
    createPlanetGrid({
      gridWidth: gridSize,
      gridHeight: gridSize
    }, state);
    gridSizeOutput.innerText = gridSize * gridSize;
  });

  const change = document.createEvent('HTMLEvents');
  change.initEvent('change', false, true);
  gridSizeInput.dispatchEvent(change);

};

const Colors = [
  'hsl(200, 40%, 20%)',
  'hsl(185, 30%, 20%)',
  'hsl(82, 30%, 20%)',
  'hsl(30, 40%, 30%)',
  'hsl(2, 40%, 30%)',
];

function createPlanetGrid({
  gridWidth = 1, gridHeight = 1
}, state) {
  const padding = 1 / gridWidth / 2;
  const size = state.width / gridWidth / 2;
  state.planets = Array.from({
    length: gridWidth * gridHeight
  }, () => generatePlanet(size)).map((planet, i) => {
    const x = (i % gridWidth) / Math.max(1, gridWidth - 1);
    const y = floor(i / gridWidth) / Math.max(1, gridHeight - 1);
    planet.x = x * (1 - padding * 2) + padding;
    planet.y = y * (1 - padding * 2) + padding;
    return planet;
  });
}

function generatePlanet(size) {
  const planetColor = Colors[floor(random() * Colors.length)];
  const ringColor = Colors[floor(random() * Colors.length)];
  return {
    planetColor,
    planetRadius: 3 + random() * random() * size,
    ringColor,
    ringCount: floor(random() * random() * 8),
    ringDistance: random() * size,
    ringWidth: random() * size,
    x: 0, y: 0,
  };
}

export default init;
