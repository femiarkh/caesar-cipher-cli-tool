const commander = require('commander');
const program = new commander.Command();
const fs = require('fs');
const checkExistence = require('./check-existence');
const CaesarTransformer = require('./CaesarTransformer');

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

putIn.pipe(new CaesarTransformer(options, action, shift)).pipe(putOut);
