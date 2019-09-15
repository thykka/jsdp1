const LOGLEVEL = 0;

/**
 * @param {number} importance - Optionally filter noise from logs
 * @param  {...any} rest - What to log
 */
function log(importance, ...rest) {
  const out = [];
  if(typeof importance !== 'number') {
    out.push(importance, ...rest);
  } else if(importance >= LOGLEVEL) {
    out.push(...rest);
  }
  console.log('·   ', ...out);
}

export default log;
