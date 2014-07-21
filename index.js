var Readable = require('stream').Readable;
var util = require('util');
var assert = require('assert');

util.inherits(SeqStream, Readable);

function SeqStream(streams) {
  this.streams = util.isArray(streams) ? streams : Array.prototype.slice.apply(arguments);
  this.idx = 0;
}

SeqStream.prototype._read = function(size) {
  var self = this, st;
  
  while(self.idx < self.streams.length && (st = self.streams[self.idx])) {
    var data = st.read(size);
    if(data) {
      return self.push(data);
    }else {
      self.idx++;
    }
  }

  self.push(null);
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


module.exports = function() {
  var streams = Array.prototype.slice.apply(arguments);
  return new SeqStream(streams);
};
