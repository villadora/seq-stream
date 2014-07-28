var Readable = require('stream').Readable;
var util = require('util');
var assert = require('assert');

util.inherits(SeqStream, Readable);

function SeqStream(streams) {
  Readable.call(this);

  this.streams = util.isArray(streams) ? streams : Array.prototype.slice.apply(arguments);

  this.idx = -1;
}

SeqStream.prototype._read = function(size) {
  var self = this;

  if (self.idx == -1)
    next();

  function next() {
    var st;
    self.idx++;
    if (self.idx < self.streams.length && (st = self.streams[self.idx])) {
      if (st.readable) {
        var cnt = 0;
        st.on('readable', function() {
          var chunk = st.read();
          if (chunk) {
            self.push(chunk);
          } else {
            st.removeAllListeners();
            next();
          }
        });

        st.once('end', function() {
          st.removeAllListeners();
          next();
        });
      } else {
        throw new Error('Unreadable Stream in streams list');
      }
      // st.on('data', self.push.bind(self));
      // st.on('end', next);
    } else {
      self.push(null);
    }
  }
};

SeqStream.prototype.apppend = function() {
  var added = Array.prototype.slice.apply(arguments);
  Array.prototype.push.apply(this.streams, added);
};

SeqStream.prototype.insertNext = function() {
  var insert = Array.prototype.slice.apply(arguments);
  insert.unshift(self.idx, 0);
  Array.protootype.splice.apply(this.streams, insert);
};


module.exports = function(streams) {
  return new SeqStream(util.isArray(streams) ? streams : Array.prototype.slice.apply(arguments));
};