import * as d3 from 'd3';
import log from './utils/log';

const dataPoints = Array.from({length: 11}, () => 0)
  .reduce((acc, _, i, a) => {
    const v = i<2 ? 1 : acc[i-1] + acc[i-2];
    return [...acc, v];
  }, [])
  .map((v, i, a) => [v, i / (a.length - 1)]);

log(dataPoints);

function app () {
  log(0, 'Starting app…');

  const svg = d3.select('svg#cloud');
  svg.attr('width', innerWidth)
    .attr('height', innerHeight);

  const circle = svg.selectAll('circle')
    .data(dataPoints);

  circle.enter().append('circle')
    .attr('r', (d) => `${d[0]}px`)
    .attr('cx', (d) => d[1] * 100 + '%')
    .attr('cy', () => 100)
    .style('fill', '#fffc');

  circle.exit().remove();
}

app();
