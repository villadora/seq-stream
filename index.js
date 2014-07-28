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

  if (this.idx == -1)
    next();

  function next(chunk) {
    if (chunk) {
      return self.push(chunk);
    }

    var st;
    self.idx++;
    if (self.idx < self.streams.length && (st = self.streams[self.idx])) {
      st.on('data', next);
      st.on('end', next);
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