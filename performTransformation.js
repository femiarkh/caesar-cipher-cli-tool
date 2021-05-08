module.exports = function performTransformation(chunk, action, shift, ranges) {
  const dataArray = chunk.toString().split('');
  const resultArray = [];
  if (action === 'encode') {
    dataArray.forEach((letter) => {
      const codePoint = letter.codePointAt(0);
      let newCodePoint = codePoint;
      ranges.forEach((range) => {
        if (codePoint >= range[0] && codePoint <= range[1]) {
          newCodePoint = codePoint + parseInt(shift, 10);
          if (newCodePoint > range[1]) {
            newCodePoint = range[0] + (newCodePoint % range[1]) - 1;
          }
        }
      });

      resultArray.push(String.fromCodePoint(newCodePoint));
    });
  }

  if (action === 'decode') {
    dataArray.forEach((letter) => {
      const codePoint = letter.codePointAt(0);
      let newCodePoint = codePoint;
      ranges.forEach((range) => {
        if (codePoint >= range[0] && codePoint <= range[1]) {
          newCodePoint = codePoint - parseInt(shift, 10);
          if (newCodePoint < range[0]) {
            newCodePoint = range[1] - (range[0] % newCodePoint) + 1;
          }
        }
      });

      resultArray.push(String.fromCodePoint(newCodePoint));
    });
  }

  return resultArray.join('');
};
