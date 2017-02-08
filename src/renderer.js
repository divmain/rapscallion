const { isInteger } = require("lodash");

const render = require("./render");
const toPromise = require("./consumers/promise");
const toNodeStream = require("./consumers/node-stream");


class Renderer {
  constructor (jsx) {
    this.sequence = render(jsx);
    this.batchSize = 100;
    this.next = this.sequence.next.bind(this.sequence);
  }

  toPromise () {
    return toPromise(this.sequence, this.batchSize);
  }

  toStream () {
    return toNodeStream(this.sequence, this.batchSize);
  }

  tuneAsynchronicity (batchSize) {
    if (!isInteger(batchSize) || batchSize < 1) {
      throw new RangeError("Asynchronicity must be an integer greater than or equal to 1.");
    }
    this.batchSize = batchSize;
    return this;
  }
}

module.exports = Renderer;