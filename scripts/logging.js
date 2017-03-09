(function() {
  function log(type, prefix, object) {
    const logObject = {
      type: type,
      prefix: prefix,
      url: location.href,
      agent: navigator.userAgent
    };
    if (object) {
      logObject.message = object.message ? object.message : object;
      if (object.stack) logObject.stack = object.stack;
    }
    _LTracker.push(logObject);
  };

  if (location.hostname === 'collectively.tk'
    || 'collectively-dev.tk') {
    window._LTracker = window._LTracker || [];
    _LTracker.push({
      'logglyKey': 'cd84d926-5a57-4598-9ab4-623eee369995',
      'sendConsoleErrors': true,
      'tag': 'loggly-jslogger'
    });

    console._error = console.error;
    console._warn = console.warn;

    console.error = function(prefix, object) {
      log('error', prefix, object);
      console._error.apply(this, arguments);
    };
    console.warn = function(prefix, object) {
      log('warn', prefix, object);
      console._warn.apply(this, arguments);
    };
  }
})();
