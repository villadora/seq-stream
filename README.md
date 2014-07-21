# seq-stream
[![NPM version](https://badge.fury.io/js/seq-stream.svg)](http://badge.fury.io/js/seq-stream) [![Build Status](https://travis-ci.org/villadora/seq-stream.svg?branch=master)](https://travis-ci.org/villadora/seq-stream) 

<!--[![Dependency Status](https://gemnasium.com/villadora/seq-stream.svg)](https://gemnasium.com/villadora/seq-stream) -->

Create a stream pipe out a group of readable streams in sequence.

## Install

```bash
$ npm install seq-stream --save
```

## Usage

```js
var seq = require('seq-stream');

var stream = seq(stream1, fs.createReadStream('./data'));

// will pipe to stdout in the order of content in 'straem1', content in './data'
stream.pipe(process.stdout);


```

## Licence

MIT

