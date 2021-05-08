const fs = require('fs');

module.exports = function checkExistence(path) {
  try {
    fs.accessSync(path, fs.constants.F_OK | fs.constants.R_OK);
  } catch (err) {
    process.stderr.write('file does not exists or is not accessible' + '\n');
    throw err;
  }
  const stats = fs.statSync(path);
  if (!stats.isFile()) {
    process.stderr.write('please provide a path to a specific file' + '\n');
  }
};
