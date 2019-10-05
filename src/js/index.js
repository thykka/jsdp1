import * as d3 from 'd3';
import log from './utils/log';

const pointCount = 20;
const dataPoints = Array.from({length: pointCount}, (_, i) => {
  const v = i / (pointCount - 1);
  return {
    x: v,
    y: i === 0 || i === pointCount - 1 ? 0 : Math.random()
  };
});

const scaleX = d3.scaleLinear()
  .domain([0, 1])
  .range([0, innerWidth]);

const scaleY = d3.scaleLinear()
  .domain([0, 1])
  .range([0, innerHeight]);

const slow = d3.transition()
  .duration(5000)
  .ease(d3.easeSin);

const line = d3.line()
  .x(d => scaleX(d.x))
  .y(d => scaleY(d.y));


function app () {
  log(0, 'Starting app…');

  const svg = d3.select('svg#cloud');
  svg.attr('width', innerWidth)
    .attr('height', innerHeight)
    .style('stroke-width', 0.75);

  const path = svg.select('path').datum(dataPoints);
  [...Array(innerHeight / 8 | 0)].map((_, i, a) => {
    const beta = (i / (a.length - 1));
    return path.clone().attr(
      'd',
      line.curve(d3.curveBundle.beta(beta))
    ).style('opacity', beta);
  });
}

app();
