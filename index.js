var through = require('through2');

module.exports = function(streams) {
  var ended = false;
  var st = through();

  streams = (streams || []).concat();

  st.add = function(stream) {
    if (ended) throw new Error('SeqStream is already ended');
    streams.push(stream);
  };

  appendNext();

  return st;

  function appendNext() {
    var n = streams.shift();
    if (n) {
      n.on('data', function(chunk) {
        st.write(chunk);
      });

      n.on('end', appendNext);
    } else {
      ended = true;
      st.end();
    }
  }
};
