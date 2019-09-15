const LOGLEVEL = 0;

function log(level, ...msg) {
  if(level >= LOGLEVEL) {
    console.log(`${ performance.now() / 1000 }s >>`, ...msg);
  }
}

export default log;
