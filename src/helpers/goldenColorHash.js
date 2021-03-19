var Color = require('color');

/**
 * Hashes arbitrary input
 * @param  {any} input Arbitrary input (Must implement toString method)
 * @param  {int} max Maximum output value
 * @return  {int} Hashed integer output
 */
const _hashFunction = function (input, max) {
  return (
    input
      .toString()
      .split('')
      .reduce(function (a, b) {
        a = (a << 5) - a + b.charCodeAt(0);
        return a & a;
      }, 0) % max
  );
};

const getColor = (index, seed, decimalPlaces = 0) => {
  const goldenAngle = 180 * (3 - Math.sqrt(5));
  const seededAngle = _hashFunction(seed, 36000) / 100;
  const _h = Math.abs(((index + 1 + Math.pow(seededAngle, 2)) * goldenAngle + Math.pow(seededAngle, 2)) % 360);
  const _c = {
    h: _h.toFixed(decimalPlaces),
    s: (90 + Math.abs(_hashFunction(_h, 1000) / 100)).toFixed(decimalPlaces),
    l: (55 + Math.abs(_hashFunction(_h, 1000) / 100)).toFixed(decimalPlaces),
  };
  const color = Color(`hsl(${_c.h}, ${_c.s}%, ${_c.l}%)`);
  return {
    hex: color.hex(),
    isLight: color.isLight(),
    //color: color,
  };
};

const getColors = (num, seed, decimalPlaces = 1) => {
  const colorsArr = [];
  for (let i = 0; i < num; i++) {
    colorsArr[i] = getColor(i, seed, decimalPlaces);
  }
  return
}

export { getColor, getColors };
