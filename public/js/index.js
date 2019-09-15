(function (factory) {
  typeof define === 'function' && define.amd ? define('index', factory) :
  factory();
}(function () { 'use strict';

  const LOGLEVEL = 0;

  function log(level, ...msg) {
    if (level >= LOGLEVEL) {
      console.log(`${performance.now() / 1000}s >>`, ...msg);
    }
  }

  function app() {
    log(0, 'Starting app…');
    log(0, 'App started!');
  }

  app();

}));
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3JjL2pzL2luZGV4LmpzIiwic291cmNlcyI6WyJzcmMvanMvdXRpbHMvbG9nLmpzIiwic3JjL2pzL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IExPR0xFVkVMID0gMDtcblxuZnVuY3Rpb24gbG9nKGxldmVsLCAuLi5tc2cpIHtcbiAgaWYobGV2ZWwgPj0gTE9HTEVWRUwpIHtcbiAgICBjb25zb2xlLmxvZyhgJHsgcGVyZm9ybWFuY2Uubm93KCkgLyAxMDAwIH1zID4+YCwgLi4ubXNnKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBsb2c7XG4iLCJpbXBvcnQgbG9nIGZyb20gJy4vdXRpbHMvbG9nJztcblxuZnVuY3Rpb24gYXBwICgpIHtcbiAgbG9nKDAsICdTdGFydGluZyBhcHDigKYnKTtcbiAgbG9nKDAsICdBcHAgc3RhcnRlZCEnKTtcbn1cblxuYXBwKCk7XG4iXSwibmFtZXMiOlsiTE9HTEVWRUwiLCJsb2ciLCJsZXZlbCIsIm1zZyIsImNvbnNvbGUiLCJwZXJmb3JtYW5jZSIsIm5vdyIsImFwcCJdLCJtYXBwaW5ncyI6Ijs7Ozs7RUFBQSxNQUFNQSxRQUFRLEdBQUcsQ0FBakI7O0VBRUEsU0FBU0MsR0FBVCxDQUFhQyxLQUFiLEVBQW9CLEdBQUdDLEdBQXZCLEVBQTRCO0VBQzFCLE1BQUdELEtBQUssSUFBSUYsUUFBWixFQUFzQjtFQUNwQkksSUFBQUEsT0FBTyxDQUFDSCxHQUFSLENBQWEsR0FBR0ksV0FBVyxDQUFDQyxHQUFaLEtBQW9CLElBQU0sTUFBMUMsRUFBaUQsR0FBR0gsR0FBcEQ7RUFDRDtFQUNGOztFQ0pELFNBQVNJLEdBQVQsR0FBZ0I7RUFDZE4sRUFBQUEsR0FBRyxDQUFDLENBQUQsRUFBSSxlQUFKLENBQUg7RUFDQUEsRUFBQUEsR0FBRyxDQUFDLENBQUQsRUFBSSxjQUFKLENBQUg7RUFDRDs7RUFFRE0sR0FBRzs7OzsifQ==
