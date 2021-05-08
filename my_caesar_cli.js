const commander = require('commander');
const program = new commander.Command();
const fs = require('fs');
const { Transform } = require('stream');
const transform = require('./transform');

program
  .requiredOption('-s, --shift <value>', 'a shift')
  .requiredOption('-a, --action <type>', 'an action encode/decode')
  .option('-i, --input [input]', 'an input file', '')
  .option('-o, --output [output]', 'an output file', '');

program.parse(process.argv);
const options = program.opts();

const { shift, input, output, action } = options;
console.log('shift is', shift);
console.log('input is', input);
console.log('output is', output);
console.log('action is', action);

class CaesarTransformer extends Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, next) {
    let _action = action;
    let _shift = shift;
    if (shift < 0) {
      _action = action === 'encode' ? 'decode' : 'encode';
      _shift = -shift;
    }

    const transformed = transform(chunk, _action, _shift, [
      [65, 90],
      [97, 122],
    ]);

    this.push(transformed);
    next();
  }
}

fs.createReadStream(input)
  .pipe(new CaesarTransformer())
  .pipe(fs.createWriteStream(output, { flags: 'a' }));
