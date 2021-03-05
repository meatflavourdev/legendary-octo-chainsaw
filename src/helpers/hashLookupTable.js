const hashFunctions = {
  default: (input, max) => {
    return (
      input
        .toString()
        .split('')
        .reduce(function (a, b) {
          a = (a << 5) - a + b.charCodeAt(0);
          return a & a;
        }, 0) % max
    );
  },
};

const _max = function (lookupTable) {
  return Array.isArray(lookupTable) ? lookupTable.length : Object.values(lookupTable).length;
};

const _lookupValue = function (key, lookupTable) {
  return Array.isArray(lookupTable) ? lookupTable[key] : Object.values(lookupTable)[key];
};

const _lookupKey = function (key, lookupTable) {
  return Array.isArray(lookupTable) ? key : Object.keys(lookupTable)[key];
};

/**
 * Hashes arbitrary input
 * @param  {any} input Arbitrary input (Must implement toString method)
 * @param  {int} max Maximum output value
 * @return  {int} Hashed integer output
 */
const hashIndex = function (input, max, functionType = 'default') {
  const hashFunction = hashFunctions.hasKey(functionType) ? functionType : 'default';
  return hashFunctions[hashFunction](input, max);
};

/**
 * Retrieve value from lookup table corresponding to hashed arbitrary input
 * @param  {any} input Arbitrary input (Must implement toString method)
 * @param {Object<any>} lookupTable An Array or Object containing possible lookup values
 * @return  {any} Key from lookup table corresponding to hashed input (or index value if Array)
 */
const hashKey = function (input, lookupTable) {
  const hashedIndex = hashIndex(input, _max(lookupTable));
  return _lookupKey(hashedIndex, lookupTable)
};

/**
 * Retrieve value from lookup table corresponding to hashed arbitrary input
 * @param  {any} input Arbitrary input (Must implement toString method)
 * @param {Object<any>} lookupTable An Array or Object containing possible lookup values
 * @return  {any} Value from lookup table corresponding to hashed input
 */
const hashValue = function (input, lookupTable) {
  const hashedIndex = hashIndex(input, _max(lookupTable));
  return _lookupValue(hashedIndex, lookupTable)
};

/**
 * Retrieve key -> value pair from lookup table corresponding to hashed arbitrary input
 * @param  {any} input Arbitrary input (Must implement toString method)
 * @param {Object<any>} lookupTable An Array specifying possible lookup values or an Object containing {key: value} pairs
 * @return  {{key: any, value: any}} Key (or index) and value from lookup table corresponding to hashed input
 */
const hashLookup = function (input, lookupTable) {
  const hashedIndex = hashIndex(input, _max(lookupTable));
  return {
    key: _lookupKey(hashedIndex, lookupTable),
    value: _lookupValue(hashedIndex, lookupTable),
  };
};

const exports = { hashIndex, hashKey, hashValue, hashLookup };
export default exports;
