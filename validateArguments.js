module.exports = function validateArguments(shift, action) {
  if (!Number.isInteger(shift)) {
    throw new Error('Wrong shift provided: shift should be an integer value.');
  }

  if (action !== 'encode' && action !== 'decode') {
    throw new Error(
      "Wrong acton provided: action should be either 'encode' or 'decode'."
    );
  }
};
