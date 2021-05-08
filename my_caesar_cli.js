const commander = require('commander');
const program = new commander.Command();
const fs = require('fs');
const { Transform } = require('stream');
const checkExistence = require('./check-existence');
const transform = require('./transform');

program
  .requiredOption('-s, --shift <value>', 'a shift')
  .requiredOption('-a, --action <type>', 'an action encode/decode')
  .option('-i, --input [input]', 'an input file', '')
  .option('-o, --output [output]', 'an output file', '');

program.parse(process.argv);
const options = program.opts();

const { shift, input, output, action } = options;

if (input) {
  checkExistence(input);
}
if (output) {
  checkExistence(output);
}

const putIn = input ? fs.createReadStream(input) : process.stdin;
const putOut = output
  ? fs.createWriteStream(output, { flags: 'a' })
  : process.stdout;

class CaesarTransformer extends Transform {
  constructor(options) {
    super(options);
  }

  _transform(chunk, encoding, next) {
    let _action = action;
    let _shift = shift;
    if (shift > 26) {
      _shift = shift % 26;
    }
    if (shift < -26) {
      _shift = -(-shift % 26);
    }
    if (shift < 0) {
      _action = action === 'encode' ? 'decode' : 'encode';
      _shift = -_shift;
    }

    const transformed = transform(chunk, _action, _shift, [
      [65, 90],
      [97, 122],
    ]);

    this.push(transformed);
    next();
  }
}

putIn.pipe(new CaesarTransformer()).pipe(putOut);
