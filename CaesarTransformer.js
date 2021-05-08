const { Transform } = require('stream');
const performTransformation = require('./performTransformation');

module.exports = class CaesarTransformer extends Transform {
  constructor(options, action, shift) {
    super(options);
    this.action = action;
    this.shift = shift;
  }

  _transform(chunk, encoding, next) {
    let _action = this.action;
    let _shift = this.shift;
    if (this.shift > 26) {
      _shift = this.shift % 26;
    }
    if (this.shift < -26) {
      _shift = -(-this.shift % 26);
    }
    if (this.shift < 0) {
      _action = this.action === 'encode' ? 'decode' : 'encode';
      _shift = -_shift;
    }

    const transformed = performTransformation(chunk, _action, _shift, [
      [65, 90],
      [97, 122],
    ]);

    this.push(transformed);
    next();
  }
};
