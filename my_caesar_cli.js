const commander = require('commander');
const program = new commander.Command();

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
